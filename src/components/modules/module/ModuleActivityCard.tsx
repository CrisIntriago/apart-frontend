interface Props {
  index: number;
  isCorrect: boolean;
}

export default function ModuleActivityCard({ index, isCorrect }: Props) {
  return (
    <li className="p-4 border rounded flex justify-between items-center">
      <span className="font-medium">Actividad {index + 1}</span>
      <span className={isCorrect ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
        {isCorrect ? "Correcta" : "Incorrecta"}
      </span>
    </li>
  );
}
