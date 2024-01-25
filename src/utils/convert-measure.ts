export function convertMeasure(
  measure: number | undefined,
  unit: 'm' | 'k' = 'm',
): string {
  let convertedMeasure: number | undefined

  if (unit === 'k') {
    convertedMeasure = measure && measure / 1000
    return `${convertedMeasure?.toFixed(0)} km`
  }

  return `${measure?.toFixed(1)} m`
}
