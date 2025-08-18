"use client";

import { AlignJustify } from "lucide-react";
import Link from "next/link";
import { useModuleService } from "@/data/api/module/moduleService";
import { useExamService, ExamResponse } from "@/data/api/exam/examService";
import { useUser } from "@/context/UserContext";
import Image from "next/image";
import { useCourseProgress } from "@/data/api/course/courseService";
import examImage from "@images/clip-path.png";
import LoaderComponent from "@/components/ui/loaderComponent";
import OfferComponents from "@/components/modules/OfferComponents";

const DashboardPage = () => {
  const { user: userData, isLoading: userLoading } = useUser();
  const { getModulesByCourseId } = useModuleService();
  const { getExamsByCourseId } = useExamService();

  const courseId = userData?.course?.id;
  const courseName = userData?.course?.name ?? "Curso sin nombre";
  const modulesQuery = getModulesByCourseId(courseId ?? -1);
  const examsQuery = getExamsByCourseId(courseId ?? -1);
  const progressQuery = useCourseProgress(courseId ?? -1);

  if (!userData?.has_access) {
    return (
      <div className="mt-10">
        <OfferComponents
          email={userData?.email}
          descripcion="Con los fáciles planes puedes aprender idiomas"
          titulo="Adquiere tu acceso a Apart!"
        />
      </div>
    );
  }

  if (!userData?.course) {
    return (
      <main className="min-h-screen bg-[#E3E3E3] py-10 px-4 flex justify-center items-center">
        <div className="bg-white rounded-xl shadow px-8 py-6 text-center">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            No tienes un curso asignado
          </h2>
          <p className="text-gray-600">
            Por favor, contacta a soporte o espera a que se te asigne un curso.
          </p>
        </div>
      </main>
    );
  }

  if (
    userLoading ||
    modulesQuery.isLoading ||
    examsQuery.isLoading ||
    progressQuery.isLoading
  ) {
    return <LoaderComponent />;
  }

  if (modulesQuery.error || progressQuery.error) {
    return <p className="p-6 text-red-500">Error al cargar datos del curso.</p>;
  }
  if (examsQuery.error) {
    return <p className="p-6 text-red-500">Error al cargar los exámenes.</p>;
  }

  const modules = Array.isArray(modulesQuery.data?.data)
    ? modulesQuery.data.data
    : [];
  const exams = Array.isArray(examsQuery.data?.data)
    ? examsQuery.data.data
    : [];
  const courseProgress = progressQuery.data?.overall?.percent ?? 0;
  const modulesProgress = Array.isArray(progressQuery.data?.modules)
    ? progressQuery.data.modules
    : [];

  const parcialExam = exams.find((e) => e.type.toLowerCase() === "midterm");
  const finalExam = exams.find((e) => e.type.toLowerCase() === "final");

  const middleIndex = Math.floor(modules.length / 2);

  const combinedItems: ((typeof modules)[0] | ExamResponse)[] = [
    ...modules.slice(0, middleIndex),
    ...(parcialExam ? [parcialExam] : []),
    ...modules.slice(middleIndex),
    ...(finalExam ? [finalExam] : []),
  ];

  const linePositionLeft = 46;

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
          <h2 className="text-lg font-bold text-gray-900 mb-4">Contenido</h2>

          <div className="w-full border-black border-2 rounded-full h-4 mb-6 overflow-hidden">
            <div
              className="h-full bg-[#996C52]"
              style={{ width: `${courseProgress}%` }}
            />
          </div>

          <div className="flex flex-col w-full items-start">
            {combinedItems.length === 0 ? (
              <p className="text-center text-gray-500 font-medium py-6">
                No hay contenido para este curso actualmente.
              </p>
            ) : (
              combinedItems.map((item, index) => {
                const isExam = "type" in item;
                const moduleData = !isExam
                  ? modulesProgress.find((m) => m.id === item.id)
                  : null;
                const moduleCompleted =
                  moduleData && moduleData.completed > 0; // ✅ ahora se pinta verde si completó al menos 1
                const examBlocked = isExam && !item.has_attempts_left;

                const CardContent = (
                  <>
                    <div
                      className="relative w-[60px] h-[60px] flex-shrink-0"
                      style={{
                        position: "absolute",
                        left: 16,
                        top: "50%",
                        transform: "translateY(-50%)",
                      }}
                    >
                      <Image
                        src={
                          isExam
                            ? examImage
                            : item.image || "/default-module-image.png"
                        }
                        alt={isExam ? "Examen" : item.name}
                        fill
                        className="rounded-full object-cover"
                      />
                    </div>

                    <div className="flex flex-col ml-4">
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

                    <span
                      className={`ml-auto px-2 py-1 text-center text-xs font-semibold rounded
                        ${isExam
                          ? examBlocked
                            ? "bg-green-200 text-green-800"
                            : "bg-gray-200 text-gray-600"
                          : moduleCompleted
                          ? "bg-green-200 text-green-800"
                          : "bg-gray-200 text-gray-600"}
                      `}
                    >
                      {isExam ? (
                        examBlocked ? (
                          <>
                            Completado
                            <br />
                            Puntaje: {Math.floor(Number(item.user_percentage))}
                            /100
                          </>
                        ) : (
                          <>
                            Puntaje actual:{" "}
                            {Math.floor(Number(item.user_percentage))}/100
                            <br />
                            {item.remaining_attempts}/
                            {item.attempts_allowed} intentos
                          </>
                        )
                      ) : moduleCompleted ? (
                        "Completado"
                      ) : (
                        "Pendiente"
                      )}
                    </span>
                  </>
                );

                return (
                  <div
                    key={isExam ? `exam-${item.id}` : item.id}
                    className="w-full flex flex-col items-start"
                  >
                    {index > 0 && (
                      <div className="relative w-full h-10 flex justify-start">
                        <div
                          style={{
                            width: 2,
                            height: "100%",
                            backgroundColor: "black",
                            marginLeft: linePositionLeft,
                          }}
                        />
                      </div>
                    )}

                    {!examBlocked ? (
                      <Link
                        href={isExam ? `/exam/${item.id}` : `/module/${item.id}`}
                        className={`relative w-full flex items-center gap-4 bg-white rounded-xl transition duration-300 ease-in-out
                          hover:shadow-lg hover:bg-gray-100 hover:scale-[1.02]`}
                        style={{
                          padding: "12px 16px 12px 90px",
                          boxSizing: "border-box",
                        }}
                      >
                        {CardContent}
                      </Link>
                    ) : (
                      <div
                        className="relative w-full flex items-center gap-4 bg-white rounded-xl opacity-50 cursor-not-allowed"
                        style={{
                          padding: "12px 16px 12px 90px",
                          boxSizing: "border-box",
                        }}
                      >
                        {CardContent}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default DashboardPage;
