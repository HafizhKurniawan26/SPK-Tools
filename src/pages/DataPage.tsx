import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RefreshCw, Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Pagination } from "@/components/ui/Pagination";
import { Skeleton } from "@/components/ui/Skeleton";
import { SearchBar } from "@/components/datasets/SearchBar";
import { DatasetTable } from "@/components/datasets/DatasetTable";
import { DeleteConfirmModal } from "@/components/datasets/DeleteConfirmModal";
import { useDatasets } from "@/hooks/useDatasets";
import { useSPKStore } from "@/store/useSPKStore";
import { loadFullDataset } from "@/lib/api/index";
import type { Dataset } from "@/types";

export function DataPage() {
  const navigate = useNavigate();
  const {
    datasets,
    totalPages,
    currentPage,
    search,
    isLoading,
    error,
    setPage,
    setSearch,
    refresh,
    hapusDataset,
  } = useDatasets();

  const [deleteTarget, setDeleteTarget] = useState<Dataset | null>(null);
  const [deleting, setDeleting] = useState(false);
  const { setAlternatif, setKriteria, setMatriks, setCurrentDataset } =
    useSPKStore();

  const handleLoad = async (dataset: Dataset) => {
    try {
      const data = await loadFullDataset(dataset.id);
      setAlternatif(data.alternatifs);
      setKriteria(data.kriterias);
      setMatriks(data.matriks);
      setCurrentDataset(dataset.id, dataset.nama);
      navigate("/input");
    } catch (e) {
      alert("Gagal memuat data: " + (e instanceof Error ? e.message : "Error"));
    }
  };

  const handleLihatHasil = async (dataset: Dataset) => {
    try {
      const data = await loadFullDataset(dataset.id);
      setAlternatif(data.alternatifs);
      setKriteria(data.kriterias);
      setMatriks(data.matriks);
      setCurrentDataset(dataset.id, dataset.nama);
      navigate("/hasil");
    } catch (e) {
      alert("Gagal memuat data: " + (e instanceof Error ? e.message : "Error"));
    }
  };

  const handleHapus = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await hapusDataset(deleteTarget.id);
      setDeleteTarget(null);
    } catch (e) {
      alert("Gagal menghapus: " + (e instanceof Error ? e.message : "Error"));
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-6 min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Data Tersimpan
          </h1>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            Dataset yang telah disimpan ke database
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" icon={RefreshCw} onClick={refresh}>
            Refresh
          </Button>
          <Button icon={Plus} onClick={() => navigate("/input")}>
            Input Data Baru
          </Button>
        </div>
      </div>

      <SearchBar value={search} onChange={setSearch} />

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-center text-red-700 dark:border-red-800 dark:bg-red-900/50 dark:text-red-300">
          <p>{error}</p>
          <Button
            variant="outline"
            size="sm"
            onClick={refresh}
            className="mt-2"
          >
            Coba Lagi
          </Button>
        </div>
      )}

      {isLoading ? (
        <Skeleton variant="table-row" count={5} />
      ) : (
        <DatasetTable
          datasets={datasets}
          onLoad={handleLoad}
          onLihatHasil={handleLihatHasil}
          onHapus={setDeleteTarget}
        />
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setPage}
      />

      <DeleteConfirmModal
        isOpen={deleteTarget !== null}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleHapus}
        datasetNama={deleteTarget?.nama ?? ""}
        loading={deleting}
      />
    </div>
  );
}
