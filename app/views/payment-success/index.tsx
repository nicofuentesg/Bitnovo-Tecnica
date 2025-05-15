import LottieView from 'lottie-react-native';
import { useEffect } from 'react';
import { BackHandler, Dimensions, Image, SafeAreaView, Text, View } from 'react-native';
import { ROUTES } from '../../../navigation/path';
import SecondaryButton from '../../components/SecondaryButton';

export default function PaymentSuccessScreen() {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const animationSize = Math.min(windowWidth * 0.8, windowHeight * 0.4); 

    useEffect(() => {
        const onBackPress = () => true; // Block back button
        const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
        return () => {
            subscription.remove();
        };
    }, []);

    return (
        <SafeAreaView className="w-full h-full bg-white">
            <View className="flex-1 items-center justify-center p-4">
                <View className="relative items-center justify-center">
                    <Image 
                        source={require('../../../assets/success.png')}
                        className="w-32 h-32"
                        resizeMode="contain"
                    />
                    <View className="absolute">
                        <LottieView
                            source={require('../../../assets/animation/success.json')}
                            autoPlay
                            loop={true}
                            style={{ width: animationSize, height: animationSize }}
                        />
                    </View>
                </View>
                <Text className="font-mulish-bold text-2xl text-primary text-center mt-8">
                    Pago recibido
                </Text>
                <Text className="font-mulish-regular text-lg text-quaternary text-center mt-8">
                    El pago se ha confirmado con éxito.
                </Text>
            </View>
            <View className="w-full p-4">
                <SecondaryButton 
                    text="Finalizar"
                    route={ROUTES.HOME}
                />
            </View>
        </SafeAreaView>
    );
}
