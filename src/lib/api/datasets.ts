import { supabase } from '@/lib/supabase'
import type { Dataset } from '@/types'

interface PaginationResult {
  data: Dataset[]
  total: number
}

export async function getAllDatasets(
  page: number = 1,
  limit: number = 10,
  search?: string
): Promise<PaginationResult> {
  let query = supabase
    .from('datasets')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range((page - 1) * limit, page * limit - 1)

  if (search) {
    query = query.ilike('nama', `%${search}%`)
  }

  const { data, error, count } = await query
  if (error) throw error
  return { data: data ?? [], total: count ?? 0 }
}

export async function getDatasetById(id: string): Promise<Dataset | null> {
  const { data, error } = await supabase
    .from('datasets')
    .select('*')
    .eq('id', id)
    .single()
  if (error) throw error
  return data
}

export async function createDataset(
  nama: string,
  deskripsi: string
): Promise<Dataset> {
  const { data, error } = await supabase
    .from('datasets')
    .insert({ nama, deskripsi })
    .select()
    .single()
  if (error) throw error
  return data
}

export async function updateDataset(
  id: string,
  data: Partial<Pick<Dataset, 'nama' | 'deskripsi'>>
): Promise<Dataset> {
  const { data: result, error } = await supabase
    .from('datasets')
    .update(data)
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return result
}

export async function deleteDataset(id: string): Promise<void> {
  const { error } = await supabase.from('datasets').delete().eq('id', id)
  if (error) throw error
}
