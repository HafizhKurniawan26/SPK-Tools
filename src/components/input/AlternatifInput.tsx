import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useSPKStore } from "@/store/useSPKStore";

export function AlternatifInput() {
  const { alternatif, addAlternatif, removeAlternatif, updateAlternatif } =
    useSPKStore();

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Input Alternatif
        </h3>
        <Button
          variant="outline"
          size="sm"
          icon={Plus}
          onClick={addAlternatif}
          className="w-full sm:w-auto"
        >
          Tambah Alternatif
        </Button>
      </div>

      <div className="space-y-2">
        {alternatif.map((alt, index) => (
          <div key={index} className="flex items-center gap-2">
            <span className="w-6 text-center text-sm font-medium text-gray-500 flex-shrink-0">
              {index + 1}.
            </span>
            <div className="flex-1 min-w-0">
              <Input
                value={alt.nama}
                onChange={(e) => updateAlternatif(index, e.target.value)}
                placeholder={`Alternatif ${index + 1}`}
                className="w-full"
              />
            </div>
            <Button
              variant="ghost"
              size="sm"
              icon={Trash2}
              onClick={() => removeAlternatif(index)}
              disabled={alternatif.length <= 2}
              className="text-red-500 hover:text-red-700 flex-shrink-0"
            />
          </div>
        ))}
      </div>

      {alternatif.length < 2 && (
        <p className="text-sm text-red-500">Minimal 2 alternatif</p>
      )}
    </div>
  );
}
