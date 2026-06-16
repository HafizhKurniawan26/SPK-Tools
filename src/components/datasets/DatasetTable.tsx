import { ArrowRight, Eye, Trash2, Database } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { formatTanggal } from '@/utils/formatters'
import type { Dataset } from '@/types'

interface DatasetTableProps {
  datasets: Dataset[]
  onLoad: (dataset: Dataset) => void
  onLihatHasil: (dataset: Dataset) => void
  onHapus: (dataset: Dataset) => void
}

export function DatasetTable({ datasets, onLoad, onLihatHasil, onHapus }: DatasetTableProps) {
  if (datasets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-gray-400 dark:text-gray-500">
        <Database className="mb-4 h-16 w-16" />
        <p className="text-lg font-medium">Belum ada data tersimpan</p>
        <p className="mt-1 text-sm">Simpan dataset dari halaman Input untuk memulai</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800/50">
            <th className="w-12 px-4 py-3 font-medium text-gray-700 dark:text-gray-300">No</th>
            <th className="px-4 py-3 font-medium text-gray-700 dark:text-gray-300">Nama Dataset</th>
            <th className="px-4 py-3 font-medium text-gray-700 dark:text-gray-300">Deskripsi</th>
            <th className="px-4 py-3 font-medium text-gray-700 dark:text-gray-300">Tanggal Dibuat</th>
            <th className="px-4 py-3 font-medium text-gray-700 dark:text-gray-300">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {datasets.map((ds, index) => (
            <tr key={ds.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/30">
              <td className="px-4 py-3 text-gray-500">{index + 1}</td>
              <td className="px-4 py-3 font-medium text-gray-900 dark:text-gray-100">
                {ds.nama}
              </td>
              <td className="max-w-xs truncate px-4 py-3 text-gray-600 dark:text-gray-400">
                {ds.deskripsi || '-'}
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-gray-600 dark:text-gray-400">
                {formatTanggal(ds.created_at)}
              </td>
              <td className="px-4 py-3">
                <div className="flex gap-1">
                  <Button size="sm" icon={ArrowRight} onClick={() => onLoad(ds)}>
                    Load
                  </Button>
                  <Button size="sm" variant="outline" icon={Eye} onClick={() => onLihatHasil(ds)}>
                    Lihat Hasil
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    icon={Trash2}
                    onClick={() => onHapus(ds)}
                    className="text-red-500"
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
