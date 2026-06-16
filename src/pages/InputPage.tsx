import { InputForm } from '@/components/input/InputForm'

export function InputPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Input Data SPK
        </h1>
        <p className="mt-1 text-gray-600 dark:text-gray-400">
          Masukkan data alternatif, kriteria, dan nilai matriks untuk perhitungan
        </p>
      </div>

      <InputForm />
    </div>
  )
}
