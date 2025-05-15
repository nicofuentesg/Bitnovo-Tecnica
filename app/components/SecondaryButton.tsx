import { router } from 'expo-router';
import { Image, Text, TouchableOpacity, View } from 'react-native';

interface SecondaryButtonProps {
    text: string;
    onPress?: () => void;
    icon?: any;
    route?: string;
}

export default function SecondaryButton({ text, onPress, icon, route }: SecondaryButtonProps) {
    const handlePress = () => {
        if (onPress) {
            onPress();
        } else if (route) {
            router.replace(route);
        }
    };

    return (
        <View className="w-full p-4">
            <TouchableOpacity 
                onPress={handlePress}
                className="w-full bg-quinary py-4 rounded-xl flex-row justify-center items-center"
            >
                <Text className="font-mulish-bold text-lg text-accent text-center">
                    {text}
                </Text>
                {icon && (
                    <Image 
                        source={icon} 
                        className="w-6 h-6 ml-3" 
                        resizeMode="contain"
                    />
                )}
            </TouchableOpacity>
        </View>
    );
}
