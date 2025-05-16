import { router, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Alert, AppState, Image, Linking, SafeAreaView, Share, Text, View } from "react-native";
import { useWebSocket } from '../../../context/WebSocketContext';
import { usePaymentWebSocketListener } from "../../../hooks/usePaymentWebSocketListener";
import { ROUTES } from "../../../navigation/path";
import { calculatePaymentDetails } from "../../../utils/payment";
import { EmailSharedButton } from "../../components/payment/EmailSharedButton";
import { PaymentLinkButton } from "../../components/payment/PaymentLinkButton";
import { ShareWithOtherAppsButton } from "../../components/payment/ShareWithOtherAppsButton";
import { WhatsAppConfirmationModal } from "../../components/payment/WhatsAppConfirmationSheet";
import { WhatsAppShareButton } from "../../components/payment/WhatsAppShareButton";
import SecondaryButton from '../../components/SecondaryButton';

export default function PaymentScreen() {
    const { paymentData } = useLocalSearchParams();
    const paymentDataParsed = JSON.parse(paymentData as string);
    const { amount, currencySymbol } = paymentDataParsed;
    const [isWhatsAppConfirmationModalVisible, setIsWhatsAppConfirmationModalVisible] = useState(false);
    const { lastMessage, connect, disconnect } = useWebSocket();
    const [shouldReconnect, setShouldReconnect] = useState(false);
    const [fiatAmount, setFiatAmount] = useState<number | null>(null);
    
    useEffect(() => {
        const identifier = paymentDataParsed.order.identifier;

        if (identifier) {
            connect(identifier);
        }

        return () => disconnect();
    }, [paymentDataParsed.order.identifier]);

    // Reconnect only if coming back from WhatsApp
    useEffect(() => {
        const handleAppStateChange = (nextAppState: string) => {
            if (
                nextAppState === 'active' &&
                shouldReconnect &&
                paymentDataParsed.order.identifier
            ) {
                connect(paymentDataParsed.order.identifier);
                setShouldReconnect(false);
            }
        };
        const subscription = AppState.addEventListener('change', handleAppStateChange);
        return () => {
            subscription.remove();
        };
    }, [shouldReconnect, connect, paymentDataParsed.order.identifier]);

    usePaymentWebSocketListener({
        onCancel: () => {
          router.replace(ROUTES.PAYMENT_FAILED);
        },
        onComplete: () => {
          router.replace(ROUTES.PAYMENT_SUCCESS);
        },
        onIncomplete: () => {
          if (lastMessage) {
            const { remainingFiat } = calculatePaymentDetails({
                userRequestedAmount: lastMessage.fiat_amount,
                cryptoAmount: lastMessage.crypto_amount,
                fiatAmount: lastMessage.fiat_amount,
                confirmedAmount: lastMessage.confirmed_amount
            });
            setFiatAmount(remainingFiat);
            
          }
          Alert.alert(
            "Pago Incompleto",
            `Por favor, completa el pago`,
            [{ text: "OK" }]
          );
        }
    });

    const handleWhatsAppSend = useCallback(async (number: string) => {
        try {
            const message = `Hola, tienes una solicitud de pago de ${amount} ${currencySymbol}. Puedes pagar aquí: ${paymentDataParsed.order.web_url}`;
            await Linking.openURL(`https://api.whatsapp.com/send?phone=${number}&text=${encodeURIComponent(message)}`);
            setShouldReconnect(true);
            setIsWhatsAppConfirmationModalVisible(true);
        } catch (error) {
            Alert.alert(
                "Error",
                "Ocurrió un error al intentar abrir WhatsApp. Por favor, intenta nuevamente.",
                [{ text: "OK" }]
            );
            console.error('Error al abrir WhatsApp:', error);
        }
    }, [amount, currencySymbol, paymentDataParsed.order.web_url]);

    const handleConfirmSend = useCallback(() => {
        setShouldReconnect(true);
        setIsWhatsAppConfirmationModalVisible(false);
    }, []);
    
    useEffect(() => {
    }, [fiatAmount]);

    const handleShareWithOtherApps = useCallback(async () => {
        try {
            const message = `Hola, tienes una solicitud de pago de ${amount} ${currencySymbol}. Puedes pagar aquí: ${paymentDataParsed.order.web_url}`;
            Share.share({
                message: message,
                url: paymentDataParsed.order.web_url, //only IOS
            });
        } catch (error) {
            Alert.alert(
                "Error",
                "Ocurrió un error al intentar compartir. Por favor, intenta nuevamente.",
                [{ text: "OK" }]
            );
        }
    }, [amount, currencySymbol, paymentDataParsed.order.web_url]);

    return (
                <SafeAreaView className="w-full h-full bg-white ">
                    <View className="flex-1 pt-12 px-6">
                        <View className="w-full mb-6">
                            <View className="flex items-center justify-center bg-quaternary/10 w-full py-4 rounded-xl">
                                <View className="flex-row items-center justify-center  w-full pb-2 "> 
                                    <Image source={require('../../../assets/money-time.png')} className="h-18 w-18"/>
                                    <View className="flex ps-4">
                                        <Text className='font-mulish-regular  text-quaternary text-lg '>Solicitud de pago</Text>
                                        <Text className='font-mulish-bold text-3xl text-primary'>
                                            {fiatAmount ? `${(fiatAmount).toFixed(2)}` : amount} {currencySymbol}
                                        </Text>
                                    </View>
                                </View>
                                <Text className='font-mulish-regular  text-quaternary text-sm py-3'>Comparte el enlace de pago con el cliente</Text>
                            </View>
                        </View>
                        <View className="flex w-full">
                            <PaymentLinkButton icon={require('../../../assets/link.png')} text={paymentDataParsed.order.web_url} paymentData={paymentDataParsed}  />
                            <EmailSharedButton icon={require('../../../assets/sms.png')} text="Enviar por correo electrónico" url={paymentDataParsed.order.web_url} />    
                            <WhatsAppShareButton 
                                icon={require('../../../assets/whatsapp.png')} 
                                text="Enviar por WhatsApp"  
                                onSend={handleWhatsAppSend}
                            />    
                            <ShareWithOtherAppsButton 
                                icon={require('../../../assets/export.png')} 
                                text="Compartir con otras aplicaciones" 
                                onPress={handleShareWithOtherApps} 
                            />
                        </View>
                    </View>
                    <View className="w-full p-4">
                        <SecondaryButton 
                        text="Nueva solicitud"
                        route={ROUTES.HOME}
                        icon={require('../../../assets/wallet-add.png')}/>
                    </View> 
                    <WhatsAppConfirmationModal
                        visible={isWhatsAppConfirmationModalVisible}
                        onClose={handleConfirmSend}
                    />
                </SafeAreaView>
    );
}