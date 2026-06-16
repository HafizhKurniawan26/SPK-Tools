import { supabase } from '@/lib/supabase'
import type { Alternatif } from '@/types'

export async function getAlternatifsByDatasetId(datasetId: string): Promise<Alternatif[]> {
  const { data, error } = await supabase
    .from('alternatifs')
    .select('*')
    .eq('dataset_id', datasetId)
    .order('urutan', { ascending: true })
  if (error) throw error
  return data ?? []
}

export async function createAlternatifsBatch(
  datasetId: string,
  items: { nama: string; urutan: number }[]
): Promise<Alternatif[]> {
  const dataToInsert = items.map((item) => ({
    dataset_id: datasetId,
    nama: item.nama,
    urutan: item.urutan,
  }))
  const { data, error } = await supabase
    .from('alternatifs')
    .insert(dataToInsert)
    .select()
  if (error) throw error
  return data ?? []
}

export async function deleteAlternatifsByDatasetId(datasetId: string): Promise<void> {
  const { error } = await supabase
    .from('alternatifs')
    .delete()
    .eq('dataset_id', datasetId)
  if (error) throw error
}
