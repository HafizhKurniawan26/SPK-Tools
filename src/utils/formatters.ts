export function formatAngka(value: number, decimals: number = 4): string {
  return Number(value).toFixed(decimals)
}

export function formatTanggal(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function formatPersen(value: number): string {
  return `${(value * 100).toFixed(0)}%`
}

export function formatBobot(value: number): string {
  return value.toFixed(2)
}
