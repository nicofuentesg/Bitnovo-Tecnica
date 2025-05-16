export interface PaymentCalculation {
    exchangeRate: number;
    confirmedFiat: number;
    remainingFiat: number;
    commission: number;
}

/**
 * Calcula los detalles del pago incluyendo tasa de cambio, montos confirmados y comisión
 * @param userRequestedAmount - Monto total en USD que el usuario pidió
 * @param cryptoAmount - Cantidad total de cripto pedida
 * @param fiatAmount - Valor en USD equivalente a cryptoAmount
 * @param confirmedAmount - Cantidad confirmada de cripto recibida
 * @returns Objeto con los cálculos de la transacción
 */
export function calculatePaymentDetails({
    userRequestedAmount,
    cryptoAmount,
    fiatAmount,
    confirmedAmount
}: {
    userRequestedAmount: number;
    cryptoAmount: number;
    fiatAmount: number;
    confirmedAmount: number;
}): PaymentCalculation {
    // Calculamos el monto confirmado directamente como una proporción del monto total
    const confirmedFiat = Number(((confirmedAmount / cryptoAmount) * fiatAmount).toFixed(4));
    // El monto restante es la diferencia entre el monto total y el monto confirmado
    const remainingFiat = Number((fiatAmount - confirmedFiat).toFixed(4));
    const commission = userRequestedAmount - fiatAmount;

    return {
        exchangeRate: fiatAmount / cryptoAmount,
        confirmedFiat,
        remainingFiat,
        commission
    };
} 