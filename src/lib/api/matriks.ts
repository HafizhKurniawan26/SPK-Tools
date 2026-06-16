import { supabase } from '@/lib/supabase'

interface MatriksRecord {
  id: string
  dataset_id: string
  alternatif_id: string
  kriteria_id: string
  nilai: number
}

export async function getMatriksByDatasetId(datasetId: string): Promise<MatriksRecord[]> {
  const { data, error } = await supabase
    .from('matriks_nilais')
    .select('*')
    .eq('dataset_id', datasetId)
  if (error) throw error
  return data ?? []
}

export async function createMatriksBatch(
  datasetId: string,
  items: { alternatif_id: string; kriteria_id: string; nilai: number }[]
): Promise<MatriksRecord[]> {
  const dataToInsert = items.map((item) => ({
    dataset_id: datasetId,
    alternatif_id: item.alternatif_id,
    kriteria_id: item.kriteria_id,
    nilai: item.nilai,
  }))
  const { data, error } = await supabase
    .from('matriks_nilais')
    .insert(dataToInsert)
    .select()
  if (error) throw error
  return data ?? []
}

export async function deleteMatriksByDatasetId(datasetId: string): Promise<void> {
  const { error } = await supabase
    .from('matriks_nilais')
    .delete()
    .eq('dataset_id', datasetId)
  if (error) throw error
}
