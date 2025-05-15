
import { Order } from "./order";

export interface PaymentData {
    order: Order;
    amount: number | null;
    currencySymbol: string;
}