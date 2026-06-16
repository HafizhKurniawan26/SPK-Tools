import { useCallback, useEffect, useRef, useState } from 'react'
import { getAllDatasets, deleteDataset } from '@/lib/api/datasets'
import type { Dataset } from '@/types'

interface UseDatasetsReturn {
  datasets: Dataset[]
  totalData: number
  totalPages: number
  currentPage: number
  search: string
  isLoading: boolean
  error: string | null
  setPage: (page: number) => void
  setSearch: (search: string) => void
  refresh: () => void
  hapusDataset: (id: string) => Promise<void>
}

export function useDatasets(pageSize: number = 10): UseDatasetsReturn {
  const [datasets, setDatasets] = useState<Dataset[]>([])
  const [totalData, setTotalData] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [search, setSearch] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [refreshKey, setRefreshKey] = useState(0)
  const mountedRef = useRef(true)

  const refresh = useCallback(() => setRefreshKey((k) => k + 1), [])

  useEffect(() => {
    mountedRef.current = true
    const fetchData = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const result = await getAllDatasets(currentPage, pageSize, search)
        if (mountedRef.current) {
          setDatasets(result.data)
          setTotalData(result.total)
          setTotalPages(Math.ceil(result.total / pageSize))
        }
      } catch (e) {
        if (mountedRef.current) {
          setError(e instanceof Error ? e.message : 'Gagal mengambil data')
        }
      } finally {
        if (mountedRef.current) {
          setIsLoading(false)
        }
      }
    }
    fetchData()
    return () => { mountedRef.current = false }
  }, [currentPage, pageSize, search, refreshKey])

  const hapusDataset = useCallback(async (id: string) => {
    await deleteDataset(id)
    refresh()
  }, [refresh])

  return {
    datasets,
    totalData,
    totalPages,
    currentPage,
    search,
    isLoading,
    error,
    setPage: setCurrentPage,
    setSearch,
    refresh,
    hapusDataset,
  }
}
