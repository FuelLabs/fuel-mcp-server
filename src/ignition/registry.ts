import { log } from "../common/utils";
import { getFuelEcosystemData } from "./client";

// Cache for verified assets
let _verifiedAssetsCache: any[] | null = null;

export async function getVerifiedAssets() {
  if (_verifiedAssetsCache !== null) {
    log('Using cached verified assets');
    return _verifiedAssetsCache;
  }

  try {
    log('Fetching verified assets from Fuel network');
    const response = await fetch('https://verified-assets.fuel.network/assets.json');
    if (!response.ok) {
      throw new Error(`Failed to fetch verified assets: ${response.statusText}`);
    }
    
    const assets = await response.json() as Array<{
      name: string;
      symbol: string;
      icon: string;
      networks: Array<{ chain: string; [key: string]: any }>;
    }>;

    // Filter and map to only include mainnet network info
    const mainnetAssets = assets
      .map((asset) => {
        const mainnetNetwork = asset.networks.find((n) => n.chain === 'mainnet' && n.type === 'fuel');
        if (!mainnetNetwork) return null;
        return {
          name: asset.name,
          symbol: asset.symbol,
          icon: asset.icon,
          network: mainnetNetwork,
        };
      })
      .filter(
        (asset): asset is { name: string; symbol: string; icon: string; network: any } => asset !== null
      );

    // Cache the results
    _verifiedAssetsCache = mainnetAssets;
    log(`Cached ${mainnetAssets.length} verified assets`);
    
    return mainnetAssets;
  } catch (error) {
    log(`Error fetching verified assets: ${error}`);
    throw error;
  }
}

export async function findProject(projectName: string, network: string = 'mainnet') {
  const ecosystemData = await getFuelEcosystemData();
  
  return ecosystemData.find((p: { name: string }) => 
    p.name.toLowerCase() === projectName.toLowerCase()
  );
}

export async function findContract(projectName: string, contractName: string, network: string = 'mainnet') {
  const project = await findProject(projectName, network);
  if (!project) return null;
  
  const networkKey = network === 'testnet' ? 'sepolia' : network;
  
  return project.contracts?.[networkKey]?.find((c: { name: string; }) => 
    c.name.toLowerCase() === contractName.toLowerCase()
  );
}

export async function fetchContractABI(projectName: string, contractName: string, network: string = 'mainnet') {
  const contract = await findContract(projectName, contractName, network);
  if (!contract || !contract.abi) return null;
  
  try {
    log(`Fetching ABI from ${contract.abi}`);
    const abiResponse = await fetch(contract.abi);
    if (!abiResponse.ok) {
      throw new Error(`Failed to fetch ABI: ${abiResponse.statusText}`);
    }
    
    return await abiResponse.json();
  } catch (error) {
    log(`Error fetching ABI: ${error}`);
    throw error;
  }
}
