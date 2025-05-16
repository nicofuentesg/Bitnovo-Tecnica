import { useMutation } from '@tanstack/react-query';
import { router, useNavigation } from 'expo-router';
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Keyboard, StyleSheet, Text, useColorScheme, useWindowDimensions, View } from "react-native";
import CurrencyInput from 'react-native-currency-input';
import Animated, { runOnJS, useAnimatedKeyboard, useAnimatedReaction, useAnimatedStyle } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useGlobal } from "../../../context/GlobalContext";
import { Order } from '../../../model/order';
import { PaymentData } from '../../../model/payment';
import { ROUTES } from '../../../navigation/path';
import { createOrder } from '../../../services/order/createdOrder';
import InputBox from '../../components/InputBox';
import PrimaryButton from '../../components/PrimaryButton';

export default function AndroidHomeScreen() {
    const { selectedCurrency } = useGlobal();
    const [amount, setAmount] = useState<number | null>(0);
    const [isFocused, setIsFocused] = useState(false);
    const [isConceptFocused, setIsConceptFocused] = useState(false);
    const [concept, setConcept] = useState('');
    const [conceptInteracted, setConceptInteracted] = useState(false);
    const [keyboardVisible, setKeyboardVisible] = useState(false);

    const { height } = useWindowDimensions();
    const { mutateAsync: createOrderMutation, isPending } = useMutation({
        mutationFn: createOrder,
        onSuccess: (order: Order) => {
            const paymentData: PaymentData = {
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
            Keyboard.dismiss();
            await createOrderMutation({
                amount: amount ?? 0,
                fiat: selectedCurrency.abbreviation,
                concept,
            });
        } catch (error) {
            console.error('Error al crear la orden:', error);
        }
    }

    const colorScheme = useColorScheme();
    const keyboard = useAnimatedKeyboard();
    const [lastKeyboardHeight, setLastKeyboardHeight] = useState(0);

    useAnimatedReaction(
        () => keyboard.height.value,
        (current, prev) => {
            if (current !== prev) {
                runOnJS(setLastKeyboardHeight)(current);
            }
        },
        [keyboard]
    );

    const animatedStyles = useAnimatedStyle(() => ({
        transform: [{ translateY: -keyboard.height.value }],
    }));

    const { height: screenHeight } = useWindowDimensions();
    const keyboardIsLarge = (lastKeyboardHeight / screenHeight) > 0.40;

    const getJustifyContent = () => {
        if (keyboardVisible) {
            return keyboardIsLarge ? 'flex-end' : 'center';
        }
        return 'flex-start';
    };

    return (
        <Animated.View
            style={[
                styles.container,
                animatedStyles,
                {
                    backgroundColor: colorScheme === 'light' ? '#fff' : '#000',
                    justifyContent: keyboardVisible ? 'flex-end' : 'flex-start',
                },
            ]}>
                {isPending  && (
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
            <View style={styles.box}>
                <View
                    style={{
                        flexGrow: 1,
                        justifyContent: getJustifyContent(),
                        alignItems: 'center',
                        width: '100%',
                        paddingTop: height * 0.05,
                    }}
                >
                    <View className='flex-row items-center justify-center mb-4'>
                        {selectedCurrency.abbreviation !== 'EUR' && (
                            <Text style={{ fontSize: 40, fontFamily: 'mulish-bold', color: isFocused ? '#035AC5' : ((amount ?? 0) > 0 ? '#035AC5' : '#C0CCDA'), paddingRight: 8 }}>
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
                            multiline={false}
                            minValue={0}
                            style={{
                                backgroundColor: 'transparent',
                                height: 64,
                                fontSize: 40,
                                fontFamily: 'mulish-bold',
                                paddingBottom: 4,
                                color: isFocused ? '#035AC5' : ((amount ?? 0) > 0 ? '#035AC5' : '#C0CCDA'),
                            }}
                        />
                        {selectedCurrency.abbreviation === 'EUR' && (
                            <Text style={{ fontSize: 40, fontFamily: 'mulish-bold', color: isFocused ? '#035AC5' : ((amount ?? 0) > 0 ? '#035AC5' : '#C0CCDA'), paddingRight: 8 }}>
                                {selectedCurrency.symbol}
                            </Text>
                        )}
                    </View>
                    <View className='w-full items-start'>
                        <Text className='text-lg font-mulish-bold text-center pt-8'>
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
                <View className='mb-4 w-full'>
                    <PrimaryButton
                        onPress={handleConfirm}
                        text="Continuar"
                        enabled={(amount ?? 0) > 0 && conceptInteracted}
                        className="py-4 w-full"
                    />
                </View>
            </View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderRadius: 2,
        paddingHorizontal: 20,
    },
    box: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
}); 