import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { ResultTabs } from "@/components/results/ResultTabs";
import { MethodResult } from "@/components/results/MethodResult";
import { CalculationSteps } from "@/components/results/CalculationSteps";
import { ComparisonTable } from "@/components/results/ComparisonTable";
import { RankingChart } from "@/components/results/RankingChart";
import { useSPKStore } from "@/store/useSPKStore";
import type { MetodeHasil } from "@/types";

const METODE_TABS = [
  { id: "saw", label: "SAW" },
  { id: "moora", label: "MOORA" },
  { id: "profileMatching", label: "Profile Matching" },
  { id: "smart", label: "SMART" },
  { id: "topsis", label: "TOPSIS" },
];

export function HasilPage() {
  const [activeTab, setActiveTab] = useState("saw");
  const navigate = useNavigate();
  const { alternatif, hasil } = useSPKStore();

  const hasResult = Object.values(hasil).some((h) => h !== null);

  useEffect(() => {
    if (!hasResult) {
      navigate("/input");
    }
  }, [hasResult, navigate]);

  if (!hasResult) return null;

  const activeHasil = hasil[
    activeTab as keyof typeof hasil
  ] as MetodeHasil | null;
  const metodeLabel =
    METODE_TABS.find((t) => t.id === activeTab)?.label ?? activeTab;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Hasil Perhitungan
          </h1>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            Perbandingan hasil dari 5 metode SPK
          </p>
        </div>
      </div>

      <ResultTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        tabs={METODE_TABS}
      />

      {activeHasil && (
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
                Peringkat {metodeLabel}
              </h3>
              <MethodResult
                alternatif={alternatif.map((a) => a.nama)}
                hasil={activeHasil}
                metodeNama={metodeLabel}
              />
            </CardContent>
          </Card>

          <CalculationSteps detail={activeHasil.detail} />
        </div>
      )}

      <Card>
        <CardContent className="p-6">
          <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
            Perbandingan Peringkat Semua Metode
          </h3>
          <ComparisonTable
            alternatif={alternatif.map((a) => a.nama)}
            hasil={hasil}
          />
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {METODE_TABS.map((tab) => {
          const h = hasil[tab.id as keyof typeof hasil] as MetodeHasil | null;
          if (!h) return null;
          return (
            <RankingChart
              key={tab.id}
              alternatif={alternatif.map((a) => a.nama)}
              label={tab.label}
              nilai={h.nilai}
              peringkat={h.peringkat}
            />
          );
        })}
      </div>
    </div>
  );
}
