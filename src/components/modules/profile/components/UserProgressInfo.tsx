"use client";

import Image from "next/image";
import { TrendingUp } from "lucide-react";
import { useRouter } from "next/navigation";
import coursePlaceholder from "@images/london.jpg";
import flagPlaceholder from "@images/usa-flag.png";
import { StudentProfile } from "@/types/user";
import { PATHS } from "@/constants/paths";
import { useCourseProgress } from "@/data/api/course/courseService";
import { getImageUrl } from "@/utils/imageUtils";

const UserProgressInfo = ({ user }: { user: StudentProfile | null }) => {
  const router = useRouter();

  const languageInfo = user?.languages[0];
  const courseInfo = user?.course;

  const { data: courseProgress } = useCourseProgress(courseInfo?.id ?? 0);

  const progress = courseProgress?.overall?.percent ?? 0;
  const radius = 15.9155;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="bg-[#E3E3E3] py-8 px-4 sm:px-8 md:px-16 xl:px-52">
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-28">
        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="text-base font-semibold text-gray-900 mb-2">
            Curso Actual
          </h2>
          <div className="w-full border-b-2 border-black mb-4"></div>

          <div className="bg-[#3B3939] text-white rounded-lg p-4 w-full max-w-xs mx-auto text-center">
            <div className="flex items-center mb-2 justify-center">
              <Image
                src={getImageUrl(languageInfo?.language.icon) || flagPlaceholder}
                alt={`${languageInfo?.language.name} Flag`}
                width={20}
                height={15}
                className="mr-2 rounded-sm"
              />
              <p className="text-xs font-semibold">Nivel: {courseInfo?.name}</p>
            </div>

            <p className="text-xs mb-4">{courseInfo?.description}</p>

            <Image
              src={getImageUrl(courseInfo?.image) || coursePlaceholder}
              alt={`Imagen del curso ${courseInfo?.name}`}
              width={220}
              height={150}
              className="rounded-lg object-cover mx-auto my-4"
            />

            <button
              onClick={() => router.push(PATHS.USER_COURSES.ROOT)}
              className="border border-white rounded-full px-12 sm:px-20 py-1 text-xs hover:bg-white hover:text-gray-900 transition mx-auto block"
            >
              Entrar
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center">
          <h2 className="text-base font-semibold text-gray-900 w-full text-left mb-2">
            Tu progreso del curso actual
          </h2>
          <div className="w-full border-b-2 border-black mb-4"></div>

          <div className="relative w-40 h-40 sm:w-48 sm:h-48 mb-4">
            <svg
              className="absolute top-0 left-0 w-full h-full"
              viewBox="0 0 36 36"
            >
              <circle
                cx="18"
                cy="18"
                r="15.9155"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="2"
              />
              <circle
                cx="18"
                cy="18"
                r="15.9155"
                fill="none"
                stroke="#1f2937"
                strokeWidth="2"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                transform="rotate(-90 18 18)"
              />
            </svg>

            <div className="absolute inset-0 flex items-center justify-center text-3xl sm:text-4xl font-extrabold text-gray-900">
              {progress}%
            </div>
          </div>

          <div className="flex items-center gap-2 mb-8">
            <Image
              src={languageInfo?.language.icon || flagPlaceholder}
              alt={`${languageInfo?.language.name} Flag`}
              width={20}
              height={15}
              className="rounded-sm"
            />
            <p className="text-sm font-medium text-gray-900">
              {languageInfo?.level}
            </p>
          </div>

          <div className="w-full border-b-2 border-black mb-3"></div>

          <p className="text-xs font-semibold text-gray-900 underline flex items-center gap-1">
            <TrendingUp size={14} />
            Vocabulario aprendido
          </p>
        </div>
      </section>
    </div>
  );
};

export default UserProgressInfo;
