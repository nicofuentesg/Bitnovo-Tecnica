import { CommonActions, useNavigation } from '@react-navigation/native';
import { router, useLocalSearchParams, useNavigationContainerRef } from "expo-router";
import { Dimensions, Image, SafeAreaView, ScrollView, Text, View } from "react-native";
import QRCode from 'react-native-qrcode-svg';
import { usePaymentWebSocketListener } from "../../../hooks/usePaymentWebSocketListener";
import { PaymentData } from "../../../model/payment";

export const navigationRef = useNavigationContainerRef();

export default function QRScreen() {
    const { paymentData } = useLocalSearchParams();
    const paymentDataParsed = JSON.parse(paymentData as string) as PaymentData;
    const windowWidth = Dimensions.get('window').width;
    const qrSize = windowWidth * 0.8; 
    const logoSize = qrSize * 0.20; // Reducimos el tamaño del logo al 15% del QR
    const navigation = useNavigation();
    
    usePaymentWebSocketListener({
        onCancel: () => {
          try {
            if (navigation) {
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{ name: 'views/payment-failed/index' }],
                })
              );
            } else {
              router.replace('views/payment-failed/index');
            }
          } catch (error: any) {
            router.replace('views/payment-failed/index');
          }
        },
        onComplete: async () => {
          try {
            if (navigation) {
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{ name: 'views/payment-success/index' }],
                })
              );
            } else {
              router.replace('views/payment-success/index');
            }
          } catch (error: any) {
            router.replace('views/payment-success/index');
          }
        },
        onIncomplete: () => {
        }
      });

    // Validar que la URL sea válida
    if (!paymentDataParsed.order.web_url || !paymentDataParsed.order.web_url.startsWith('http')) {
        console.error('URL inválida para el QR:', paymentDataParsed.order.web_url);
    }

    return (
        <SafeAreaView className="w-full h-full bg-accent">
            <ScrollView className="flex-1" contentContainerStyle={{ flexGrow: 1 }}>
                <View className="flex-1 p-4 items-center">
                    <View className="w-full items-center justify-center bg-secondary rounded-xl p-4 mb-8">
                        <View className="w-full flex-row px-2">
                            <Image source={require('../../../assets/info-circle.png')} className="w-6 h-6" resizeMode="contain" />
                            <Text className="font-mulish-regular text-lg text-start text-primary ps-2">
                                Escanea el codigo QR y serás redirigido a la pasarela de pago de Bitnovo Pay.
                            </Text>
                        </View>
                    </View>
                    <View className="w-full items-center justify-center bg-white rounded-xl p-6">
                        <QRCode
                            value={paymentDataParsed.order.web_url}
                            size={qrSize}
                            color="#002859"
                            logo={require('../../../assets/logo.png')}
                            logoSize={logoSize}
                            logoBackgroundColor='transparent'
                        />
                    </View>
                    <Text className="font-mulish-bold text-4xl text-center mt-8 text-white">
                        {paymentDataParsed.amount} {paymentDataParsed.currencySymbol}
                    </Text>
                    <Text className="font-mulish-regular text-lg text-start mt-8 text-white">
                        Esta pantalla se actualizará automáticamente.
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
