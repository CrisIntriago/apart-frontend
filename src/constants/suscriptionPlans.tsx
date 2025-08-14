export const plans = {
    mensual: {
        link:
            process.env.NEXT_PUBLIC_ENVIRONMENT === "development"
                ? "https://buy.stripe.com/test_3cIcMYf8I7G23Mzb8VeEo00"
                : "",
        priceId:
            process.env.NEXT_PUBLIC_ENVIRONMENT === "development"
                ? "price_1Rvgga2ZhqvpKINePwWLyFpY"
                : "",
        price: 30,
        duration: "/month"
    },
    anual: {
        link:
            process.env.NEXT_PUBLIC_ENVIRONMENT === "development"
                ? "https://buy.stripe.com/test_dRm9AMd0A2lI2Iv5OBeEo01"
                : "",
        priceId:
            process.env.NEXT_PUBLIC_ENVIRONMENT === "development"
                ? "price_1RvhCf2ZhqvpKINeQQ9Z2AQX"
                : "",
        price: 253,
        duration: "/year"
    },
};