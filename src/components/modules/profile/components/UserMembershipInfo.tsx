"use client";

import Image from "next/image";
import { CheckCircle } from "lucide-react";
import paypalLogo from "@images/logo-paypal.webp";

const UserMembershipInfo = () => {
  const subscriptionDate = "20 de julio de 2025";

  return (
    <div className="bg-[#E3E3E3] flex flex-col items-start px-20 pt-20 pb-48">
      <div className="bg-white rounded-xl shadow p-6 w-full max-w-md flex flex-col items-start text-center">
        <div className="text-md text-gray-900 mb-2">
          <span className="font-semibold">Suscripción:</span>{" "}
          <span>{subscriptionDate}</span>
        </div>

        <div className="text-md text-gray-900 flex items-center justify-center gap-2 mb-6">
          <span className="font-semibold">Estado:</span>
          <CheckCircle size={16} className="text-green-600" />
          <span>Pagado</span>
        </div>

        <button className="bg-[#FFDD00] text-black rounded-full py-2 px-4 text-sm font-semibold flex items-center justify-center gap-5 hover:opacity-90 transition">
          Maneja tu pago con PayPal
          <Image
            src={paypalLogo}
            alt="PayPal Logo"
            width={80}
            height={80}
          />
        </button>
      </div>
    </div>
  );
};

export default UserMembershipInfo;
