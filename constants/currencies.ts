import { Currency } from '../model/currency';

export const FIAT_CURRENCIES: Currency[] = [
    {
        id: '0',
        name: 'Euro',
        symbol: '€',
        abbreviation: 'EUR',
        image: require('../assets/flag-eur.png'),
        isSelected: false,
    },
    {
        id: '1',
        name: 'Dólar Estadounidense',
        symbol: '$',
        abbreviation: 'USD',
        image: require('../assets/flag-usd.png'),
        isSelected: true,
    },
    {
        id: '2',
        name: 'Libra Esterlina',
        symbol: '£',
        abbreviation: 'GBP',
        image: require('../assets/flag-gbp.png'),
        isSelected: false,
    }
];