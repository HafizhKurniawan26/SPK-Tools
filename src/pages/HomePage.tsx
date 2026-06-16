import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BarChart3, Database } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { METODE_LIST } from "@/utils/constants";
import * as Icons from "lucide-react";
import type { ComponentType } from "react";
import { supabase } from "@/lib/supabase";

export function HomePage() {
  const [datasetCount, setDatasetCount] = useState<number | null>(null);

  useEffect(() => {
    async function fetchCount() {
      try {
        const { count } = await supabase
          .from("datasets")
          .select("*", { count: "exact", head: true });
        setDatasetCount(count);
      } catch {
        setDatasetCount(null);
      }
    }
    fetchCount();
  }, []);

  return (
    <div className="space-y-12">
      <section className="py-12 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-100 dark:bg-primary-900">
          <BarChart3 className="h-8 w-8 text-primary-600 dark:text-primary-400" />
        </div>
        <h1 className="mt-6 text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          Sistem Penunjang Keputusan
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
          Platform perhitungan SPK dengan 5 metode: SAW, MOORA, Profile
          Matching, SMART, dan TOPSIS. Bandingkan hasil dari berbagai metode
          pengambilan keputusan.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link to="/input">
            <Button size="lg" icon={ArrowRight} className="min-w-[300px]">
              Mulai Hitung
            </Button>
          </Link>
          <Link to="/data">
            <Button
              variant="outline"
              size="lg"
              icon={Database}
              className="min-w-[300px]"
            >
              Lihat Data Tersimpan
            </Button>
          </Link>
        </div>
      </section>

      <section>
        <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100">
          Metode SPK
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {METODE_LIST.map((metode) => {
            const IconComponent = (
              Icons as unknown as Record<
                string,
                ComponentType<{ className?: string }>
              >
            )[metode.icon];
            return (
              <Link key={metode.id} to={metode.path}>
                <Card
                  variant="elevated"
                  className="group cursor-pointer transition-all hover:shadow-xl hover:-translate-y-1"
                >
                  <CardContent className="p-6 min-h-32">
                    <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
                      {metode.nama}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {metode.deskripsi}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
