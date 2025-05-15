import { Order } from "../../model/order";
import { OrderSchema } from "../../types/schema/OrderSchema";
import { HEADERS, ORDER_API_URLS } from "../api-config";


// Campos obligatorios según la API
interface CreateOrderData {
    amount: number;      // expected_output_amount
    fiat: string; // Código de la moneda (EUR, USD, GBP, etc.)
    concept?: string;   // notes - opcional
}

export const createOrder = async ({
    amount,
    fiat,
    concept = "Payment order"
}: CreateOrderData) => {
    try {
        if (isNaN(amount) || amount <= 0) {
            throw new Error(`Invalid amount: ${amount}. Must be a positive number.`);
        }
        const formData = new FormData();
        formData.append('expected_output_amount', amount.toFixed(2));
        formData.append('fiat', fiat); 

        if (concept) {
            formData.append('notes', concept);
        }

        const response = await fetch(ORDER_API_URLS.createOrder, {
            method: 'POST',
            headers: {
                ...HEADERS,
                'Content-Type': 'multipart/form-data',
            },
            body: formData
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Server response:', {
                status: response.status,
                statusText: response.statusText,
                headers: Object.fromEntries(response.headers.entries()),
                body: errorText
            });
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
       
        const parsedData = OrderSchema.parse(data);
        return parsedData as Order;
    } catch (error) {
        console.error('Error al crear la orden:', error);
        throw error;
    }
}