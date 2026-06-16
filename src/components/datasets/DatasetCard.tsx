import { Database, Trash2, Eye, ArrowRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { formatTanggal } from '@/utils/formatters'
import type { Dataset } from '@/types'

interface DatasetCardProps {
  dataset: Dataset
  onLoad: () => void
  onLihatHasil: () => void
  onHapus: () => void
}

export function DatasetCard({ dataset, onLoad, onLihatHasil, onHapus }: DatasetCardProps) {
  return (
    <Card variant="elevated">
      <CardContent className="p-5">
        <div className="mb-3 flex items-start justify-between">
          <div className="flex items-center gap-2">
            <Database className="h-5 w-5 text-primary-600" />
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">
              {dataset.nama}
            </h3>
          </div>
          <Button variant="ghost" size="sm" icon={Trash2} onClick={onHapus} className="text-red-500" />
        </div>
        {dataset.deskripsi && (
          <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">
            {dataset.deskripsi}
          </p>
        )}
        <p className="mb-4 text-xs text-gray-400">
          {formatTanggal(dataset.created_at)}
        </p>
        <div className="flex gap-2">
          <Button size="sm" icon={ArrowRight} onClick={onLoad}>
            Load
          </Button>
          <Button size="sm" variant="outline" icon={Eye} onClick={onLihatHasil}>
            Lihat Hasil
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
