import React from 'react';
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Country } from "../../model/country";
import { Currency } from "../../model/currency";

type OptionType = 'currency' | 'country';

interface OptionProps {
  item: Currency | Country;
  type: OptionType;
  select?: boolean;
  onPress?: () => void;
}

export const OptionItem = ({ item, type, select, onPress }: OptionProps) => {
  // Determina los campos según el tipo
  const image = type === 'currency' ? (item as Currency).image : (item as Country).flag;
  const name = item.name;
  const code = type === 'currency' ? (item as Currency).abbreviation : (item as Country).dial_code;

  return (
    <TouchableOpacity 
      className="flex flex-row items-center justify-between"
      onPress={onPress}
    >
      <View className="items-center flex-row py-3">
        <Image source={image} className="w-12 h-12" resizeMode="contain" />
        <View className="flex items-start ps-2">
          {type === 'country' ? (
            <>
              <Text className="text-lg font-mulish-bold text-primary">{code}</Text>
              <Text 
                className="text-sm text-gray-400 max-w-[160px]" 
                numberOfLines={1} 
                ellipsizeMode="tail"
              >
                {name}
              </Text>
            </>
          ) : (
            <>
              <Text className="text-lg font-mulish-bold text-primary">{name}</Text>
              <Text className="text-sm text-gray-400">{code}</Text>
            </>
          )}
        </View>
      </View>
      <Image
        source={select ? require('../../assets/tick-circle.png') : require('../../assets/arrow-right.png')}
        className={select ? "w-7 h-7" : "w-6 h-6"}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};