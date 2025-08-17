import { PlanCard } from "@/components/suscriptions/planCard";
import { plans } from "@/constants/suscriptionPlans";
import React from "react";

interface OfferComponentsProps {
    email?: string;
    titulo?: string;
    descripcion?: string;
}

const OfferComponents: React.FC<OfferComponentsProps> = ({ email, titulo, descripcion }) => (
    <div className="w-full max-w-2xl mx-auto text-center">
        {titulo && (
            <h1 className="text-2xl md:text-5xl font-bold text-gray-900 mb-4">{titulo}</h1>
        )}
        {descripcion && (
            <p className="text-md text-gray-600 mb-10">{descripcion}</p>
        )}
        <div className="flex flex-col md:flex-row gap-8 justify-center">
            <PlanCard
                title="Plan Mensual"
                description="Perfecto para empezar y probar todas las funciones."
                price={plans.mensual.price}
                link={plans.mensual.link}
                email={email}
                type="monthly"
                bulletPoints={[
                    "Acceso completo a la plataforma",
                    "Soporte 24/7",
                    "Actualizaciones automáticas",
                    "Análisis básicos",
                    "Hasta 1,000 usuarios",
                ]}
            />
            <PlanCard
                title="Plan Anual"
                description="Ahorra 2 meses con el plan anual"
                price={plans.anual.price}
                link={plans.anual.link}
                email={email}
                isSpecialOffer={true}
                type="annual"
                bulletPoints={[
                    "Todo lo del plan mensual",
                    "Análisis avanzados",
                    "Usuarios ilimitados",
                    "Soporte prioritario",
                    "Integraciones premium",
                    "Reportes personalizados",
                ]}
            />
        </div>
        <div className="mt-10 flex flex-col items-center">
            <p className="text-gray-700 text-md mb-3">¿Necesitas algo diferente? Contáctanos para planes empresariales.</p>
            <a
                href="mailto:ventas@apart.com?subject=Planes%20Empresariales"
                className="inline-block bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-2 px-6 rounded-full shadow-md transition"
                target="_blank"
                rel="noopener noreferrer"
            >
                Hablar con ventas
            </a>
        </div>
    </div>
);

export default OfferComponents;
