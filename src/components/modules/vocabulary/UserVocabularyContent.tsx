"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { PATHS } from "@/constants/paths";
import { useStudentVocabulary } from "@/data/api/vocabulary/vocabularyService";
import LoaderComponent from "@/components/ui/loaderComponent";
import UserVocabularyTable from "./components/UserVocabularyTable";

const UserVocabularyContent = () => {
  const router = useRouter();
  const { user, isLoading } = useUser();

  useEffect(() => {
    router.replace(PATHS.USER_COURSES.VOCABULARY);
  }, [router]);

  const { data: vocabularyData, isLoading: isVocabLoading } =
    useStudentVocabulary();

  if (isLoading || !user || isVocabLoading) {
    return <LoaderComponent />;
  }

  return (
    <div className="px-4">
      <h1 className="text-3xl font-semibold text-center mt-6 mb-12">
        Your Vocabulary
      </h1>
      {(vocabularyData ?? []).length === 0 ? (
        <h2 className="text-center text-gray-700 mt-2">
          Parece que no tienes ninguna palabra de vocabulario asignada, ¡intenta
          haciendo una actividad de este tipo!
        </h2>
      ) : (
        <UserVocabularyTable data={vocabularyData ?? []} />
      )}
    </div>
  );
};

export default UserVocabularyContent;
