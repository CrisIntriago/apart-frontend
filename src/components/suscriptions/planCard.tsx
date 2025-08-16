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
    type?: "monthly" | "annual";
    bulletPoints : string[]
}

export const PlanCard = ({
    title,
    description,
    price,
    link,
    isSpecialOffer = false,
    email,
    type = "monthly",
    bulletPoints,
}: PlanCardProps) => {

    const payment_url = email ? `${link}?prefilled_email=${email}` : link;

    return (
    <div className={`bg-white rounded-2xl shadow-xl relative ${isSpecialOffer ?  "border-4 border-purple-400":"border-2 border-gray-200" } w-[340px] overflow-visible`}> 
            {isSpecialOffer && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <span className="bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs font-bold px-5 py-1 rounded-full shadow-lg border-2 border-white">Más Popular</span>
                </div>
            )}
            <div className="p-6 flex flex-col h-full min-h-[500px]">
                <div className="text-center mb-6">
                    <h3 className="text-3xl font-bold mb-5">{title}</h3>
                    <div className="text-5xl font-semibold text-gray-900">${price}
                        <span className="text-sm text-gray-700">
                            {type === "monthly" ? "/mes" : "/año"}
                        </span>
                    </div>
                    {type === "annual" && (
                        <div className="mt-2">
                            <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                                Ahorra $58
                            </span>
                        </div>
                    )}
                </div>

                <div className="flex flex-col mb-6 flex-grow">
                    <div className="min-h-[48px] flex items-start">
                        <p className="text-gray-700">{description}</p>
                    </div>
                    {bulletPoints && bulletPoints.length > 0 && (
                        <ul className="mt-4 space-y-2 text-left">
                            {bulletPoints.map((point, idx) => (
                                <li key={idx} className="flex items-center gap-2 text-gray-700">
                                    <span className="inline-block w-2 h-2 bg-purple-500 rounded-full"></span>
                                    <span>{point}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className="mt-auto">
                    <Button
                        onClick={() => {
                            window.open(payment_url, '_blank');
                        }}
                        className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 font-normal py-3 rounded-xl normal-case"
                        sx={{ color: 'white', textTransform: 'none', fontWeight: 400 }}
                    >
                        Comenzar ahora
                    </Button>
                </div>
            </div>
        </div>
    );
};