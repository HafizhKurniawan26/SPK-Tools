import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { useSPKStore } from "@/store/useSPKStore";

export function KriteriaInput() {
  const { kriteria, addKriteria, removeKriteria, updateKriteria } =
    useSPKStore();

  const totalBobot = kriteria.reduce((sum, k) => sum + k.bobot, 0);
  const bobotValid = Math.abs(totalBobot - 1) <= 0.01;

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Input Kriteria
        </h3>
        <Button
          variant="outline"
          size="sm"
          icon={Plus}
          onClick={addKriteria}
          className="w-full sm:w-auto"
        >
          Tambah Kriteria
        </Button>
      </div>

      {/* Mobile: Card view, Desktop: Table view */}
      <div className="block sm:hidden space-y-3">
        {kriteria.map((k, index) => (
          <div
            key={index}
            className="rounded-lg border border-gray-200 p-3 dark:border-gray-700"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-500">
                #{index + 1}
              </span>
              <Button
                variant="ghost"
                size="sm"
                icon={Trash2}
                onClick={() => removeKriteria(index)}
                disabled={kriteria.length <= 2}
                className="text-red-500 hover:text-red-700"
              />
            </div>
            <div className="space-y-2">
              <Input
                value={k.nama}
                onChange={(e) => updateKriteria(index, "nama", e.target.value)}
                placeholder={`Kriteria ${index + 1}`}
              />
              <div className="flex gap-2">
                <div className="flex-1">
                  <Select
                    value={k.tipe}
                    onChange={(e) =>
                      updateKriteria(index, "tipe", e.target.value)
                    }
                    options={[
                      { value: "benefit", label: "Benefit" },
                      { value: "cost", label: "Cost" },
                    ]}
                  />
                </div>
                <div className="flex-1">
                  <Input
                    type="number"
                    step="0.01"
                    min="0"
                    max="1"
                    value={k.bobot}
                    onChange={(e) =>
                      updateKriteria(
                        index,
                        "bobot",
                        parseFloat(e.target.value) || 0,
                      )
                    }
                    placeholder="Bobot"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full text-left text-sm min-w-[500px]">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="px-2 py-2 font-medium text-gray-600 dark:text-gray-400">
                No
              </th>
              <th className="px-2 py-2 font-medium text-gray-600 dark:text-gray-400">
                Nama Kriteria
              </th>
              <th className="px-2 py-2 font-medium text-gray-600 dark:text-gray-400">
                Tipe
              </th>
              <th className="px-2 py-2 font-medium text-gray-600 dark:text-gray-400">
                Bobot
              </th>
              <th className="px-2 py-2" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {kriteria.map((k, index) => (
              <tr key={index}>
                <td className="px-2 py-2 text-gray-500">{index + 1}</td>
                <td className="px-2 py-2">
                  <Input
                    value={k.nama}
                    onChange={(e) =>
                      updateKriteria(index, "nama", e.target.value)
                    }
                    placeholder={`Kriteria ${index + 1}`}
                  />
                </td>
                <td className="px-2 py-2">
                  <Select
                    value={k.tipe}
                    onChange={(e) =>
                      updateKriteria(index, "tipe", e.target.value)
                    }
                    options={[
                      { value: "benefit", label: "Benefit" },
                      { value: "cost", label: "Cost" },
                    ]}
                  />
                </td>
                <td className="px-2 py-2">
                  <Input
                    type="number"
                    step="0.01"
                    min="0"
                    max="1"
                    value={k.bobot}
                    onChange={(e) =>
                      updateKriteria(
                        index,
                        "bobot",
                        parseFloat(e.target.value) || 0,
                      )
                    }
                  />
                </td>
                <td className="px-2 py-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    icon={Trash2}
                    onClick={() => removeKriteria(index)}
                    disabled={kriteria.length <= 2}
                    className="text-red-500 hover:text-red-700"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap items-center gap-2 text-sm">
        <span className="text-gray-600 dark:text-gray-400">Total Bobot:</span>
        <span
          className={
            bobotValid
              ? "font-semibold text-green-600"
              : "font-semibold text-red-600"
          }
        >
          {totalBobot.toFixed(2)}
        </span>
        <span className="text-gray-400">/ 1.00</span>
        {!bobotValid && <span className="text-red-500">(harus 1.00)</span>}
      </div>

      {kriteria.length < 2 && (
        <p className="text-sm text-red-500">Minimal 2 kriteria</p>
      )}
    </div>
  );
}
