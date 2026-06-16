import { useCallback, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { PostgrestError } from '@supabase/supabase-js'

interface UseSupabaseReturn<T> {
  data: T | null
  isLoading: boolean
  error: string | null
  execute: () => Promise<void>
}

export function useSupabaseQuery<T>(
  queryFn: () => Promise<{ data: T | null; error: PostgrestError | null }>
): UseSupabaseReturn<T> {
  const [data, setData] = useState<T | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const execute = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const result = await queryFn()
      if (result.error) throw result.error
      setData(result.data)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Terjadi kesalahan')
    } finally {
      setIsLoading(false)
    }
  }, [queryFn])

  return { data, isLoading, error, execute }
}

export async function getCount(table: string): Promise<number> {
  const { count, error } = await supabase
    .from(table)
    .select('*', { count: 'exact', head: true })
  if (error) throw error
  return count ?? 0
}
