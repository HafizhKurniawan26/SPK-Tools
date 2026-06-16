import { createDataset, getDatasetById, deleteDataset } from './datasets'
import { createAlternatifsBatch, getAlternatifsByDatasetId, deleteAlternatifsByDatasetId } from './alternatifs'
import { createKriteriasBatch, getKriteriasByDatasetId, deleteKriteriasByDatasetId } from './kriterias'
import { createMatriksBatch, getMatriksByDatasetId, deleteMatriksByDatasetId } from './matriks'
import { createHasilBatch, deleteHasilByDatasetId } from './hasil'
import type { Kriteria } from '@/types'

export async function saveFullDataset(
  nama: string,
  deskripsi: string,
  alternatifNames: string[],
  kriteria: Kriteria[],
  matriksData: number[][]
): Promise<string> {
  const dataset = await createDataset(nama, deskripsi)

  const alternatifs = await createAlternatifsBatch(
    dataset.id,
    alternatifNames.map((nama, i) => ({ nama, urutan: i + 1 }))
  )

  const kriterias = await createKriteriasBatch(
    dataset.id,
    kriteria.map((k) => ({
      nama: k.nama,
      tipe: k.tipe,
      bobot: k.bobot,
      urutan: k.urutan,
    }))
  )

  const matriksItems: { alternatif_id: string; kriteria_id: string; nilai: number }[] = []
  for (let i = 0; i < matriksData.length; i++) {
    for (let j = 0; j < matriksData[i].length; j++) {
      matriksItems.push({
        alternatif_id: alternatifs[i].id!,
        kriteria_id: kriterias[j].id!,
        nilai: matriksData[i][j],
      })
    }
  }
  await createMatriksBatch(dataset.id, matriksItems)

  return dataset.id
}

export async function saveHasilKeDatabase(
  datasetId: string,
  alternatifIds: string[],
  hasilData: {
    metode: string
    nilaiAkhir: number[]
    peringkat: number[]
    detail: string[][]
  }
): Promise<void> {
  const items = alternatifIds.map((altId, i) => ({
    metode: hasilData.metode,
    alternatif_id: altId,
    nilai_akhir: hasilData.nilaiAkhir[i],
    peringkat: hasilData.peringkat[i],
    detail_perhitungan: hasilData.detail,
  }))
  await createHasilBatch(datasetId, items)
}

export async function loadFullDataset(datasetId: string) {
  const dataset = await getDatasetById(datasetId)
  if (!dataset) throw new Error('Dataset not found')

  const alternatifs = await getAlternatifsByDatasetId(datasetId)
  const kriterias = await getKriteriasByDatasetId(datasetId)
  const matriksRecords = await getMatriksByDatasetId(datasetId)

  const matriks: number[][] = alternatifs.map((alt) =>
    kriterias.map((krit) => {
      const record = matriksRecords.find(
        (m) => m.alternatif_id === alt.id && m.kriteria_id === krit.id
      )
      return record?.nilai ?? 0
    })
  )

  return {
    dataset,
    alternatifs: alternatifs.map((a) => ({ nama: a.nama, urutan: a.urutan })),
    kriterias: kriterias.map((k) => ({
      nama: k.nama,
      tipe: k.tipe as 'benefit' | 'cost',
      bobot: k.bobot,
      urutan: k.urutan,
    })),
    matriks,
  }
}

export async function deleteFullDataset(datasetId: string): Promise<void> {
  await deleteHasilByDatasetId(datasetId)
  await deleteMatriksByDatasetId(datasetId)
  await deleteKriteriasByDatasetId(datasetId)
  await deleteAlternatifsByDatasetId(datasetId)
  await deleteDataset(datasetId)
}
