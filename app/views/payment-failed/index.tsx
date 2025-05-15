import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import { useEffect } from 'react';
import { BackHandler, Dimensions, SafeAreaView, Text, View } from 'react-native';
import { ROUTES } from '../../../navigation/path';
import SecondaryButton from '../../components/SecondaryButton';

export default function PaymentFailedScreen() {
    const navigation = useNavigation();
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const animationSize = Math.min(windowWidth * 0.8, windowHeight * 0.4);

    useEffect(() => {
        navigation.setOptions({
            headerShown: false
        });
        
        const onBackPress = () => true; 
        const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
        return () => {
            subscription.remove();
        };
    }, [navigation]);

    return (
        <SafeAreaView className="w-full h-full bg-white">
            <View className="flex-1 items-center justify-center p-4">
                <View className="relative items-center justify-center">
                        <LottieView
                            source={require('../../../assets/animation/failed.json')}
                            autoPlay
                            loop={true}
                            style={{ width: animationSize, height: animationSize }}
                        />
                </View>
                <Text className="font-mulish-bold text-2xl text-primary text-center mt-8">
                    Pago fallido
                </Text>
                <Text className="font-mulish-regular text-lg text-quaternary text-center mt-8">
                    No se pudo procesar el pago. Por favor, inténtalo de nuevo.
                </Text>
            </View>
            <View className="w-full p-4">
                <SecondaryButton 
                    text="Volver a intentar"
                    route={ROUTES.HOME}
                />
            </View>
        </SafeAreaView>
    );
}
