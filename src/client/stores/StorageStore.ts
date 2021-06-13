import { makeAutoObservable } from 'mobx';
import { IS_SSR } from '@constants/common';
import { useMemo } from 'react';
import LocalStorage from '@utils/LocalStorage';

export class StorageStore {
  public lastUpdate: number = 0;

  constructor() {
    makeAutoObservable(this);
    void this.clear();
    void this.hydrate();
  }

  public async hydrate(): Promise<void> {}

  public async get<T>(key: string): Promise<T | null> {
    return await LocalStorage.get<T>(key);
  }

  public async set<T>(key: string, item: T | null): Promise<void> {
    await LocalStorage.set<T>(key, item);
  }

  public async remove<T>(key: string): Promise<void> {
    await LocalStorage.remove<T>(key);
  }

  private async clear(): Promise<void> {}
}

let store: StorageStore;

function initializeStore() {
  const _store = store ?? new StorageStore();

  if (IS_SSR) {
    return _store;
  }

  return _store;
}

export function useStorageStore(): StorageStore {
  return useMemo(() => initializeStore(), []);
}
