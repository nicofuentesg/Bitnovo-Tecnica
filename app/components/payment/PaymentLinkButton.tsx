import * as Clipboard from 'expo-clipboard';
import { useRouter } from "expo-router";
import { Alert, Image, TouchableOpacity, View } from "react-native";
import { PaymentData } from "../../../model/payment";
import { ROUTES } from "../../../navigation/path";
import ShareActionButton from "../ShareActionButton";

interface PaymentLinkButtonProps {
    icon: any;
    text: string;
    paymentData: PaymentData ;
}

export const PaymentLinkButton = ({ icon, text, paymentData }: PaymentLinkButtonProps) => {
    const router = useRouter();

    const handleScan = () => {
        router.push({
            pathname: ROUTES.QR,
            params: { paymentData: JSON.stringify(paymentData) }
        });
    }

    const copyToClipboard = async () => {
        await Clipboard.setStringAsync(text);
        Alert.alert("Enlace copiado", "El enlace de pago ha sido copiado al portapapeles.");
    }

    return (
        <View className="w-full flex-row py-2">
            <ShareActionButton
                icon={icon}
                text={text}
                onPress={copyToClipboard}
                className="flex-1"
                singleLine={true}
                textStyle='mx-2'
            />
            <TouchableOpacity
                className="bg-accent rounded-xl w-16 h-16 items-center justify-center ml-4"
                style={{ minWidth: 60, minHeight: 60 }} 
                onPress={handleScan}
            >
               <Image source={require('../../../assets/scan-barcode.png')} className="w-6 h-6" resizeMode="contain" />
            </TouchableOpacity>
        </View>
    )
}