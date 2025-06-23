"use client";

import { Activity } from "@/types/learning_activity";
import { useState } from "react";

interface OrderActivityProps {
  activityData: Extract<Activity, { type: "order" }>;
  onSubmit: (body: { words: string[] }) => void;
}

export default function OrderActivity({ activityData, onSubmit }: OrderActivityProps) {
  const [order, setOrder] = useState(activityData.payload.words);
  const [draggedIdx, setDraggedIdx] = useState<number | null>(null);

  const handleDragStart = (idx: number) => setDraggedIdx(idx);

  const handleDragOver = (e: React.DragEvent<HTMLLIElement>) => {
    e.preventDefault();
  };

  const handleDrop = (idx: number) => {
    if (draggedIdx === null || draggedIdx === idx) return;
    const updated = [...order];
    const [moved] = updated.splice(draggedIdx, 1);
    updated.splice(idx, 0, moved);
    setOrder(updated);
    setDraggedIdx(null);
  };

  const handleSubmit = () => {
    onSubmit({ words: order });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#E3E3E3]">
      <div className="bg-white rounded-xl shadow p-8 w-full max-w-md flex flex-col items-center">
        <h3 className="text-2xl font-bold text-center mb-2">{activityData.title}</h3>
        <p className="text-gray-700 text-center mb-6">{activityData.instructions}</p>
        <ul className="space-y-2 mt-4 w-full">
          {order.map((word, index) => (
            <li
              key={index}
              className="border p-3 rounded bg-gray-100 shadow cursor-move text-center text-lg font-medium"
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(index)}
            >
              {word}
            </li>
          ))}
        </ul>
        <button
          onClick={handleSubmit}
          className="mt-6 bg-white border-black border-2 text-black px-6 py-2 rounded-full font-semibold w-full"
        >
          Enviar
        </button>
      </div>
    </div>
  );
}