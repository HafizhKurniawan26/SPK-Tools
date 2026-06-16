import { AlertTriangle } from 'lucide-react'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'

interface DeleteConfirmModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  datasetNama: string
  loading?: boolean
}

export function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  datasetNama,
  loading,
}: DeleteConfirmModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Hapus Dataset"
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>
            Batal
          </Button>
          <Button variant="danger" onClick={onConfirm} loading={loading}>
            Hapus
          </Button>
        </>
      }
    >
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="rounded-full bg-red-100 p-3 dark:bg-red-900/50">
          <AlertTriangle className="h-8 w-8 text-red-600 dark:text-red-400" />
        </div>
        <div>
          <p className="text-gray-900 dark:text-gray-100">
            Apakah Anda yakin ingin menghapus dataset
          </p>
          <p className="mt-1 font-semibold text-gray-900 dark:text-gray-100">
            "{datasetNama}"?
          </p>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Semua data terkait (alternatif, kriteria, matriks, hasil) akan ikut terhapus.
            Tindakan ini tidak dapat dibatalkan.
          </p>
        </div>
      </div>
    </Modal>
  )
}
