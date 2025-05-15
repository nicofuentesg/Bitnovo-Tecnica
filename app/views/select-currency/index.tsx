import { useEffect, useState } from "react";
import { FlatList, SafeAreaView, View } from "react-native";
import { useGlobal } from "../../../context/GlobalContext";
import { Currency } from "../../../model/currency";
import { filterCurrencies } from "../../../utils/currencyFilters";
import FilterInput from "../../components/FilterInput";
import { OptionItem } from "../../components/OptionItem";

export default function SelectCurrencyScreen() {
    const [search, setSearch] = useState('');
    const { selectedCurrency, setSelectedCurrency, currencies } = useGlobal();
    const [filteredCurrencies, setFilteredCurrencies] = useState<Currency[]>([]);

    useEffect(() => {
        const filtered = filterCurrencies(currencies, search, selectedCurrency.abbreviation);
        setFilteredCurrencies(filtered);
    }, [search, currencies, selectedCurrency]);

    const handleCurrencySelect = (currency: Currency) => {
        setSelectedCurrency(currency.abbreviation);
        setFilteredCurrencies(filteredCurrencies.map(c => ({
            ...c,
            isSelected: c.id === currency.id
        })));
    };

    return (
        <SafeAreaView className="w-full h-full bg-white">
            <View className="flex-1 items-center px-6 pt-4">
                <FilterInput value={search} onChangeText={setSearch} placeholder={"Buscar"} />
                <FlatList 
                data={filteredCurrencies}
                className="w-full pt-4"
                ItemSeparatorComponent={() => <View className="h-2" />}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <OptionItem 
                        item={item} 
                        type="currency"
                        select={item.isSelected} 
                        onPress={() => handleCurrencySelect(item)}
                    />
                )}
                />
            </View>
        </SafeAreaView>
    )
}               