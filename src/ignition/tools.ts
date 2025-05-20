import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from 'zod';
import { Provider, Address, Contract, bn, Wallet } from 'fuels';
import { log, processValue } from "../common/utils";
import { getProvider, getWallet, getFuelEcosystemData } from "./client";
import { getVerifiedAssets, findProject, findContract, fetchContractABI } from "./registry";

export function registerBlockchainTools(server: McpServer) {
  registerAssetBalanceTool(server);
  registerListCoinsTool(server);
  registerTransferAssetsTool(server);
  
  registerBlockInfoTool(server);
  
  registerFindProjectTool(server);
  registerFetchContractABITool(server);
  registerCallContractTool(server);
  
  // Resources
  registerVerifiedAssetsResource(server);
}

function registerAssetBalanceTool(server: McpServer) {
  server.tool(
    'getAssetBalance',
    'Fetch the balance of a given asset for an address',
    {
      address: z.string().describe('Fuel address to query'),
      assetId: z.string().describe('Asset ID (hex)')
    },
    async ({ address, assetId }) => {
      try {
        const provider = getProvider();
        const balance = await provider.getBalance(address, assetId);
        return {
          content: [
            { type: 'text', text: JSON.stringify({ assetId, balance: balance.toString() }, null, 2) }
          ]
        };
      } catch (error) {
        log(`Error in getAssetBalance tool: ${error}`);
        return {
          content: [
            { type: 'text', text: `Error fetching asset balance: ${error}` }
          ],
          isError: true
        };
      }
    }
  );
}

function registerListCoinsTool(server: McpServer) {
  server.tool(
    'listCoins',
    'List UTXOs (coins) for an address with pagination',
    {
      address: z.string().describe('Fuel address to query'),
      assetId: z.string().optional().describe('Optional asset ID (hex) to filter by'),
      first: z.number().optional().describe('Number of items to retrieve (for pagination)'),
      after: z.string().optional().describe('Cursor for pagination (from previous response)')
    },
    async ({ address, assetId, first, after }) => {
      try {
        const provider = getProvider();
        const paginationArgs = first || after ? {
          first: first,
          after: after
        } : undefined;
        
        const { coins, pageInfo } = await provider.getCoins(
          address, 
          assetId, 
          paginationArgs
        );
        
        return {
          content: [
            { 
              type: 'text', 
              text: JSON.stringify({
                coins: coins.map((coin: any) => ({
                  id: coin.id,
                  amount: coin.amount.toString(),
                  assetId: coin.assetId,
                  owner: coin.owner
                })),
                pageInfo: {
                  hasNextPage: pageInfo.hasNextPage,
                  endCursor: pageInfo.endCursor
                }
              }, null, 2)
            }
          ]
        };
      } catch (error) {
        log(`Error in listCoins tool: ${error}`);
        return {
          content: [
            { type: 'text', text: `Error listing coins: ${error}` }
          ],
          isError: true
        };
      }
    }
  );
}

function registerTransferAssetsTool(server: McpServer) {
  server.tool(
    'transferAssets',
    'Send assets from one address to another',
    {
      recipient: z.string().describe('Recipient address'),
      amount: z.string().describe('Amount to send (as string to handle large numbers)'),
      assetId: z.string().describe('Asset ID to send (defaults to base asset)')
    },
    async ({ recipient, amount, assetId }) => {
      try {
        const wallet = getWallet();
        if (!wallet) {
          return {
            content: [
              { type: 'text', text: `Error: PRIVATE_KEY not found in environment variables` }
            ],
            isError: true
          };
        }
        
        const provider = getProvider();
        if (!assetId) {
          assetId = await provider.getBaseAssetId();
        }
        
        const recipientAddress = recipient.startsWith('fuel') 
          ? recipient 
          : new Address(recipient).toString();
        
        const amountToSend = bn(amount);
        
        const tx = await wallet.transfer(recipientAddress, amountToSend, assetId);
        
        const result = await tx.waitForResult();
        
        return {
          content: [
            { 
              type: 'text', 
              text: JSON.stringify({
                status: 'success',
                transactionId: tx.id,
                blockId: result.blockId,
                sender: wallet.address.toString(),
                recipient: recipientAddress,
                amount: amount,
                assetId: assetId,
                gasUsed: result.gasUsed?.toString()
              }, null, 2) 
            }
          ]
        };
      } catch (error) {
        log(`Error in transferAssets tool: ${error}`);
        return {
          content: [
            { type: 'text', text: `Error transferring assets: ${error}` }
          ],
          isError: true
        };
      }
    }
  );
}

function registerBlockInfoTool(server: McpServer) {
  server.tool(
    'getBlockInfo',
    'Fetch details about a specific block or latest block',
    {
      height: z.number().optional().describe('Block height to query (optional)'),
      id: z.string().optional().describe('Block ID to query (optional)'),
    },
    async ({ height, id }) => {
      try {
        const provider = getProvider();
        let block;
        
        if (height === undefined && id === undefined) {
          block = await provider.getBlock('latest');
        } 
        else if (height !== undefined) {
          block = await provider.getBlock(height);
        } 
        else if (id !== undefined) {
          block = await provider.getBlock(id);
        }
        
        if (!block) {
          return {
            content: [
              { type: 'text', text: 'Block not found' }
            ],
            isError: true
          };
        }
        
        const formattedBlock = {
          id: block.id,
          height: block.height,
          time: block.time,
          transactionCount: block.transactionIds?.length || 0,
          daHeight: block.header?.daHeight,
          prevRoot: block.header?.prevRoot,
        };
        
        return {
          content: [
            { type: 'text', text: JSON.stringify(formattedBlock, null, 2) }
          ]
        };
      } catch (error) {
        log(`Error in getBlockInfo tool: ${error}`);
        return {
          content: [
            { type: 'text', text: `Error fetching block info: ${error}` }
          ],
          isError: true
        };
      }
    }
  );
}

function registerFindProjectTool(server: McpServer) {
  server.tool(
    'findProject',
    'Find projects and their contracts in the Fuel ecosystem',
    {
      projectName: z.string().optional().describe('Optional: Filter by project name (case-insensitive, partial match)'),
      network: z.enum(['mainnet', 'testnet', 'sepolia', 'all']).default('mainnet').describe('Network to filter contracts by')
    },
    async ({ projectName, network }) => {
      try {
        const ecosystemData = await getFuelEcosystemData();
        
        let filteredProjects = ecosystemData;
        if (projectName) {
          filteredProjects = ecosystemData.filter((p: { name: string; }) => 
            p.name.toLowerCase().includes(projectName.toLowerCase())
          );
          
          if (filteredProjects.length === 0) {
            return {
              content: [
                { type: 'text', text: `No projects found matching "${projectName}"` }
              ]
            };
          }
        }
        
        interface ProjectInfo {
          name: string;
          description: string;
          isLiveMainnet: boolean;
          tags: string[];
          url: string;
          github: string;
          twitter: string;
          discord: string;
          contracts: {
            mainnet: any[];
            sepolia: any[];
          };
          predicates: {
            mainnet: any[];
            sepolia: any[];
          };
        }
        
        const result = filteredProjects.map((project: { 
          name: any; 
          description: any; 
          isLiveMainnet: any; 
          tags: any; 
          url: any; 
          github: any; 
          twitter: any; 
          discord: any; 
          contracts: { 
            mainnet: any[]; 
            sepolia: any[]; 
          }; 
          predicates: { 
            mainnet: any[]; 
            sepolia: any[]; 
          }; 
        }) => {
          const projectInfo: ProjectInfo = {
            name: project.name,
            description: project.description,
            isLiveMainnet: project.isLiveMainnet,
            tags: project.tags,
            url: project.url,
            github: project.github,
            twitter: project.twitter,
            discord: project.discord,
            contracts: {
              mainnet: [],
              sepolia: []
            },
            predicates: {
              mainnet: [],
              sepolia: []
            }
          };
          
          if ((network === 'mainnet' || network === 'all') && project.contracts?.mainnet) {
            projectInfo.contracts.mainnet = project.contracts.mainnet.map((c: any) => ({
              id: c.id,
              name: c.name,
              description: c.description || '',
              hasAbi: !!c.abi,
              abiUrl: c.abi || null
            }));
          }
          
          if ((network === 'testnet' || network === 'sepolia' || network === 'all') && project.contracts?.sepolia) {
            projectInfo.contracts.sepolia = project.contracts.sepolia.map((c: any) => ({
              id: c.id,
              name: c.name,
              description: c.description || '',
              hasAbi: !!c.abi,
              abiUrl: c.abi || null
            }));
          }
          
          if ((network === 'mainnet' || network === 'all') && project.predicates?.mainnet) {
            projectInfo.predicates.mainnet = project.predicates.mainnet.map((p: any) => ({
              blobId: p.blob_id,
              name: p.name,
              description: p.description || '',
              hasAbi: !!p.abi,
              abiUrl: p.abi || null
            }));
          }
          
          if ((network === 'testnet' || network === 'sepolia' || network === 'all') && project.predicates?.sepolia) {
            projectInfo.predicates.sepolia = project.predicates.sepolia.map((p: any) => ({
              blobId: p.blob_id,
              name: p.name,
              description: p.description || '',
              hasAbi: !!p.abi,
              abiUrl: p.abi || null
            }));
          }
          
          return projectInfo;
        });
        
        // Filter out projects with no contracts or predicates for the selected network
        const finalResult = result.filter((project: any) => {
          if (network === 'all') return true;
          
          const hasMainnetItems = 
            (network === 'mainnet' && 
             ((project.contracts.mainnet && project.contracts.mainnet.length > 0) || 
              (project.predicates.mainnet && project.predicates.mainnet.length > 0)));
              
          const hasTestnetItems = 
            ((network === 'testnet' || network === 'sepolia') && 
             ((project.contracts.sepolia && project.contracts.sepolia.length > 0) || 
              (project.predicates.sepolia && project.predicates.sepolia.length > 0)));
              
          return hasMainnetItems || hasTestnetItems;
        });
        
        return {
          content: [
            { 
              type: 'text', 
              text: JSON.stringify(finalResult, null, 2)
            }
          ]
        };
      } catch (error) {
        log(`Error in findProject tool: ${error}`);
        return {
          content: [
            { type: 'text', text: `Error finding projects: ${error}` }
          ],
          isError: true
        };
      }
    }
  );
}

function registerFetchContractABITool(server: McpServer) {
  server.tool(
    'fetchContractABI',
    'Fetch the ABI for a contract from the Fuel ecosystem',
    {
      projectName: z.string().describe('Name of the Fuel ecosystem project'),
      contractName: z.string().describe('Name of the specific contract within the project'),
      network: z.enum(['mainnet', 'testnet', 'sepolia']).default('mainnet').describe('Network where the contract is deployed')
    },
    async ({ projectName, contractName, network }) => {
      try {
        const contract = await findContract(projectName, contractName, network);
        if (!contract) {
          return {
            content: [
              { type: 'text', text: `Error: Contract "${contractName}" not found in project "${projectName}" on ${network}` }
            ],
            isError: true
          };
        }
        
        const abiJson = await fetchContractABI(projectName, contractName, network);
        if (!abiJson) {
          return {
            content: [
              { type: 'text', text: `Error: ABI not found for contract "${contractName}" in project "${projectName}"` }
            ],
            isError: true
          };
        }
        
        return {
          content: [
            { 
              type: 'text', 
              text: JSON.stringify({
                project: projectName,
                contract: contractName,
                contractId: contract.id,
                network,
                abi: abiJson
              }, null, 2)
            }
          ]
        };
      } catch (error) {
        log(`Error in fetchContractABI tool: ${error}`);
        return {
          content: [
            { type: 'text', text: `Error fetching contract ABI: ${error}` }
          ],
          isError: true
        };
      }
    }
  );
}

function registerCallContractTool(server: McpServer) {
  server.tool(
    'callContract',
    'Execute any contract method on a Fuel contract with optional asset transfers',
    {
      contractId: z.string().describe('Contract ID to interact with'),
      methodName: z.string().describe('Method name to call'),
      args: z.array(z.any()).optional().default([]).describe('Array of arguments to pass to the method'),
      abi: z.any().optional().describe('Contract ABI as JSON object (optional if projectName and contractName are provided)'),
      projectName: z.string().optional().describe('Name of the Fuel ecosystem project (optional if abi is provided)'),
      contractName: z.string().optional().describe('Name of the specific contract within the project (optional if abi is provided)'),
      network: z.enum(['mainnet', 'testnet', 'sepolia']).default('mainnet').describe('Network where the contract is deployed'),
      isStateChanging: z.boolean().default(false).describe('Set to true for state-changing calls, false for read-only calls'),
      transfer: z.object({
        amount: z.union([z.string(), z.number()]).describe('Amount to transfer'),
        assetId: z.string().optional().describe('Asset ID (defaults to base asset)')
      }).optional().describe('Optional asset transfer to include with the contract call'),
    },
    async ({ contractId, methodName, args, abi, projectName, contractName, network, isStateChanging, transfer }) => {
      try {
        // Check if we need to fetch the ABI from ecosystem data
        if (!abi && projectName && contractName) {
          abi = await fetchContractABI(projectName, contractName, network);
          
          // Make sure we have a contract ID
          if (!contractId) {
            const contract = await findContract(projectName, contractName, network);
            if (contract) contractId = contract.id;
          }
        }
        
        if (!abi) {
          return {
            content: [
              { type: 'text', text: `Error: ABI is required. Either provide it directly or specify projectName and contractName to fetch it automatically` }
              ]
          };
        }
        
        if (!contractId) {
          return {
            content: [
              { type: 'text', text: `Error: Contract ID is required.` }
            ]
          };
        }
        
        // Create wallet from private key for state-changing calls
        let account;
        if (isStateChanging) {
          account = getWallet();
          if (!account) {
            return {
              content: [
                { type: 'text', text: `Error: Environment variable PRIVATE_KEY is required for state-changing calls` }
              ],
              isError: true
            };
          }
        } else {
          // For read-only calls, we can use the provider directly
          account = getProvider();
          
          // Check if user is trying to send transfers with a read-only call
          if (transfer) {
            return {
              content: [
                { type: 'text', text: `Error: Asset transfers can only be used with state-changing calls (isStateChanging=true)` }
              ],
              isError: true
            };
          }
        }
        
        // Create the contract instance
        const contract = new Contract(contractId, abi, account);
        
        // Check if the method exists
        if (!contract.functions[methodName]) {
          return {
            content: [
              { type: 'text', text: `Error: Method '${methodName}' not found in contract ABI` }
            ],
            isError: true
          };
        }
        
        // Prepare the function call
        let functionCall = contract.functions[methodName](...args);
        
        // Add transfers if specified and this is a state-changing call
        if (isStateChanging && transfer) {
          // If assetId is not specified, use the base asset ID
          const provider = getProvider();
          if (!transfer.assetId) {
            transfer.assetId = await provider.getBaseAssetId();
          }
          
          functionCall = functionCall.callParams({
            forward: [bn(transfer.amount), transfer.assetId]
          });
        }
        
        // Execute the call based on whether it's state-changing or read-only
        let result;
        if (isStateChanging) {
          // For state-changing calls, use call() and wait for result
          const { waitForResult, transactionId } = await functionCall.call();
          const txResult = await waitForResult();
          
          // Extract only relevant data from transaction result to avoid circular references
          result = {
            transactionId: transactionId,
            status: 'completed',
            gasUsed: txResult.gasUsed?.toString(),
            receipts: (txResult as any).receipts?.length ?? 0,
            returnValue: txResult.value !== undefined ? 
              processValue(txResult.value) : null
          };
        } else {
          // For read-only calls, use get()
          const readResult = await functionCall.get();
          
          // Extract only the value and any relevant metadata
          result = {
            status: 'success',
            gasUsed: readResult.gasUsed?.toString(),
            value: processValue(readResult.value)
          };
        }
        
        return {
          content: [
            { 
              type: 'text', 
              text: JSON.stringify({
                contractId,
                methodName,
                isStateChanging,
                result
              }, null, 2)
            }
          ]
        };
      } catch (error) {
        log(`Error in callContract tool: ${error}`);
        return {
          content: [
            { type: 'text', text: `Error calling contract method: ${error}` }
          ],
          isError: true
        };
      }
    }
  );
}

function registerVerifiedAssetsResource(server: McpServer) {
  server.resource(
    'verifiedMainnetAssets',
    'fuel-assets://mainnet',
    async () => {
      try {
        const assets = await getVerifiedAssets();
        return {
          contents: [
            {
              uri: 'fuel-assets://mainnet',
              text: JSON.stringify(assets, null, 2)
            }
          ]
        };
      } catch (error) {
        log(`Error in verifiedMainnetAssets resource: ${error}`);
        return {
          contents: [
            {
              uri: 'fuel-assets://mainnet',
              text: JSON.stringify({ error: `Failed to fetch assets: ${error}` }, null, 2)
            }
          ]
        };
      }
    }
  );
}
