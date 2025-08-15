import React from "react";
import { VocabularyItem } from "@/data/api/vocabulary/vocabularyService";

type Props = {
  data: VocabularyItem[];
};

const getDifficultyColor = (d: VocabularyItem["difficulty"]) => {
  switch (d) {
    case "easy":
      return "bg-green-500";
    case "medium":
      return "bg-yellow-400";
    case "hard":
      return "bg-red-500";
    default:
      return "bg-gray-300";
  }
};

const UserVocabularyTable: React.FC<Props> = ({ data }) => {
  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-3xl overflow-hidden rounded-xl border border-gray-200">
        <table className="w-full table-auto text-center">
          <thead className="bg-gray-900">
            <tr>
              <th className="px-4 py-3 border border-gray-200 text-white">
                Word
              </th>
              <th className="px-4 py-3 border border-gray-200 text-white">
                Meaning
              </th>
              <th className="px-4 py-3 border border-gray-200 text-white">
                Vocabulary
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {data.map((item) => (
              <tr key={item.id} className="odd:bg-white even:bg-gray-50">
                <td className="px-4 py-3 border border-gray-200">
                  {item.word}
                </td>
                <td className="px-4 py-3 border border-gray-200">
                  {item.meaning}
                </td>
                <td className="px-4 py-3 border border-gray-200">
                  <span className="inline-flex items-center justify-center gap-2 capitalize">
                    <span
                      className={`inline-block h-2.5 w-2.5 rounded-full ${getDifficultyColor(
                        item.difficulty
                      )}`}
                      aria-hidden="true"
                    />
                    {item.difficulty}
                  </span>
                </td>
              </tr>
            ))}

            {data.length === 0 && (
              <tr>
                <td colSpan={3} className="px-4 py-6 text-gray-500">
                  No hay vocabulario disponible.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserVocabularyTable;
