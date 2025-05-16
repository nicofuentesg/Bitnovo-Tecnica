import { Platform } from 'react-native';
import AndroidHomeScreen from './AndroidHomeScreen';
import IOSHomeScreen from './IOSHomeScreen';

export const options = {
    title: 'Crear Pago'
};

export default function HomeScreen() {
    return Platform.OS === 'ios' ? <IOSHomeScreen /> : <AndroidHomeScreen />;
}