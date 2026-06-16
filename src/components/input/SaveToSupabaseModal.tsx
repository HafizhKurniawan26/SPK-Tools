import { useState } from 'react'
import { Database } from 'lucide-react'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useSPKStore } from '@/store/useSPKStore'

interface SaveToSupabaseModalProps {
  isOpen: boolean
  onClose: () => void
  onSaved: (id: string) => void
}

export function SaveToSupabaseModal({ isOpen, onClose, onSaved }: SaveToSupabaseModalProps) {
  const [nama, setNama] = useState('')
  const [deskripsi, setDeskripsi] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { alternatif, kriteria, matriks } = useSPKStore()

  const handleSave = async () => {
    if (!nama.trim()) {
      setError('Nama dataset harus diisi')
      return
    }

    setSaving(true)
    setError(null)

    try {
      const { saveFullDataset } = await import('@/lib/api/index')
      const id = await saveFullDataset(
        nama.trim(),
        deskripsi.trim(),
        alternatif.map((a) => a.nama),
        kriteria,
        matriks
      )
      onSaved(id)
      onClose()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Gagal menyimpan ke database')
    } finally {
      setSaving(false)
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Simpan ke Database"
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>
            Batal
          </Button>
          <Button onClick={handleSave} loading={saving} icon={Database}>
            Simpan
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        <Input
          label="Nama Dataset"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          placeholder="Contoh: Pemilihan Laptop"
          error={error || undefined}
        />
        <Input
          label="Deskripsi (Opsional)"
          value={deskripsi}
          onChange={(e) => setDeskripsi(e.target.value)}
          placeholder="Deskripsi dataset..."
        />
        <div className="rounded-lg bg-gray-50 p-3 text-sm text-gray-600 dark:bg-gray-900 dark:text-gray-400">
          <p>Akan menyimpan:</p>
          <ul className="mt-1 list-inside list-disc">
            <li>{alternatif.length} alternatif</li>
            <li>{kriteria.length} kriteria</li>
            <li>{matriks.length} baris matriks</li>
          </ul>
        </div>
      </div>
    </Modal>
  )
}
