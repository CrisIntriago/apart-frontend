"use client";

import { Activity } from "@/types/learning_activity";
import { useState, useMemo } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

interface MatchActivityProps {
  activityData: Extract<Activity, { type: "matching" }>;
  onSubmit: (body: { pairs: Record<string, string> }) => void;
}

export default function MatchActivity({ activityData, onSubmit }: MatchActivityProps) {
  const leftWords = activityData.payload.pairs.map((p) => p.left);

  const rightOptions = useMemo(() => {
    const rights = activityData.payload.pairs.map((p) => p.right);
    return rights.sort(() => Math.random() - 0.5);
  }, [activityData.payload.pairs]);

  const [answers, setAnswers] = useState<Record<string, string>>(
    Object.fromEntries(leftWords.map((l) => [l, ""]))
  );
  const [error, setError] = useState(false);

  const handleChange = (left: string, value: string | null) => {
    setAnswers((prev) => ({ ...prev, [left]: value ?? "" }));
    setError(false);
  };

  const handleSubmit = () => {
    const incomplete = Object.values(answers).some((val) => val.trim() === "");
    if (incomplete) {
      setError(true);
      return;
    }

    setError(false);
    onSubmit({ pairs: answers });
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-md">
      <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">{activityData.title}</h3>
      <p className="text-gray-700 mb-8 text-center">{activityData.instructions}</p>

      <div className="flex flex-col gap-4 mb-6">
        {leftWords.map((left, index) => (
          <div key={index} className="flex flex-col md:flex-row items-start md:items-center gap-3">
            <span className="w-full md:w-40 text-gray-800 font-medium">{left}</span>
            <Autocomplete
              options={rightOptions}
              value={answers[left] || ""}
              onChange={(_, value) => handleChange(left, value)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Selecciona una opción"
                  variant="outlined"
                  size="small"
                />
              )}
              className="w-full md:flex-1"
            />
          </div>
        ))}
      </div>

      {error && (
        <p className="text-red-600 text-center font-medium mb-4">
          Por favor selecciona una opción para cada palabra antes de enviar.
        </p>
      )}

      <button
        onClick={handleSubmit}
        className="w-1/3 mx-auto block bg-white text-black border border-black px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition"
      >
        Enviar
      </button>
    </div>
  );
}
