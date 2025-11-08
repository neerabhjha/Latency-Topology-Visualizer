export type LatLng = { lat: number; lng: number };

/** Haversine distance in km */
export function distanceKm(a: LatLng, b: LatLng) {
  const toRad = (x: number) => (x * Math.PI) / 180;
  const R = 6371; // km
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const s1 = Math.sin(dLat / 2) ** 2 +
             Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(s1));
}

/** Rough RTT estimate (ms) from distance.
 * Speed of light in fiber ≈ 200,000 km/s ⇒ ~0.005 ms/km one-way.
 * RTT ≈ distance * 0.01 + overhead factor (routing, switches). */
export function estimateRttMs(km: number, overhead = 1.5) {
  return km * 0.01 * overhead; // ms
}
