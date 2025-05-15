import React, { useState } from "react";
import { Image, ImageSourcePropType, NativeSyntheticEvent, Text, TextInput, TextInputContentSizeChangeEventData, View } from "react-native";

interface InputBoxProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  leftIcon?: ImageSourcePropType;
  className?: string;
  showCounter?: boolean;
  maxLength?: number;
  onFocus?: () => void;
  onBlur?: () => void;
  editable?: boolean;
  style?: any;
}

const InputBox: React.FC<InputBoxProps> = ({ 
  value, 
  onChangeText, 
  placeholder,
  leftIcon,
  className = "",
  showCounter = false,
  maxLength = 140,
  onFocus,
  onBlur,
  editable = true,
  style,
}) => {
  const [inputHeight, setInputHeight] = useState(48);

  const handleContentSizeChange = (event: NativeSyntheticEvent<TextInputContentSizeChangeEventData>) => {
    setInputHeight(event.nativeEvent.contentSize.height);
  };

  return (
    <View>
      <View className={`flex-row items-center border border-gray-300 rounded-lg px-2 py-4`} style={[{ minHeight: 48 }, style]}>
        {leftIcon && (
          <Image 
            source={leftIcon} 
            className="w-6 h-6" 
            resizeMode="contain" 
          />
        )}
        <TextInput
          className={`text-lg text-start  text-primary font-mulish-regular py-3 w-full ${className}`}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#647184"
          maxLength={maxLength}
          multiline
          onContentSizeChange={handleContentSizeChange}
          style={{ minHeight: 42}}
          onFocus={onFocus}
          onBlur={onBlur}
          editable={editable}
        />
      </View>
      {showCounter && (
        <View className="flex-row justify-end mt-1">
          <Text className="text-xs text-gray-400">{value.length}/{maxLength}</Text>
        </View>
      )}
    </View>
  );
};

export default InputBox; 