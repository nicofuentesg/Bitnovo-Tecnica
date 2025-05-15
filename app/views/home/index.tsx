import { useMutation } from '@tanstack/react-query';
import { router, useNavigation } from 'expo-router';
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, Text, View } from "react-native";
import CurrencyInput from 'react-native-currency-input';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useGlobal } from "../../../context/GlobalContext";
import { Order } from '../../../model/order';
import { PaymentData } from '../../../model/payment';
import { ROUTES } from '../../../navigation/path';
import { createOrder } from '../../../services/order/createdOrder';
import InputBox from '../../components/InputBox';
import PrimaryButton from '../../components/PrimaryButton';
    
export const options = {
    title: 'Crear Pago'
};

export default function HomeScreen() {
    const { selectedCurrency } = useGlobal();
    const [amount, setAmount] = useState<number | null>(0);

    const [isFocused, setIsFocused] = useState(false);
    const [isConceptFocused, setIsConceptFocused] = useState(false);
    const [concept, setConcept] = useState('');
    const [conceptInteracted, setConceptInteracted] = useState(false);
    const [keyboardVisible, setKeyboardVisible] = useState(false);

    const { mutateAsync: createOrderMutation, isPending } = useMutation({
        mutationFn: createOrder,
        onSuccess: (order: Order) => {
            const paymentData : PaymentData = {
              order,
              amount,
              currencySymbol: selectedCurrency.symbol,
            };
          
            router.replace({
              pathname: ROUTES.PAYMENT,
              params: { paymentData: JSON.stringify(paymentData) }
            });
          },
        onError: () => {
            Alert.alert(
                "Error",
                "No se pudo crear la solicitud de pago. Por favor, intenta nuevamente.",
                [{ text: "OK" }]
            );  
        }
    });

    const navigation = useNavigation();
    const insets = useSafeAreaInsets();

    useEffect(() => {
        navigation.setOptions({
          title: (isFocused || isConceptFocused) ? 'Importe a pagar' : 'Crear Pago',
        });
      }, [isFocused, isConceptFocused]);

    useEffect(() => {
        const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
            setKeyboardVisible(true);
        });
        const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
            setKeyboardVisible(false);
        });

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);

    const getDecimalSeparator = () => {
        return selectedCurrency.abbreviation === 'EUR' ? ',' : '.';
    };

    const getDelimiter = () => {
        return selectedCurrency.abbreviation === 'EUR' ? ',' : '.';
    };

    const handleAmountChange = (value: number | null) => {
        setAmount(value);
    };

    const handleConfirm = async () => {
        try {
            await createOrderMutation({
                amount: amount ?? 0,
                fiat: selectedCurrency.abbreviation,
                concept,
            });
        } catch (error) {
            console.error('Error al crear la orden:', error);
        }
    }

    return (
        <SafeAreaView className="flex-1 bg-white">
            {isPending && (
                <View
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(229, 231, 235, 0.2)', // gris con opacidad
                        zIndex: 9999,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    pointerEvents="auto"
                >
                    <ActivityIndicator size="large" color="#002859" />
                </View>
            )}
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={32} // Ajusta según tu header/nav
            >
                <View className='flex-1 items-center  px-6'>
                    <View className='h-20'/>
                    <View className='flex-1 items-center'>
                        <View className='flex-row items-center justify-center py-2 '>
                        {selectedCurrency.abbreviation !== 'EUR' && (
                                        <Text style={{ fontSize: 40, paddingVertical: 8, fontFamily: 'mulish-bold', color: isFocused ? '#035AC5' : ((amount ?? 0) > 0 ? '#035AC5' : '#C0CCDA'), paddingRight: 8 }}>
                                            {selectedCurrency.symbol}
                                        </Text>
                                    )}
                               <CurrencyInput  
                                        value={amount}
                                        onChangeValue={handleAmountChange}
                                        delimiter={getDelimiter()}
                                        separator={getDecimalSeparator()}
                                        placeholder={isFocused ? '' : selectedCurrency.abbreviation === 'EUR' ? '0,00' : '0.00'}
                                        placeholderTextColor={isFocused ? '#035AC5' : ((amount ?? 0) > 0 ? '#035AC5' : '#C0CCDA')}
                                        onFocus={() => {
                                            setIsFocused(true);
                                            if (amount === 0) {
                                                setAmount(null);
                                            }
                                        }}
                                        onBlur={() => {
                                            setIsFocused(false);
                                            if (amount === null) {
                                                setAmount(0);
                                            }
                                        }}
                                        cursorColor={"#035AC5"}
                                        precision={2}
                                        minValue={0}
                                        style={{
                                            backgroundColor: 'transparent',
                                            height: 64,
                                            fontSize: 40,
                                            fontFamily: 'mulish-bold',
                                            paddingBottom: Platform.OS === 'ios' ? 8 : 0,
                                            color: isFocused ? '#035AC5' : ((amount ?? 0) > 0 ? '#035AC5' : '#C0CCDA'),
                                            marginTop: 8,
                                        }}
                                    />
                                    {selectedCurrency.abbreviation === 'EUR' && (
                                          <Text style={{ fontSize: 40, paddingVertical: 8, fontFamily: 'mulish-bold', color: isFocused ? '#035AC5' : ((amount ?? 0) > 0 ? '#035AC5' : '#C0CCDA'), paddingRight: 8 }}>
                                          {selectedCurrency.symbol}
                                      </Text>
                            )}
                        </View>
                        <View className='w-full  items-start pt-12'>
                            <Text className='text-lg font-mulish-bold text-center'>
                                Concepto
                            </Text>
                            <InputBox
                                value={concept}
                                onChangeText={(text) => {
                                    setConcept(text);
                                    setConceptInteracted(true);
                                }}
                                onFocus={() => {
                                    setConceptInteracted(true);
                                    setIsConceptFocused(true);
                                }}
                                onBlur={() => setIsConceptFocused(false)}
                                placeholder={'Añade descripción del pago'}
                                showCounter={true}
                                maxLength={140}
                            />
                        </View> 
                    </View>
                    <View
                        className={`w-full `}
                        style={{
                            paddingBottom: keyboardVisible 
                                ? Platform.OS === 'android' 
                                    ? 120 
                                    : 72 
                                : insets.bottom
                        }}
                    >
                        <PrimaryButton
                            text="Confirmar"
                            enabled={(amount ?? 0) > 0 && conceptInteracted}
                            onPress={handleConfirm}
                        />
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}     