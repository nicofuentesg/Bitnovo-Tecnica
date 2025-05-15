import { View } from "react-native";
import ShareActionButton from "../ShareActionButton";

interface ShareWithOtherAppsButtonProps {
    icon: any;
    text: string;
    onPress: () => void;
}

export const ShareWithOtherAppsButton = ({ icon, text, onPress }: ShareWithOtherAppsButtonProps) => {
    return (
        <View className="w-full py-2">
            <ShareActionButton
                icon={icon}
                text={text}
                onPress={onPress}
            />
        </View>
    )
}
