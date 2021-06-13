import Faction from '@models/eve-echoes/Faction';
import factions from './factions.json';
import planetaryResources from './planetary_resources.json';
import PlanetaryResource from '@models/eve-echoes/PlanetaryResource';
import Region from '@models/eve-echoes/Region';
import { EVE_ECHOES_CONTEXT } from '../../__settings__/context';
import Constellation from '@models/eve-echoes/Constellation';
import System from '@models/eve-echoes/System';
import { Id } from '@interfaces/models/Id';
import Gate from '@models/eve-echoes/Gate';
import Station from '@models/eve-echoes/Station';
import PlanetaryResourceYield from '@models/eve-echoes/PlanetaryResourceYield';
import Plant from '@models/eve-echoes/Plant';
import StarChart, {
  RegionChart,
  SystemChart,
  Region as StarChartRegion,
  System as StarChartSystem,
  Gate as StarChartGate,
} from '@models/eve-echoes/StarChart';
import { Point } from '@interfaces/eve-echoes/map';

export function getPlanetaryResources(): PlanetaryResource[] {
  return planetaryResources.map(
    resources => {
      const planetaryResource = new PlanetaryResource();
      planetaryResource.id = resources.id.toString();
      planetaryResource.name = resources.name;
      planetaryResource.volume = resources.volume as number | null;

      return planetaryResource;
    }
  );
}

export function getFactions(): Faction[] {
  return factions.map(
    p => {
      const faction = new Faction();
      faction.id = p.id.toString();
      faction.name = p.name;
      faction.short = p.short;
      return faction
    });
}

const regionConstellationMap = new Map<Id, boolean>();
export function getRegions(kspace: any): Region[] {
  const regions: Region[] = [];
  for (const r of kspace.maps) {
    const id = r.mapID.toString()
    const region = new Region();
    region.id = id;
    region.name = r.mapName;
    region.factionRef = r.fid && EVE_ECHOES_CONTEXT.contexts.firebase.providers.eveEchoes.faction.getDocument(r.fid);
    region.localPirateRef = r.npc && EVE_ECHOES_CONTEXT.contexts.firebase.providers.eveEchoes.faction.getDocument(r.npc);
    region.point = r.x1 && r.y1 && {
      x: r.x1,
      y: r.y1,
    };
    region.minSecurity = r.minSec;
    region.maxSecurity = r.maxSec;
    region.averageSecurity = r.avgSec;

    region.constellationRefs = [];
    region.systemRefs = [];
    for (const s of r.systems) {
      if (
        s.cid &&
        s.rid === r.mapID &&
        !regionConstellationMap.has(`${id}_${s.cid}`)
      ) {
        region.constellationRefs.push(
          EVE_ECHOES_CONTEXT.contexts.firebase.providers.eveEchoes.constellation.getDocument(s.cid)
        )
        regionConstellationMap.set(`${id}_${s.cid}`, true);
      }

      if (
        s.sid &&
        s.rid === r.mapID
      ) {
        region.systemRefs.push(
          EVE_ECHOES_CONTEXT.contexts.firebase.providers.eveEchoes.system.getDocument(s.sid)
        )
      }
    }

    regions.push(region);
  }

  return regions;
}

const constellationMap = new Map<Id, Constellation>();
export function getConstellations(kspace: any): Constellation[] {
  const constellations: Constellation[] = [];
  for (const r of kspace.maps) {
    for (const s of r.systems) {
      if (!s.cid) {
        continue;
      }

      if (s.rid !== r.mapID) {
        continue;
      }

      const id = s.cid.toString();
      let constellation = constellationMap.get(id);

      if (constellation) {
        if (s.sid) {
          constellation.systemRefs.push(
            EVE_ECHOES_CONTEXT.contexts.firebase.providers.eveEchoes.system.getDocument(s.sid)
          );
        }
        continue;
      }

      constellation = new Constellation();
      constellation.id = id;
      constellation.name = s.cn;
      constellation.regionRef = s.rid &&
        EVE_ECHOES_CONTEXT.contexts.firebase.providers.eveEchoes.region.getDocument(s.rid);
      constellation.systemRefs = [];

      if (s.sid) {
        constellation.systemRefs.push(
          EVE_ECHOES_CONTEXT.contexts.firebase.providers.eveEchoes.system.getDocument(s.sid)
        );
      }

      constellations.push(constellation);
      constellationMap.set(constellation.id, constellation);
    }
  }

  return constellations;
}

export function getGates(kspace: any): Gate[] {
  const gates: Gate[] = [];

  for (const r of kspace.maps) {
    for (const g of r.ee_gates) {
      const gate = new Gate();
      gate.id = `${g.s}-${g.t}`;
      gate.fromRef = EVE_ECHOES_CONTEXT.contexts.firebase.providers.eveEchoes.system.getDocument(g.s);
      gate.toRef = EVE_ECHOES_CONTEXT.contexts.firebase.providers.eveEchoes.system.getDocument(g.t);
      gates.push(gate);
    }
  }

  return gates;
}

export function getStations(sta: any): Station[] {
  const stations: Station[] = [];

  for (const s of sta) {
    const station = new Station();
    station.id = s.id.toString();
    station.name = s.nom;
    station.systemRef = EVE_ECHOES_CONTEXT.contexts.firebase.providers.eveEchoes.system.getDocument(s.sid);
    station.factionRef = s.fid && EVE_ECHOES_CONTEXT.contexts.firebase.providers.eveEchoes.faction.getDocument(s.fac);
    stations.push(station);
  }

  return stations;
}

export function getPlantAndPlanetaryResourceYields(pla: any): [Plant[], PlanetaryResourceYield[]] {
  const plants: Plant[] = [];
  const planetaryResourceYields: PlanetaryResourceYield[] = [];
  const planetaryResourceMap = new Map(
    planetaryResources.map((planetaryResource: any) => [planetaryResource.m.toString(), planetaryResource])
  );

  for (const p of pla.planets) {
    const plant = new Plant();
    plant.id = p.id.toString();
    plant.name = p.p;
    plant.planetaryResourceYieldRefs = [];
    plants.push(plant);

    p.m.forEach((m, index) => {
      const planetaryResourceYield = new PlanetaryResourceYield();
      const id = `${p.id}-${m}`;
      planetaryResourceYield.id = id;
      planetaryResourceYield.output = p.o[index];
      planetaryResourceYield.ratio = p.a[index];
      planetaryResourceYield.ratioIcon = p.r[index];
      planetaryResourceYield.planetaryResourceRef = EVE_ECHOES_CONTEXT.contexts.firebase.providers.eveEchoes.planetaryResource.getDocument(planetaryResourceMap.get(m.toString()).id);
      planetaryResourceYield.planetRef = EVE_ECHOES_CONTEXT.contexts.firebase.providers.eveEchoes.plant.getDocument(p.id);
      planetaryResourceYield.systemRef = EVE_ECHOES_CONTEXT.contexts.firebase.providers.eveEchoes.system.getDocument(p.sid);
      planetaryResourceYields.push(planetaryResourceYield);
      plant.planetaryResourceYieldRefs.push(EVE_ECHOES_CONTEXT.contexts.firebase.providers.eveEchoes.planetaryResourceYield.getDocument(id));
    });
  }

  return [plants, planetaryResourceYields];
}

export function getSystems(kspace: any, sta: any, pla: any): System[] {
  const systems: System[] = [];
  const systemMap: Map<string, System> = new Map();

  for (const s of pla.systems) {
    const system = new System();
    system.id = s.id.toString();
    system.security = s.sec;

    system.regionRef = s.rid &&
      EVE_ECHOES_CONTEXT.contexts.firebase.providers.eveEchoes.region.getDocument(s.rid);

    system.planetRefs = [];
    system.stationRefs = [];
    system.gateRefs = [];

    systems.push(system);
    systemMap.set(system.id as string, system);
  }

  for (const r of kspace.maps) {
    for (const s of r.systems) {
      if (!s.sid) {
        continue;
      }

      if (s.rid !== r.mapID) {
        continue;
      }

      let system = systemMap.get(s.sid.toString());

      if (!system) {
        system = new System();
        system.id = s.sid.toString();
        system.security = s.sec;

        system.regionRef = s.rid &&
          EVE_ECHOES_CONTEXT.contexts.firebase.providers.eveEchoes.region.getDocument(s.rid);

        system.planetRefs = [];
        system.stationRefs = [];
        system.gateRefs = [];

        systems.push(system);
        systemMap.set(system.id as string, system);
      }

      system.name = s.sn;
      system.point1 = s.x1 && s.y1 && {
        x: s.x1,
        y: s.y1
      };
      system.point2 = s.x2 && s.y2 && {
        x: s.x2,
        y: s.y2
      };
      system.constellationRef = s.cid &&
        EVE_ECHOES_CONTEXT.contexts.firebase.providers.eveEchoes.constellation.getDocument(s.cid);
    }
  }

  for (const p of pla.planets) {
    const system = systemMap.get(p.sid.toString());

    if (!system) {
      continue;
    }

    system.planetRefs.push(EVE_ECHOES_CONTEXT.contexts.firebase.providers.eveEchoes.plant.getDocument(p.id));
  }

  for (const s of sta) {
    const system = systemMap.get(s.sid.toString());

    if (!system) {
      continue;
    }

    system.stationRefs.push(EVE_ECHOES_CONTEXT.contexts.firebase.providers.eveEchoes.station.getDocument(s.id));
  }

  for (const r of kspace.maps) {
    for (const g of r.ee_gates) {
      const system = systemMap.get(g.s.toString());

      if (!system) {
        continue;
      }

      system.gateRefs.push(EVE_ECHOES_CONTEXT.contexts.firebase.providers.eveEchoes.gate.getDocument(`${g.s}-${g.t}`));
    }
  }

  return systems;
}

export function getStarChart(kspace: any): StarChart {
  const starChart = new StarChart();
  let gates: StarChartGate[];

  const regions: StarChartRegion[] = [];
  gates = [];

  for (const r of kspace.maps) {
    if (
      !r.x1 ||
      !r.y1
    ) {
      continue;
    }

    regions.push({
      id: r.mapID.toString(),
      name: r.mapName,
      point: {
        x: r.x1,
        y: r.y1,
      },
      localPirateId: r.npc?.toString(),
      factionId: r.fid?.toString(),
      minSecurity: r.minSec,
      maxSecurity: r.maxSec,
      averageSecurity: r.avgSec,
    });
  }

  starChart.regionChart = JSON.parse(JSON.stringify({
    regions,
    gates,
  }));

  const systems: StarChartSystem[] = [];
  gates = [];

  for (const r of kspace.maps) {
    for (const s of r.systems) {
      if (!s.sid) {
        continue;
      }

      if (s.rid !== r.mapID) {
        continue;
      }

      if (
        !s.x1 ||
        !s.y1
      ) {
        continue;
      }

      systems.push({
        id: s.sid.toString(),
        name: s.sn,
        point: s.y1 && {
          x: s.x1,
          y: s.y1
        },
        security: s.sec,
      });
    }

    for (const g of r.ee_gates) {
      gates.push({
        id: `${g.s}-${g.t}`,
        from: g.s.toString(),
        to: g.t.toString(),
      });
    }
  }

  starChart.systemChart = JSON.parse(JSON.stringify({
    systems,
    gates,
  }));

  return starChart;
}
