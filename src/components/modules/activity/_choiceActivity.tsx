"use client";

import { Activity } from "@/types/learning_activity";
import { useState } from "react";

interface ChoiceActivityProps {
  activityData: Extract<Activity, { type: "choice" }>;
  onSubmit: (body: { selected_ids: number[] }) => void;
}

export default function ChoiceActivity({ activityData, onSubmit }: ChoiceActivityProps) {
  const [selected, setSelected] = useState<number[]>([]);

  const toggleChoice = (id: number) => {
    if (activityData.payload.is_multiple) {
      setSelected((prev) =>
        prev.includes(id) ? prev.filter((val) => val !== id) : [...prev, id]
      );
    } else {
      setSelected([id]);
    }
  };

  const handleSubmit = () => {
    if (selected.length === 0) {
      alert("Selecciona al menos una opción.");
      return;
    }
    onSubmit({ selected_ids: selected });
  };

  return (
    <div>
      <h3>{activityData.title}</h3>
      <p>{activityData.instructions}</p>
      <ul className="space-y-2 my-4">
        {activityData.payload.choices.map((choice) => (
          <li key={choice.id}>
            <label className="flex items-center gap-2">
              <input
                type={activityData.payload.is_multiple ? "checkbox" : "radio"}
                checked={selected.includes(choice.id)}
                onChange={() => toggleChoice(choice.id)}
              />
              {choice.text}
            </label>
          </li>
        ))}
      </ul>
      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded"
        disabled={selected.length === 0}
      >
        Enviar
      </button>
    </div>
  );
}