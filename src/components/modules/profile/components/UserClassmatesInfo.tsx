"use client";

import Image from "next/image";
import personImage from "@images/default-profile.png";
import { useCourseStudents } from "@/data/api/course/courseService";
import { StudentProfile } from "@/types/user";
import LoaderComponent from "@/components/ui/loaderComponent";

const UserClassmatesInfo =  ({ user }: { user: StudentProfile | null }) => {
  const courseId = user?.course?.id;

  const { data: classmates = [], isLoading } = useCourseStudents(courseId ?? 0);

  if (isLoading) {
    return (
      <LoaderComponent />

    );
  }

  return (
    <div className="bg-[#E3E3E3] px-6 py-12">
      <h2 className="text-xl font-bold text-gray-900 mb-8 text-center">
        Miembros del Curso
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
        {classmates.map((classmate) => (
          <div
            key={classmate.id}
            className="bg-[#3C3939] text-white rounded-2xl shadow-lg p-4 flex flex-col items-center w-56 transition hover:scale-105"
          >
            <Image
              src={classmate.photo || personImage}
              alt={`Foto de ${classmate.first_name} ${classmate.last_name}`}
              width={80}
              height={80}
              className="rounded-full object-cover border-2 border-white mb-4"
            />

            <p className="text-base font-bold mb-1 text-center">
              {classmate.first_name} {classmate.last_name}
            </p>

            <p className="text-xs text-gray-300 mb-3 text-center">
              <span className="font-semibold text-white">País:</span>{" "}
              {classmate.country}
            </p>

          
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserClassmatesInfo;
