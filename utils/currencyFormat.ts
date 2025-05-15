interface CurrencyFormat {
    symbol: string;
    position: 'before' | 'after';
    decimalSeparator: '.' | ',';
}

export const CURRENCY_FORMATS: Record<string, CurrencyFormat> = {
    EUR: { symbol: '€', position: 'after', decimalSeparator: ',' },
    USD: { symbol: '$', position: 'before', decimalSeparator: '.' },
    GBP: { symbol: '£', position: 'before', decimalSeparator: '.' },
    JPY: { symbol: '¥', position: 'before', decimalSeparator: '.' },
    // Agrega más monedas según necesites
};

export const formatCurrency = (amount: string | number, currencyAbbreviation: string): string => {
    const format = CURRENCY_FORMATS[currencyAbbreviation] || CURRENCY_FORMATS.USD;
    
    // Asegurar que el amount use el separador decimal correcto
    const normalizedAmount = typeof amount === 'string' 
        ? amount.replace(/[.,]/g, format.decimalSeparator)
        : amount.toString().replace('.', format.decimalSeparator);
    
    if (format.position === 'after') {
        return `${normalizedAmount} ${format.symbol}`;
    }
    return `${format.symbol} ${normalizedAmount}`;
}; 