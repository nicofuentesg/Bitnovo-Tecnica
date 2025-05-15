import { BlurView } from 'expo-blur';
import { Image, Modal, Text, TouchableOpacity, View } from 'react-native';

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
            <View className="flex-1 justify-end bg-accent/30">
                <BlurView 
                    intensity={50} 
                    tint="dark"
                    className="flex-1 justify-end"
                >
                    <View className="bg-white rounded-t-3xl p-6">
                        <View className="w-12 h-1 bg-gray-300 rounded-full self-center mb-4" />
                        <Image source={require('../../../assets/check.png')} className="w-32 h-32 self-center mb-4" />
                        <Text className="font-mulish-bold text-2xl text-primary text-center my-4">
                            Solicitud enviada
                        </Text>
                        <Text className="font-mulish-regular text-base text-quaternary text-center mb-6">
                            Tu solicitud de pago enviada ha sido enviado con éxito por WhatsApp.
                        </Text>
                        <TouchableOpacity
                            onPress={onClose}
                            className="bg-accent py-4 rounded-xl"
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