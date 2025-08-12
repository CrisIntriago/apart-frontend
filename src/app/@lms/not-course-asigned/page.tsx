export default function NotCourseAssignedPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow text-center max-w-md">
        <h2 className="text-xl font-bold mb-4">Sin curso asignado</h2>
        <p className="mb-4">
          Tu cuenta aún no tiene un curso asignado.<br />
          Por favor comunícate con tu profesor para que te asigne uno.
        </p>
      </div>
    </div>
  );
}