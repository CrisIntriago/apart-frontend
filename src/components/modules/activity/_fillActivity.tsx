import { Activity } from "@/types/learning_activity";
import React, { useState } from "react";

interface FillActivityProps {
  activityData: Activity;
  onComplete(): void;
}

const FillActivity = ({ activityData, onComplete }: FillActivityProps) => {
  const [userInput, setUserInput] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = () => {
    console.log("Texto enviado:", userInput);
    onComplete();
  };

  return (
    <div>
      <h2>{activityData.title}</h2>
      <p>{activityData.instructions}</p>

      <input
        type="text"
        placeholder="Escribe aquí tu respuesta..."
        value={userInput}
        onChange={handleInputChange}
      />
      <button onClick={handleSubmit}>Enviar</button>
    </div>
  );
};

export default FillActivity;