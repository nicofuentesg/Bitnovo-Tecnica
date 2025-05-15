import { router } from "expo-router";
import { Image, Text, TouchableOpacity } from "react-native";
import { ROUTES } from "../../navigation/path";

export interface CurrencyButtonProps {
    currencyMoney: string
}

export const CurrencyButton = ({ currencyMoney }: CurrencyButtonProps) => {
  return (
    <TouchableOpacity className="bg-secondary/30 rounded-xl flex flex-row items-center justify-center p-2"
    onPress={() => router.push(ROUTES.SELECT_CURRENCY)}>
      <Text className="text-primary font-bold">{currencyMoney}</Text>
      <Image
      source={require('../../assets/arrow-down.png')}
      className="w-4 h-4 ms-4"
      resizeMode="contain"

    />
    </TouchableOpacity>
  );
};