export interface Currency {
    id: string;          // Unique identifier for the currency
    name: string;        // Full name of the cryptocurrency (e.g., "Bitcoin")
    symbol: string;      // Trading symbol (e.g., "BTC")
    abbreviation: string; // Short form of the name (e.g., "BTC")
    image: any;       // URL of the currency's logo/image
    isSelected: boolean;  // Whether the currency is currently selected
} 