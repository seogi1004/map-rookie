import { LngLat, TileCoordinates } from '@interfaces/coordinates';

export function lng2x(lng: number, zoom: number): number {
  return ((lng + 180) / 360) * Math.pow(2, zoom);
}

export function lat2y(lat: number, zoom: number): number {
  return (
    ((1 - Math.log(Math.tan((lat * Math.PI) / 180) + 1 / Math.cos((lat * Math.PI) / 180)) / Math.PI) / 2) *
    Math.pow(2, zoom)
  );
}

export function lngLat2tile(lngLat: LngLat, zoom: number): TileCoordinates {
  return {
    z: zoom,
    x: lng2x(lngLat.lng, zoom),
    y: lat2y(lngLat.lat, zoom),
  };
}

export function x2lng(x: number, zoom: number): number {
  return (x / Math.pow(2, zoom)) * 360 - 180;
}

export function y2lat(y: number, zoom: number): number {
  return (Math.atan(Math.sinh(Math.PI * (1 - (2 * y) / Math.pow(2, zoom)))) * 180) / Math.PI;
}

export function tile2lngLat(tileCoordinates: TileCoordinates): LngLat {
  return {
    lng: x2lng(tileCoordinates.x, tileCoordinates.z),
    lat: y2lat(tileCoordinates.y, tileCoordinates.z),
  };
}
