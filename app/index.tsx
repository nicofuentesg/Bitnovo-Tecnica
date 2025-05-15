import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { ROUTES } from "../navigation/path";

export default function Index() {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router.replace(ROUTES.HOME);
    }, 0);
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color="#002859" />
    </View>
  );
}