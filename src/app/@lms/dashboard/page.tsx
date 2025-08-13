"use client";

import { AlignJustify } from "lucide-react";
import Link from "next/link";
import { useModuleService } from "@/data/api/module/moduleService";
import { useExamService, ExamResponse } from "@/data/api/exam/examService";
import { useUser } from "@/context/UserContext";
import Image from "next/image";

const DashboardPage = () => {
  const { user: userData, isLoading: userLoading } = useUser();

  if (userLoading) {
    return <p className="p-6">Cargando usuario...</p>;
  }

  const courseId = userData?.course.id ?? null;
  const courseName = userData?.course.name ?? "Curso sin nombre";

  const { getModulesByCourseId } = useModuleService();
  const { getExamsByCourseId } = useExamService();

  const {
    data: modulesData,
    isLoading: modulesLoading,
    error: modulesError,
  } = courseId
    ? getModulesByCourseId(courseId)
    : { data: null, isLoading: false, error: null };

  const {
    data: examsData,
    isLoading: examsLoading,
    error: examsError,
  } = courseId
    ? getExamsByCourseId(courseId)
    : { data: null, isLoading: false, error: null };

  if (modulesLoading || examsLoading) {
    return <p className="p-6">Cargando módulos y exámenes...</p>;
  }

  if (modulesError) {
    return <p className="p-6 text-red-500">Error al cargar los módulos.</p>;
  }
  if (examsError) {
    return <p className="p-6 text-red-500">Error al cargar los exámenes.</p>;
  }

  const modules = modulesData?.data ?? [];
  const exams = examsData?.data ?? [];

  const parcialExam = exams.find((e) => e.type.toLowerCase() === "midterm");
  const finalExam = exams.find((e) => e.type.toLowerCase() === "final");

  const middleIndex = Math.floor(modules.length / 2);

  const combinedItems: ((typeof modules)[0] | ExamResponse)[] = [
    ...modules.slice(0, middleIndex),
    ...(parcialExam ? [parcialExam] : []),
    ...modules.slice(middleIndex),
    ...(finalExam ? [finalExam] : []),
  ];

  const progress = 40;

  return (
    <main className="min-h-screen bg-[#E3E3E3] py-10 px-4 flex justify-center">
      <section className="w-full max-w-xl space-y-8">
        <div className="bg-white rounded-xl shadow flex items-center gap-2 px-8 py-3">
          <AlignJustify size={18} />
          <span className="text-sm font-semibold text-gray-800">
            {courseName}
          </span>
        </div>

        <div className="bg-white rounded-xl shadow px-8 py-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Progreso</h2>

          <div className="w-full border-black border-2 rounded-full h-4 mb-6 overflow-hidden">
            <div
              className="h-full bg-[#996C52]"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <div className="relative ml-10">
            <div className="flex flex-col space-y-8 relative">
              {combinedItems.map((item, index) => {
                const isExam = "type" in item;
                const isLast = index === combinedItems.length - 1;

                const lineLeftPosition = 46;

                return (
                  <Link
                    key={isExam ? `exam-${item.id}` : item.id}
                    href={isExam ? `/exam/${item.id}` : `/module/${item.id}`}
                    className={`flex items-center gap-4 relative bg-white rounded-xl transition duration-300 ease-in-out hover:shadow-lg hover:bg-gray-100 hover:scale-[1.02] ${
                      isExam ? "border-2 border-black" : ""
                    }`}
                    style={{
                      paddingLeft: "90px",
                      paddingTop: "12px",
                      paddingBottom: "12px",
                      marginLeft: "12px",
                    }}
                  >
                    {!isLast && (
                      <div
                        style={{
                          position: "absolute",
                          left: lineLeftPosition,
                          top: "100%",
                          width: 2,
                          height: 40,
                          backgroundColor: "black",
                          zIndex: 0,
                        }}
                      />
                    )}

                    {!isExam && (
                      <div
                        className="relative z-10 w-[60px] h-[60px]"
                        style={{ position: "absolute", left: "16px" }}
                      >
                        <Image
                          src={item.image || "/default-module-image.png"}
                          alt={item.name}
                          fill
                          className="rounded-full object-cover border-2 border-black"
                        />
                      </div>
                    )}

                    <div className="flex flex-col z-10">
                      <h3 className="text-sm font-bold text-gray-900">
                        {isExam
                          ? item.type.toLowerCase() === "midterm"
                            ? "Examen Parcial"
                            : "Examen Final"
                          : item.name}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {isExam ? item.title : item.description}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default DashboardPage;
