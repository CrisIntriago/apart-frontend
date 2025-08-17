"use client";

import { CheckCircle } from "lucide-react";
import OfferComponents from "@/components/modules/OfferComponents";
import { useUser } from "@/context/UserContext";

const UserMembershipInfo = () => {
  const subscriptionDate = "20 de julio de 2025";

  const { user, isLoading } = useUser();
  const email = user?.email;
  const hasAccess = user?.has_access;
  const stripeUrl =
    "https://billing.stripe.com/p/login/test_3cIcMYf8I7G23Mzb8VeEo00" +
    (email ? `?prefilled_email=${email}` : "");


  return (
    <div className="bg-[#E3E3E3] flex flex-col items-center px-6 py-8 w-full">
      {hasAccess ? (
        <>
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
            {email && (
              <a
                href={stripeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#635bff] hover:bg-[#5546c8] transition rounded-full px-6 py-2 text-sm font-bold text-white flex items-center gap-3 shadow-md"
              >
                <span>Maneja tu pago con Stripe</span>
                {/*TO-DO: Logo de Stripe*/}
              </a>
            )}
          </div>
          <p className="text-sm text-gray-500 mt-10 max-w-md text-center">
            Gestiona tus pagos o actualiza tu información de suscripción en cualquier momento mediante el botón de PayPal.
          </p>
        </>
      ) : (
        <OfferComponents email={email} descripcion="" titulo="Adquiere tu acceso a Apart!"/>
      )}
    </div>
  );
};

export default UserMembershipInfo;
