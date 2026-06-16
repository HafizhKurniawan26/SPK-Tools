import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Calculator,
  Database,
  FileDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { StepIndicator } from "./StepIndicator";
import { AlternatifInput } from "./AlternatifInput";
import { KriteriaInput } from "./KriteriaInput";
import { MatriksInput } from "./MatriksInput";
import { SaveToSupabaseModal } from "./SaveToSupabaseModal";
import { useSPKStore } from "@/store/useSPKStore";
import { useCalculation } from "@/hooks/useCalculation";
import { CONTOH_DATA } from "@/utils/constants";
import {
  validateAlternatif,
  validateKriteria,
  validateMatriks,
} from "@/utils/validators";

const STEPS = ["Input Alternatif", "Input Kriteria", "Matriks Nilai"];

export function InputForm() {
  const [step, setStep] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const {
    alternatif,
    kriteria,
    matriks,
    setAlternatif,
    setKriteria,
    setMatriks,
  } = useSPKStore();

  const { isCalculating, error: calcError, hitungSemua } = useCalculation();

  const handleGunakanContoh = () => {
    setAlternatif(
      CONTOH_DATA.alternatif.map((nama, i) => ({ nama, urutan: i + 1 })),
    );
    setKriteria(CONTOH_DATA.kriteria);
    setMatriks(CONTOH_DATA.matriks);
    setError(null);
  };

  const handleNext = () => {
    setError(null);
    if (step === 1) {
      const err = validateAlternatif(alternatif);
      if (err) {
        setError(err);
        return;
      }
    }
    if (step === 2) {
      const err = validateKriteria(kriteria);
      if (err) {
        setError(err);
        return;
      }
    }
    setStep((prev) => Math.min(prev + 1, 3));
  };

  const handlePrev = () => {
    setError(null);
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleHitungSemua = async () => {
    setError(null);

    const errAlt = validateAlternatif(alternatif);
    if (errAlt) {
      setStep(1);
      setError(errAlt);
      return;
    }

    const errKrit = validateKriteria(kriteria);
    if (errKrit) {
      setStep(2);
      setError(errKrit);
      return;
    }

    const errMat = validateMatriks(matriks, alternatif.length, kriteria.length);
    if (errMat) {
      setStep(3);
      setError(errMat);
      return;
    }

    await hitungSemua();
    if (!calcError) {
      navigate("/hasil");
    }
  };

  return (
    <Card>
      <CardContent className="p-4 sm:p-6">
        <div className="w-full flex items-center justify-center">
          <StepIndicator steps={STEPS} currentStep={step} />
        </div>

        {error && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-900/50 dark:text-red-300">
            {error}
          </div>
        )}

        <div className="mb-6">
          {step === 1 && <AlternatifInput />}
          {step === 2 && <KriteriaInput />}
          {step === 3 && <MatriksInput />}
        </div>

        {/* Mobile: Button stack */}
        <div className="flex flex-col-reverse gap-3 border-t border-gray-200 pt-4 dark:border-gray-700 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-2 sm:flex-row sm:gap-2 items-center justify-center">
            <Button
              variant="outline"
              size="sm"
              icon={FileDown}
              onClick={handleGunakanContoh}
              className="w-full sm:w-auto"
            >
              <span className="hidden sm:inline">Gunakan Contoh Data</span>
              <span className="sm:hidden">Contoh Data</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              icon={Database}
              onClick={() => setShowModal(true)}
              className="w-full sm:w-auto"
            >
              Simpan
            </Button>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:gap-2 items-center justify-center">
            {step > 1 && (
              <Button
                variant="ghost"
                onClick={handlePrev}
                className="w-full sm:w-auto"
              >
                <ChevronLeft className="h-4 w-4 sm:hidden" />
                <span>Kembali</span>
              </Button>
            )}
            {step < 3 ? (
              <Button onClick={handleNext} className="w-full sm:w-auto">
                <span>Selanjutnya</span>
                <ChevronRight className="h-4 w-4 sm:hidden" />
              </Button>
            ) : (
              <Button
                onClick={handleHitungSemua}
                loading={isCalculating}
                icon={Calculator}
                size="sm"
                className="w-full sm:w-auto"
              >
                Hitung
              </Button>
            )}
          </div>
        </div>
      </CardContent>

      <SaveToSupabaseModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSaved={(id) => {
          useSPKStore.getState().setCurrentDataset(id, "");
          alert("Data berhasil disimpan!");
        }}
      />
    </Card>
  );
}
