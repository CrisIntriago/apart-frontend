import { useAccountStore } from "@/data/store/accountStore";
import { Button } from "@mui/material";

interface PlanCardProps {
    title: string;
    description: string;
    price: number;
    link: string;
    badgeText?: string;
    isSpecialOffer?: boolean;
    email?: string;
}

export const PlanCard = ({
    title,
    description,
    price,
    link,
    badgeText,
    isSpecialOffer = false,
    email,
}: PlanCardProps) => {

    const payment_url = email ? `${link}?prefilled_email=${email}` : link;

    return (
        <div className={`bg-white rounded-2xl shadow-xl relative overflow-hidden ${isSpecialOffer ? "border-2 border-gray-200" : "border-2 border-purple-200"}`}>
            {badgeText && (
                <div className="absolute top-4 right-4">
                    <div className="bg-red-500 text-white">{badgeText}</div>
                </div>
            )}
            <div className="p-6">
                <div className="text-center mb-6">
                    <h3 className="text-lg font-semibold text-gray-600 mb-2">{title}</h3>
                    <div className="text-4xl font-bold text-gray-900">{price}</div>
                </div>
                <div className="space-y-3 mb-6">
                    <p className="text-gray-700">{description}</p>
                </div>

                <Button
                    onClick={() => {
                        window.open(payment_url, '_blank');
                    }}
                    className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-medium py-3 rounded-xl"
                >
                    Suscribirse
                </Button>

                <div className="mt-6">
                    <a href={link} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
                        Más información
                    </a>
                </div>
            </div>
        </div>
    );
};