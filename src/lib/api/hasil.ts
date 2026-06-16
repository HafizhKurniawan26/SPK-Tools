import { supabase } from '@/lib/supabase'

interface HasilRecord {
  id: string
  dataset_id: string
  metode: string
  alternatif_id: string
  nilai_akhir: number
  peringkat: number
  detail_perhitungan: unknown
}

export async function getHasilByDatasetId(datasetId: string): Promise<HasilRecord[]> {
  const { data, error } = await supabase
    .from('hasil_perhitungans')
    .select('*')
    .eq('dataset_id', datasetId)
  if (error) throw error
  return data ?? []
}

export async function createHasilBatch(
  datasetId: string,
  items: {
    metode: string
    alternatif_id: string
    nilai_akhir: number
    peringkat: number
    detail_perhitungan: unknown
  }[]
): Promise<HasilRecord[]> {
  const dataToInsert = items.map((item) => ({
    dataset_id: datasetId,
    metode: item.metode,
    alternatif_id: item.alternatif_id,
    nilai_akhir: item.nilai_akhir,
    peringkat: item.peringkat,
    detail_perhitungan: item.detail_perhitungan,
  }))
  const { data, error } = await supabase
    .from('hasil_perhitungans')
    .insert(dataToInsert)
    .select()
  if (error) throw error
  return data ?? []
}

export async function deleteHasilByDatasetId(datasetId: string): Promise<void> {
  const { error } = await supabase
    .from('hasil_perhitungans')
    .delete()
    .eq('dataset_id', datasetId)
  if (error) throw error
}
