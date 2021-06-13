import { avoid } from '../decorators/ssr';

export default class LocalStorage {
  @avoid
  public static async get<T>(key: string): Promise<T | null> {
    let item: T | null = null;

    const raw: string | null = localStorage.getItem(key);

    if (raw) {
      try {
        item = JSON.parse(raw) as T;
      } catch (e) {}
    }

    return item;
  }

  @avoid
  public static async set<T>(key: string, item: T | null): Promise<void> {
    try {
      localStorage.setItem(key, JSON.stringify(item));
    } catch (e) {}
  }

  @avoid
  public static async remove<T>(key: string): Promise<void> {
    localStorage.removeItem(key);
  }

  @avoid
  public static async clear(): Promise<void> {
    await localStorage.clear();
  }
}
