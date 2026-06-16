import { supabase } from '@/lib/supabase'
import type { Kriteria } from '@/types'

export async function getKriteriasByDatasetId(datasetId: string): Promise<Kriteria[]> {
  const { data, error } = await supabase
    .from('kriterias')
    .select('*')
    .eq('dataset_id', datasetId)
    .order('urutan', { ascending: true })
  if (error) throw error
  return data ?? []
}

export async function createKriteriasBatch(
  datasetId: string,
  items: { nama: string; tipe: string; bobot: number; urutan: number }[]
): Promise<Kriteria[]> {
  const dataToInsert = items.map((item) => ({
    dataset_id: datasetId,
    nama: item.nama,
    tipe: item.tipe,
    bobot: item.bobot,
    urutan: item.urutan,
  }))
  const { data, error } = await supabase
    .from('kriterias')
    .insert(dataToInsert)
    .select()
  if (error) throw error
  return data ?? []
}

export async function deleteKriteriasByDatasetId(datasetId: string): Promise<void> {
  const { error } = await supabase
    .from('kriterias')
    .delete()
    .eq('dataset_id', datasetId)
  if (error) throw error
}
