import { Currency } from "../model/currency";

export const filterCurrencies = (
    currencies: Currency[],
    search: string,
    selectedCurrencyAbbreviation: string
): Currency[] => {
    return currencies
        .filter(currency => 
            currency.name.toLowerCase().includes(search.toLowerCase()) ||
            currency.abbreviation.toLowerCase().includes(search.toLowerCase())
        )
        .map(currency => ({
            ...currency,
            isSelected: currency.abbreviation === selectedCurrencyAbbreviation
        }));
}; 