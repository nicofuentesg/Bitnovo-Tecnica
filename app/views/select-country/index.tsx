import { useEffect, useState } from "react";
import { FlatList, SafeAreaView, View } from "react-native";
import { useCountry } from "../../../context/CountryContext";
import { Country } from "../../../model/country";
import FilterInput from "../../components/FilterInput";
import { OptionItem } from "../../components/OptionItem";

export default function SelectCountryScreen() {
    const [search, setSearch] = useState('');
    const { selectedCountry, setSelectedCountry, countries } = useCountry();
    const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);

    useEffect(() => {
        const filtered = countries.filter(country => 
            country.name.toLowerCase().includes(search.toLowerCase()) ||
            country.code.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredCountries(filtered);
    }, [search, countries]);

    const handleCountrySelect = (country: Country) => {
        setSelectedCountry(country.code);
    };

    return (
        <SafeAreaView className="w-full h-full bg-white">
            <View className="flex-1 items-center px-6 pt-4">
                <FilterInput value={search} onChangeText={setSearch} placeholder={"Buscar"} />
                <FlatList 
                    data={filteredCountries}
                    className="w-full pt-4"
                    ItemSeparatorComponent={() => <View className="h-2" />}
                    keyExtractor={(item) => item.code}
                    renderItem={({ item }) => (
                        <OptionItem 
                            item={item} 
                            type="country"
                            select={item.code === selectedCountry.code}
                            onPress={() => handleCountrySelect(item)}
                        />
                    )}
                />
            </View>
        </SafeAreaView>
    )
}
    