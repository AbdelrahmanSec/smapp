import { ThunkDispatch } from 'redux-thunk';
import { AccountWithBalance, Contact, NodeError, NodeStatus, WalletMeta, PostSetupState, PostSetupComputeProvider, SmesherConfig } from '../../shared/types';
import { Tx } from './transactions';
import { Reward } from './smesher';

export interface NetworkState {
  netId: string;
  netName: string;
  genesisTime: string;
  currentLayer: number;
  rootHash: string;
  explorerUrl: string;
}

export interface NodeState {
  status: NodeStatus | null;
  version: string;
  build: string;
  port: string;
  error: NodeError | null;
}

export interface WalletState {
  usingRemoteApi: boolean;
  walletFiles: Array<string> | null;
  meta: WalletMeta;
  mnemonic: string;
  accounts: Array<AccountWithBalance> | [];
  currentAccountIndex: number;
  transactions: { [publicKey: string]: Tx[] } | never;
  txsAndRewards: { [publicKey: string]: Tx[] } | never;
  lastUsedContacts: Array<Contact> | [];
  contacts: Array<Contact> | [];
  backupTime: string;
  vaultMode: number;
}

export interface SmesherState {
  smesherId: string;
  postSetupComputeProviders: PostSetupComputeProvider[];
  coinbase: string;
  dataDir: string;
  numUnits: number;
  throttle: boolean;
  provider: number | null;
  commitmentSize: number;
  numLabelsWritten: any;
  postSetupState: PostSetupState;
  postProgressError: string;
  rewards: Reward[] | [];
  config: SmesherConfig;
}

export interface UiState {
  isDarkMode: boolean;
  isClosingApp: boolean;
  hideSmesherLeftPanel: boolean;
  error: Error | null;
}

export interface RootState {
  network: NetworkState;
  node: NodeState;
  wallet: WalletState;
  smesher: SmesherState;
  ui: UiState;
}

export type CustomAction = { type: string; payload?: any };

export type AppThDispatch = ThunkDispatch<RootState, unknown, CustomAction>;

export type GetState = () => RootState;
