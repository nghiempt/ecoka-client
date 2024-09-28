export const truncateText = (text: string, maxLength: number) => {
    if (text?.length > maxLength) {
        return text?.slice(0, maxLength) + "...";
    }
    return text;
};

export const formatPrice = (price: number) => {
    return new Intl.NumberFormat('de-DE').format(price);
};
