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
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
  <div className="bg-gray-900 rounded-xl shadow-lg w-full max-w-4xl flex flex-col md:flex-row border border-gray-700">
    {/* Columna izquierda - Imagen (30% del ancho) */}
    <div className="w-full md:w-2/5 h-64 md:h-auto bg-gray-800 relative">
      <img 
        src="https://picsum.photos/800/600?random=40"
        alt="Educational activity"
        className="absolute inset-0 w-full h-full object-cover rounded-tl-xl rounded-bl-xl opacity-90"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = "";
        }}
      />
    </div>

    {/* Columna derecha - Contenido (70% del ancho) */}
    <div className="w-full md:w-3/5 p-6 flex flex-col">
      {/* Barra superior con botón Back */}
      <div className="flex justify-between items-center mb-6">
        <button className="flex items-center text-gray-300 hover:text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back
        </button>
      </div>

      {/* Contenido principal */}
      <div className="flex-grow">
        <p className="text-lg text-gray-300 mb-8">{activityData.instructions}</p>
        
        {/* Lista de palabras para ordenar */}
        <ul className="space-y-3 w-full mb-6">
          {order.map((word, index) => (
            <li
              key={index}
              className="border-2 border-gray-700 p-3 rounded-lg bg-gray-800 cursor-move text-center text-gray-200 text-lg font-medium transition-colors hover:bg-gray-700 hover:border-gray-600"
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(index)}
            >
              {word}
            </li>
          ))}
        </ul>

        {/* Botón de enviar */}
        <button
          onClick={handleSubmit}
          className="mt-4 bg-transparent border-2 border-blue-500 text-blue-500 px-6 py-3 rounded-full font-semibold w-full hover:bg-blue-500 hover:text-white transition-colors"
        >
          Enviar
        </button>
      </div>
    </div>
  </div>
</div>
  );
}