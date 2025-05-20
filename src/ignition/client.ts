import { Provider, Wallet, Address } from 'fuels';
import dotenv from 'dotenv';
import { log } from "../common/utils";

dotenv.config();

export const FUEL_RPC_URL = process.env.FUEL_RPC_URL ?? 'https://mainnet.fuel.network/v1/graphql';

let _provider: Provider | null = null;

export function getProvider(): Provider {
  if (!_provider) {
    log(`Initializing Fuel provider with RPC URL: ${FUEL_RPC_URL}`);
    _provider = new Provider(FUEL_RPC_URL);
  }
  return _provider;
}

export function getWallet(): Wallet | null {
  const privateKey = process.env.PRIVATE_KEY;
  if (!privateKey) {
    log('No PRIVATE_KEY found in environment variables');
    return null;
  }
  
  const provider = getProvider();
  log('Creating wallet from private key');
  return Wallet.fromPrivateKey(privateKey, provider);
}

export function isValidAddress(address: string): boolean {
  try {
    new Address(address);
    return true;
  } catch {
    return false;
  }
}

export async function getFuelEcosystemData() {
  try {
    log('Fetching Fuel ecosystem data from GitHub');
    const response = await fetch('https://raw.githubusercontent.com/FuelLabs/fuel-ecosystem/main/projects.json');
    if (!response.ok) {
      throw new Error(`Failed to fetch ecosystem data: ${response.statusText}`);
    }
    
    const data = await response.json() as any[];
    log(`Fetched ecosystem data with ${data.length} projects`);
    return data;
  } catch (error) {
    throw new Error(`Error fetching ecosystem data: ${error}`);
  }
}
