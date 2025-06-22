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
    <div>
      <h3>{activityData.title}</h3>
      <p>{activityData.instructions}</p>
      <ul className="space-y-2 mt-4">
        {order.map((word, index) => (
          <li
            key={index}
            className="border p-2 rounded bg-white shadow cursor-move"
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(index)}
          >
            {word}
          </li>
        ))}
      </ul>
      <button onClick={handleSubmit} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
        Enviar
      </button>
    </div>
  );
}