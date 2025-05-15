import { Image, Text, TouchableOpacity } from "react-native";

interface ShareActionButtonProps {
  icon: any;
  text: string;
  onPress: () => void;
  className?: string;
  textStyle?: string;
  singleLine?: boolean;
}

export default function ShareActionButton({ icon, text, onPress, className, textStyle, singleLine }: ShareActionButtonProps) {
    return (
    <TouchableOpacity
      onPress={onPress}
      className={`flex-row items-center p-5 rounded-xl bg-white w-full border border-gray-200 ${className}`}
    >
      <Image source={icon} className="w-6 h-6 mr-3" />
      <Text 
        numberOfLines={singleLine ? 1 : undefined}
        ellipsizeMode={singleLine ? "tail" : undefined}
        className={`text-primary font-mulish-regular text-lg pe-1 ${textStyle}`}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
}