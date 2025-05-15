
import { Order } from "./order";

export interface PaymentData {
    order: Order;
    amount: number;
    currencySymbol: string;
}