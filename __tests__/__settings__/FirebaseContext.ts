import admin from '../../src/server/libs/firebase/firebase-admin';

import { AxiosInstance } from 'axios';

import OriginFirebaseContext from '@contexts/FirebaseContext';
import FirebaseUserProvider from '@providers/account/FirebaseUserProvider';
import FirebaseStorageProvider from '@providers/account/FirebaseStorageProvider';
import FirebasePlanetaryResourceProvider from '@providers/eve-echoes/FirebasePlanetaryResourceProvider';
import FirebaseFactionProvider from '@providers/eve-echoes/FirebaseFactionProvider';
import FirebaseConstellationProvider from '@providers/eve-echoes/FirebaseConstellationProvider';
import FirebaseGateProvider from '@providers/eve-echoes/FirebaseGateProvider';
import FirebaseItemProvider from '@providers/eve-echoes/FirebaseItemProvider';
import FirebasePlanetaryResourceYieldProvider from '@providers/eve-echoes/FirebasePlanetaryResourceYieldProvider';
import FirebasePlantProvider from '@providers/eve-echoes/FirebasePlantProvider';
import FirebaseRegionProvider from '@providers/eve-echoes/FirebaseRegionProvider';
import FirebaseStationProvider from '@providers/eve-echoes/FirebaseStationProvider';
import FirebaseSystemProvider from '@providers/eve-echoes/FirebaseSystemProvider';
import FirebaseStarChartProvider from '@providers/eve-echoes/FirebaseStarChartProvider';

export const db: any = admin.firestore();
export const auth: any = admin.auth();

export default class FirebaseContext extends OriginFirebaseContext {
  constructor(axiosInstance: AxiosInstance) {
    super(axiosInstance);
    this.providers = {
      account: {
        user: new FirebaseUserProvider(db, auth),
        storage: new FirebaseStorageProvider(db, auth),
      },
      eveEchoes: {
        constellation: new FirebaseConstellationProvider(db, auth),
        faction: new FirebaseFactionProvider(db, auth),
        gate: new FirebaseGateProvider(db, auth),
        item: new FirebaseItemProvider(db, auth),
        planetaryResource: new FirebasePlanetaryResourceProvider(db, auth),
        planetaryResourceYield: new FirebasePlanetaryResourceYieldProvider(db, auth),
        plant: new FirebasePlantProvider(db, auth),
        region: new FirebaseRegionProvider(db, auth),
        station: new FirebaseStationProvider(db, auth),
        system: new FirebaseSystemProvider(db, auth),
        starChart: new FirebaseStarChartProvider(db, auth),
      },
    };
  }
}
