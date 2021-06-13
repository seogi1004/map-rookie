import { useContext } from 'react';
import { enableStaticRendering, MobXProviderContext } from 'mobx-react';
import { IS_SSR } from '@constants/common';
import { StorageStore } from './StorageStore';

enableStaticRendering(IS_SSR);

export interface Stores {
  storageStore: StorageStore;
}

export function useStores(): Stores {
  return useContext(MobXProviderContext) as Stores;
}
