import axios, { AxiosInstance } from 'axios';
import FirebaseContext from './FirebaseContext';
import EveEchoesContext from '@contexts/EveEchoesContext';

export const TIMEOUT: number = 10000;
export const DEFAULT_AXIOS_INSTANCE: AxiosInstance = axios.create({
  timeout: TIMEOUT,
});
const firebase = new FirebaseContext(DEFAULT_AXIOS_INSTANCE);
export const EVE_ECHOES_CONTEXT: EveEchoesContext = new EveEchoesContext(DEFAULT_AXIOS_INSTANCE, firebase);
