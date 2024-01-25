export function convertVelocity(
  velocity: number | undefined,
  unit: 'm/s' | 'km/h' = 'm/s',
): string {
  let convertedVelocity: number | undefined

  if (unit === 'km/h') {
    convertedVelocity = velocity && velocity * 3.6
    return `${convertedVelocity?.toFixed(0)} km/h`
  }

  return `${velocity?.toFixed(1)} m/s`
}
