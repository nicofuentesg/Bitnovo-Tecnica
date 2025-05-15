import { Alert, Linking, View } from "react-native";
import ShareActionButton from "../ShareActionButton";

interface EmailSharedButtonProps {
    icon: any;
    text: string;   
    url: string;    
}

export const EmailSharedButton = ({ icon, text, url }: EmailSharedButtonProps) => {


    const handleShare = async () => {
        const subject = encodeURIComponent("Enlace de pago");
        const body = encodeURIComponent(`Buenas,\n\nLe envío el link del pago:\n${url}\n\nSaludos`);
        const mailtoUrl = `mailto:?subject=${subject}&body=${body}`;
        const canOpen = await Linking.canOpenURL(mailtoUrl);
        if (canOpen) {
            Linking.openURL(mailtoUrl);
        } else {
            Alert.alert("No se puede abrir el correo", "No hay ninguna app de correo configurada en este dispositivo.");
        }
    };

    return (
        <View className="w-full py-2">
            <ShareActionButton
                icon={icon}
                text={text}
                onPress={handleShare}
            />
        </View>
    )
}
