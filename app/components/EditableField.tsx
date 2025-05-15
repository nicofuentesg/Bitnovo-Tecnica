import { useEffect, useState } from "react";
import { Image, Platform, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useCountry } from "../../context/CountryContext";
import { formatPhoneNumber } from "../../utils/phoneFormat";

interface EditableFieldProps {
    icon: any;
    text: string;
    onChange: (newText: string) => void;
    placeholder?: string;
    className?: string;
    prefix?: string;
    onSend?: () => void;
    handleNavigation?: () => void;
}

export const EditableField = ({
    icon,
    text,
    onChange,
    placeholder = "",
    className = "",
    onSend,
    handleNavigation,
}: EditableFieldProps) => {
    const [editing, setEditing] = useState(false);
    const [value, setValue] = useState('');
    const { selectedCountry } = useCountry();

    useEffect(() => {
        if (value) {
            onChange(value);
        }
    }, [value]);

    const handleBlur = () => {
        if (!handleNavigation) {
            setEditing(false);
        }
        onChange(value);
    };

    const handleChangeText = (text: string) => {
        const formatted = formatPhoneNumber(text);
        setValue(formatted);
    };

    if (editing) {
        return (
            <View className={`flex-row items-center p-5 rounded-xl border-2 border-accent/80 w-full bg-white ${className}`}>
                <Image source={icon} className="w-6 h-6 mr-3" />
                <TouchableOpacity className="flex-row items-center" onPress={handleNavigation}>
                    <Text className="text-primary font-mulish-regular mr-2 text-sm">{selectedCountry.dial_code}</Text>
                    <Image source={require('../../assets/arrow-down.png')} className="w-4 h-4 mr-2" resizeMode="contain" />
                </TouchableOpacity>
                <TextInput
                    value={value}
                    onChangeText={handleChangeText}
                    onBlur={handleBlur}
                    autoFocus
                    placeholder={placeholder}
                    className={`flex-1 text-primary font-mulish-regular text-sm ${Platform.OS === 'android' ? 'pb-3' : 'pb-1'}`}
                    keyboardType="phone-pad"
                />
                <TouchableOpacity
                    className="bg-accent px-4 py-2 rounded-lg ml-1"
                    onPress={() => { onSend?.(); setEditing(false); }}
                >
                    <Text className="text-white font-mulish-regular ">Enviar</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <TouchableOpacity
            className={`flex-row items-center p-5 rounded-xl bg-white w-full border border-gray-200 ${className}`}
            onPress={() => setEditing(true)}
            activeOpacity={0.8}
        >
            <Image source={icon} className="w-6 h-6 mr-3" />
            <Text className="text-primary font-mulish-regular text-lg">{text || placeholder}</Text>
        </TouchableOpacity>
    );
};       