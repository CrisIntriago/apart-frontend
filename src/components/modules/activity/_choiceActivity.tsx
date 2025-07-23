"use client";

import { Activity } from "@/types/learning_activity";
import { useState } from "react";

interface ChoiceActivityProps {
  activityData: Extract<Activity, { type: "choice" }>;
  onSubmit: (body: { selected_ids: number[] }) => void;
}

export default function ChoiceActivity({ activityData, onSubmit }: ChoiceActivityProps) {
  const [selected, setSelected] = useState<number[]>([]);

  const handleSelect = (id: number) => {
    let newSelected: number[];
    if (activityData.payload.is_multiple) {
      newSelected = selected.includes(id)
        ? selected.filter((val) => val !== id)
        : [...selected, id];
      setSelected(newSelected);
    } else {
      newSelected = [id];
      setSelected(newSelected);
      onSubmit({ selected_ids: newSelected }); 
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
    <div className="bg-gray-900 rounded-xl shadow-lg w-full max-w-5xl flex flex-col md:flex-row border border-gray-700">
    {/* Columna izquierda - Imagen (30% del ancho) */}
    <div className="w-full md:w-1/3 h-72 md:h-auto bg-gray-800 relative">
      <img 
        src="https://picsum.photos/800/600?random=20"
      alt="Financial education"
      className="absolute inset-0 w-full h-full object-cover rounded-tl-xl rounded-bl-xl opacity-90"
  onError={(e) => {
    const target = e.target as HTMLImageElement;
    target.src = '';
  }}
/>

    </div>

    {/* Columna derecha - Contenido (70% del ancho) */}
    <div className="w-full md:w-2/3 p-8 flex flex-col">
      {/* Barra superior de navegación */}
      <div className="flex justify-between items-center mb-8">
        <button className="flex items-center text-gray-300 hover:text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back
        </button>
      </div>

      {/* Contenido principal */}
      <div className="flex-grow">
        <h3 className="text-2xl font-bold mb-4 text-white">{activityData.title}</h3>
        <p className="text-lg mb-10 text-gray-300">{activityData.instructions}</p>
        
        {/* Opciones de respuesta */}
        <div className="space-y-4">
          {activityData.payload.choices.map((choice) => (
            <button
              key={choice.id}
              className={`w-full py-4 px-6 rounded-lg border-2 text-lg font-medium transition-all
                ${selected.includes(choice.id)
                  ? "bg-blue-600 text-white border-blue-600 hover:bg-blue-700"
                  : "bg-gray-800 text-gray-200 border-gray-600 hover:bg-gray-700 hover:border-gray-500"}
              `}
              onClick={() => handleSelect(choice.id)}
              type="button"
              disabled={!activityData.payload.is_multiple && selected.length > 0}
            >
              {choice.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  </div>
</div>
  );
}