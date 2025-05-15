import { useRouter } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import { useCountry } from "../../../context/CountryContext";
import { ROUTES } from "../../../navigation/path";
import { EditableField } from "../EditableField";

interface WhatsAppShareButtonProps {
    icon: any;
    text: string;
    onSend: (phoneNumber: string) => void;
}

export const WhatsAppShareButton = ({ icon, text, onSend }: WhatsAppShareButtonProps) => {
    const [phoneNumber, setPhoneNumber] = useState("");
    const router = useRouter();
    const { selectedCountry } = useCountry();

    const handleSend = () => {
        const cleanNumber = phoneNumber.replace(/[^0-9]/g, '');
        const cleanPrefix = selectedCountry.dial_code.replace(/\D/g, '');
        onSend(`${cleanPrefix}${cleanNumber}`);
    }

    return (
        <View className="w-full py-2">
            <EditableField
                icon={icon}
                text={text}
                onChange={setPhoneNumber}
                onSend={handleSend}
                placeholder="300 678 9087"
                prefix={selectedCountry.dial_code}
                handleNavigation={() => router.push(ROUTES.SELECT_COUNTRY)}
                />
        </View>
    )
}
