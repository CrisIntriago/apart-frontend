"use client";

import Image from "next/image";
import { CheckCircle } from "lucide-react";
import paypalLogo from "@images/logo-paypal.webp";

const UserMembershipInfo = () => {
  const subscriptionDate = "20 de julio de 2025";

  return (
    <div className="bg-[#E3E3E3] flex flex-col items-center px-6 py-8">

      <h1 className="text-2xl font-bold text-gray-900 mb-8">
        Detalles de tu Suscripción
      </h1>

      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 flex flex-col items-center text-center space-y-6">

        <h2 className="text-lg font-extrabold text-gray-900">Membresía Activa</h2>

        <div className="w-full text-left text-sm text-gray-700 space-y-3">
          <p>
            <span className="font-semibold text-gray-900">Suscripción:</span>{" "}
            {subscriptionDate}
          </p>

          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-900">Estado:</span>
            <CheckCircle size={18} className="text-green-600" />
            <span>Pagado</span>
          </div>
        </div>

        <button className="bg-[#FFDD00] hover:bg-[#e6c800] transition rounded-full px-6 py-2 text-sm font-bold text-black flex items-center gap-3 shadow-md">
          <span>Maneja tu pago con PayPal</span>
          <Image
            src={paypalLogo}
            alt="PayPal Logo"
            width={60}
            height={60}
            className="object-contain"
          />
        </button>
      </div>

      <p className="text-sm text-gray-500 mt-10 max-w-md text-center">
        Gestiona tus pagos o actualiza tu información de suscripción en cualquier momento mediante el botón de PayPal.
      </p>

    </div>
  );
};

export default UserMembershipInfo;
