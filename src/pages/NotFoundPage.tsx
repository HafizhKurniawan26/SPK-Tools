import { Link } from 'react-router-dom'
import { Home, FileQuestion } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center py-24">
      <FileQuestion className="h-24 w-24 text-gray-300 dark:text-gray-600" />
      <h1 className="mt-6 text-4xl font-bold text-gray-900 dark:text-gray-100">
        404
      </h1>
      <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
        Halaman yang Anda cari tidak ditemukan
      </p>
      <Link to="/" className="mt-6">
        <Button icon={Home}>
          Kembali ke Beranda
        </Button>
      </Link>
    </div>
  )
}
