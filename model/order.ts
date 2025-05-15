export interface Order{
    identifier: string;
    reference: string | null;
    web_url: string;
    fiat: string;
    language: string;
    need_dni: boolean;
}
