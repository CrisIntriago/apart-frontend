"use client";

import { Activity } from "@/types/learning_activity";
import { useState } from "react";

interface OrderActivityProps {
  activityData: Extract<Activity, { type: "order" }>;
  onSubmit: (body: { words: string[] }) => void;
}

export default function OrderActivity({ activityData, onSubmit }: OrderActivityProps) {
  const [availableWords, setAvailableWords] = useState(activityData.payload.words);
  const [orderedWords, setOrderedWords] = useState<string[]>([]);

  const handleAdd = (word: string) => {
    setOrderedWords((prev) => [...prev, word]);
    setAvailableWords((prev) => prev.filter((w) => w !== word));
  };

  const handleRemove = (word: string) => {
    setAvailableWords((prev) => [...prev, word]);
    setOrderedWords((prev) => prev.filter((w) => w !== word));
  };

  const handleSubmit = () => {
    onSubmit({ words: orderedWords });
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-md">
      <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        {activityData.title}
      </h3>
      <p className="text-gray-700 mb-6 text-center">{activityData.instructions}</p>

      <div className="mb-6">
        <h4 className="text-lg font-semibold text-gray-700 mb-2">Palabras disponibles</h4>
        <div className="flex flex-wrap gap-2">
          {availableWords.map((word, index) => (
            <button
              key={index}
              onClick={() => handleAdd(word)}
              className="px-3 py-2 border border-gray-400 rounded-md text-gray-800 bg-white hover:bg-gray-100 transition"
            >
              {word}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h4 className="text-lg font-semibold text-gray-700 mb-2">Orden seleccionado</h4>
        <div className="flex flex-wrap gap-2">
          {orderedWords.map((word, index) => (
            <button
              key={index}
              onClick={() => handleRemove(word)}
              className="px-3 py-2 border border-black rounded-md text-black bg-gray-100 hover:bg-gray-200 transition"
            >
              {word}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={orderedWords.length === 0}
        className="w-1/3 mx-auto block bg-white text-black border border-black px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Enviar
      </button>
    </div>
  );
}
