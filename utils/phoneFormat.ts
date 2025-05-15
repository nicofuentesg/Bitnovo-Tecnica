export const formatPhoneNumber = (value: string) => {
    // Eliminar todos los espacios y caracteres no numéricos
    const numbers = value.replace(/\D/g, '');
    
    // Aplicar el formato: XXX XXX XXXX
    let formatted = '';
    if (numbers.length > 0) {
        formatted = numbers.slice(0, 3);
        if (numbers.length > 3) {
            formatted += ' ' + numbers.slice(3, 6);
        }
        if (numbers.length > 6) {
            formatted += ' ' + numbers.slice(6, 14);
        }
    }
    return formatted;
}; 