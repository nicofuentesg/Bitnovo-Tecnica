import { BlurView } from 'expo-blur';
import { Image, Modal, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface WhatsAppConfirmationModalProps {
    visible: boolean;
    onClose: () => void;
}

export const WhatsAppConfirmationModal = ({ visible, onClose }: WhatsAppConfirmationModalProps) => {
    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            onRequestClose={onClose}
        >
            <View className="flex-1 justify-end">
                <BlurView 
                    intensity={25} 
                    tint="light"
                    experimentalBlurMethod={Platform.OS === 'android' ? 'hardware' : undefined}
                    blurReductionFactor={Platform.OS === 'android' ? 4 : undefined}
                    className="flex-1 justify-end"
                >
                    <View
                        style={{
                            ...StyleSheet.absoluteFillObject,
                            backgroundColor: '#002859',
                            opacity: 0.30,
                        }}
                        pointerEvents="none"
                    />
                    <View className="bg-white rounded-3xl p-6  mx-2 mb-2  justify-center"
                      style={{
                        // Sombra para iOS
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: 0.15,
                        shadowRadius: 16,
                        // Elevación para Android
                        elevation: 8,
                      }}>

                        <Image source={require('../../../assets/check.png')} className="w-28 h-28 self-center mb-4" />
                        <Text className="font-mulish-bold text-4xl text-primary text-center my-4">
                            Solicitud enviada
                        </Text>
                        <Text className="font-mulish-regular text-lg text-quaternary text-center mb-10">
                            Tu solicitud de pago enviada ha sido enviado con éxito por WhatsApp.
                        </Text>
                        <TouchableOpacity
                            onPress={onClose}
                            className="bg-accent py-6 mt-12 rounded-xl"
                        >
                            <Text className="font-mulish-bold text-lg text-white text-center">
                                Entendido
                            </Text>
                        </TouchableOpacity>
                    </View>
                </BlurView>
            </View>
        </Modal>
    );
}; 