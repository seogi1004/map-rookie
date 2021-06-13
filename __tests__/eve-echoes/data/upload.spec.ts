import { EVE_ECHOES_CONTEXT } from '../../__settings__/context';
import {
  getFactions,
  getPlanetaryResources
} from '../__data__/data';

describe('Eve Echoes data', () => {
  test('planetary resource', async () => {
    const planetaryResources = getPlanetaryResources();
    const results = await Promise.all(
      planetaryResources.map(
        resources => {
          EVE_ECHOES_CONTEXT.repositories.planetaryResource
            .create(resources)
            .toPromise()
        }
      )
    );

    expect(planetaryResources.length).toBe(results.length);
  }, 100000);

  test('faction', async () => {
    const factions = getFactions();
    const results = await Promise.all(
      factions.map(
        faction => EVE_ECHOES_CONTEXT.repositories.faction
          .create(faction)
          .toPromise()
      )
    );

    expect(factions.length).toBe(results.length);
  }, 100000);
});
