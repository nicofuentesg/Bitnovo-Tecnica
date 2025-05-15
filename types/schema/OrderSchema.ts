import { z } from 'zod';

export const OrderSchema = z.object({
  identifier: z.string(),
  reference: z.string().nullable(),
  web_url: z.string().url(),
  fiat: z.enum([
    'EUR', 'USD', 'GBP', 'ARS', 'AUD', 'BGN', 'BOB', 'BRL', 'CAD', 'CHF',
    'CLP', 'COP', 'DKK', 'DOP', 'GEL', 'HUF', 'ISK', 'JPY', 'KRW', 'MXN',
    'NOK', 'NZD', 'PEN', 'PLN', 'PYG', 'RON', 'SEK', 'SGD', 'SVC', 'UYU'
  ]),
  language: z.string().min(1).max(6),
  need_dni: z.boolean(),
});
