import { Input } from "@/components/ui/Input";
import { useSPKStore } from "@/store/useSPKStore";

export function MatriksInput() {
  const { alternatif, kriteria, matriks, updateMatriksCell } = useSPKStore();

  if (alternatif.length === 0 || kriteria.length === 0) {
    return (
      <div className="py-8 text-center text-gray-500 dark:text-gray-400">
        Tambahkan alternatif dan kriteria terlebih dahulu
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
        Matriks Nilai Alternatif
      </h3>

      <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800/50">
              <th className="sticky left-0 z-10 whitespace-nowrap bg-gray-50 px-4 py-3 font-medium text-gray-700 dark:bg-gray-800/50 dark:text-gray-300">
                Alternatif
              </th>
              {kriteria.map((k, j) => (
                <th
                  key={j}
                  className="whitespace-nowrap px-4 py-3 font-medium text-gray-700 dark:text-gray-300"
                >
                  {k.nama}
                  <span className="ml-1 text-xs text-gray-400">
                    ({k.tipe === "benefit" ? "+" : "-"})
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {alternatif.map((alt, i) => (
              <tr
                key={i}
                className="hover:bg-gray-50 dark:hover:bg-gray-800/30"
              >
                <td className="sticky left-0 z-10 whitespace-nowrap bg-white px-4 py-3 font-medium text-gray-900 dark:bg-gray-800 dark:text-gray-100">
                  {alt.nama}
                </td>
                {kriteria.map((_, j) => (
                  <td key={j} className="px-4 py-3">
                    <Input
                      type="number"
                      step="any"
                      value={matriks[i]?.[j] ?? ""}
                      onChange={(e) =>
                        updateMatriksCell(i, j, parseFloat(e.target.value) || 0)
                      }
                      className="w-24"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
