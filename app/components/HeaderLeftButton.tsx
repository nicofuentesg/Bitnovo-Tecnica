import { router } from 'expo-router';
import { Image, TouchableOpacity } from 'react-native';

export default function HeaderLeftButton() {
    return (
        <TouchableOpacity 
            onPress={() => router.back()}
            className=" me-3"
        >
            <Image 
                source={require('../../assets/arrow-left.png')}
                className="w-8 h-8"
                resizeMode="contain"
            />
        </TouchableOpacity>
    );
}
