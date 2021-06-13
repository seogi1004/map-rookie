import axios from 'axios';
import {
  getConstellations,
  getGates,
  getPlantAndPlanetaryResourceYields,
  getRegions,
  getStarChart,
  getStations,
  getSystems
} from '../__data__/data';
import { db } from '../../__settings__/FirebaseContext';
import { EVE_ECHOES_CONTEXT } from '../../__settings__/context';
import StarChart from '@models/eve-echoes/StarChart';

describe('Eve Echoes star chart', () => {
  let kspace, rcs, sta, pla;

  const needToUpdate = {
    region: false,
    constellation: false,
    gate: false,
    station: false,
    plant: false,
    system: false,
    map: true,
  };

  beforeAll(async () => {
    [kspace, rcs, sta, pla] = await Promise.all([
      axios.get('https://echoes.eveeye.com/mapdata/kspace.txt').then(({ data }) => data),
      axios.get('https://echoes.eveeye.com/mapdata/echoes_supersearch_rcs.txt').then(({ data }) => data),
      axios.get('https://echoes.eveeye.com/mapdata/echoes_supersearch_sta.txt').then(({ data }) => data),
      axios.get('https://echoes.eveeye.com/mapdata/echoes_supersearch_pla.txt').then(({ data }) => data),
    ]);
  }, 500000);

  test('region', async () => {
    if (!needToUpdate.region) {
      return;
    }

    const regions = getRegions(kspace);

    const batch = db.batch();
    await Promise.all(
      regions.map(region => EVE_ECHOES_CONTEXT.repositories.region.create(region).toPromise())
    );
    await batch.commit();
  }, 500000);

  test('constellation', async () => {
    if (!needToUpdate.constellation) {
      return;
    }

    const constellations = getConstellations(kspace);

    const size = Math.ceil(constellations.length / 500);
    for (let i = 0; i < size; i++) {
      const batch = db.batch();
      await Promise.all(
        constellations
          .slice(i * 500, (i + 1) * 500)
          .map(constellation => EVE_ECHOES_CONTEXT.repositories.constellation.create(constellation).toPromise())
      );
      await batch.commit();
    }
  }, 500000);

  test('gate', async () => {
    if (!needToUpdate.gate) {
      return;
    }

    const gates = getGates(kspace);

    const size = Math.ceil(gates.length / 500);
    for (let i = 0; i < size; i++) {
      const batch = db.batch();
      await Promise.all(
        gates
          .slice(i * 500, (i + 1) * 500)
          .map(gate => EVE_ECHOES_CONTEXT.repositories.gate.create(gate).toPromise())
      );
      await batch.commit();
    }
  }, 500000);

  test('station', async () => {
    if (!needToUpdate.station) {
      return;
    }

    const stations = getStations(sta);

    const size = Math.ceil(stations.length / 500);
    for (let i = 0; i < size; i++) {
      const batch = db.batch();
      await Promise.all(
        stations
          .slice(i * 500, (i + 1) * 500)
          .map(station => EVE_ECHOES_CONTEXT.repositories.station.create(station).toPromise())
      );
      await batch.commit();
    }
  }, 500000);

  test('plant', async () => {
    if (!needToUpdate.plant) {
      return;
    }

    let [plants, planetaryResourceYields] = getPlantAndPlanetaryResourceYields(pla);

    plants = plants.slice(plants.length);
    planetaryResourceYields = planetaryResourceYields.slice(planetaryResourceYields.length);

    const plantSize = Math.ceil(plants.length / 500);
    for (let i = 0; i < plantSize; i++) {
      const batch = db.batch();
      await Promise.all(
        plants
          .slice(i * 500, (i + 1) * 500)
          .map(plant => EVE_ECHOES_CONTEXT.repositories.plant.create(plant, { batch }).toPromise())
      );
      try {
        await batch.commit();
      } catch (e) {
        console.error(i);
        break;
      }
    }

    const planetaryResourceYieldSize = Math.ceil(planetaryResourceYields.length / 500);
    for (let i = 0; i < planetaryResourceYieldSize; i++) {
      const batch = db.batch();
      await Promise.all(
        planetaryResourceYields
          .slice(i * 500, (i + 1) * 500)
          .map(planetaryResourceYield => EVE_ECHOES_CONTEXT.repositories.planetaryResourceYield.create(planetaryResourceYield, { batch }).toPromise())
      );
      try {
        await batch.commit();
      } catch (e) {
        console.error(i);
        break;
      }
    }
  }, 1000000);

  test('system', async () => {
    if (!needToUpdate.system) {
      return;
    }

    const systems = getSystems(kspace, sta, pla);

    const size = Math.ceil(systems.length / 500);
    for (let i = 0; i < size; i++) {
      const batch = db.batch();
      await Promise.all(
        systems
          .slice(i * 500, (i + 1) * 500)
          .map(system => EVE_ECHOES_CONTEXT.repositories.system.create(system).toPromise())
      );
      await batch.commit();
    }

  }, 500000);

  test('map', async () => {
    if (!needToUpdate.map) {
      return;
    }

    const starChart = getStarChart(kspace);
    // await EVE_ECHOES_CONTEXT.repositories.starChart.delete().toPromise();
    await EVE_ECHOES_CONTEXT.repositories.starChart.set(starChart).toPromise();
  }, 500000);

  test('debug', async () => {
    if (needToUpdate.region) {
      const regions = await EVE_ECHOES_CONTEXT.repositories.region.count().toPromise();
      console.log(regions);
    }

    if (needToUpdate.constellation) {
      const constellations = await EVE_ECHOES_CONTEXT.repositories.constellation.count().toPromise();
      console.log(constellations);
    }

    if (needToUpdate.gate) {
      const gates = await EVE_ECHOES_CONTEXT.repositories.gate.count().toPromise();
      console.log(gates);
    }

    if (needToUpdate.station) {
      const stations = await EVE_ECHOES_CONTEXT.repositories.station.count().toPromise();
      console.log(stations);
    }

    if (needToUpdate.plant) {
      const plants = await EVE_ECHOES_CONTEXT.repositories.plant.count().toPromise();
      console.log(plants);
      const planetaryResourceYields = await EVE_ECHOES_CONTEXT.repositories.planetaryResourceYield.count().toPromise();
      console.log(planetaryResourceYields);
    }

    if (needToUpdate.system) {
      const systems = await EVE_ECHOES_CONTEXT.repositories.system.count().toPromise();
      console.log(systems);
    }

    if (needToUpdate.map) {
      const starChart = await EVE_ECHOES_CONTEXT.repositories.starChart.get().toPromise();
      console.log(starChart);
    }

  }, 500000);

});
