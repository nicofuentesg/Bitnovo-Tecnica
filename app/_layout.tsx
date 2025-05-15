import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from "expo-font";
import { Stack } from 'expo-router';
import { Image, View } from "react-native";
import { CountryProvider } from '../context/CountryContext';
import { GlobalProvider, useGlobal } from '../context/GlobalContext';
import { WebSocketProvider } from '../context/WebSocketContext';
import "../global.css";
import { CurrencyButton } from "./components/CurrencyButton";
import HeaderLeftButton from './components/HeaderLeftButton';

const queryClient = new QueryClient();

export default function Layout() {
  const [fontsLoaded] = useFonts({
    "Mulish-Black": require("../assets/fonts/Mulish-Black.ttf"),
    "Mulish-BlackItalic": require("../assets/fonts/Mulish-BlackItalic.ttf"),
    "Mulish-Bold": require("../assets/fonts/Mulish-Bold.ttf"),
    "Mulish-BoldItalic": require("../assets/fonts/Mulish-BoldItalic.ttf"),
    "Mulish-ExtraBold": require("../assets/fonts/Mulish-ExtraBold.ttf"),
    "Mulish-ExtraBoldItalic": require("../assets/fonts/Mulish-ExtraBoldItalic.ttf"),
    "Mulish-ExtraLight": require("../assets/fonts/Mulish-ExtraLight.ttf"),
    "Mulish-ExtraLightItalic": require("../assets/fonts/Mulish-ExtraLightItalic.ttf"),
    "Mulish-Italic": require("../assets/fonts/Mulish-Italic.ttf"),
    "Mulish-Light": require("../assets/fonts/Mulish-Light.ttf"),
    "Mulish-LightItalic": require("../assets/fonts/Mulish-LightItalic.ttf"),
    "Mulish-Medium": require("../assets/fonts/Mulish-Medium.ttf"),
    "Mulish-MediumItalic": require("../assets/fonts/Mulish-MediumItalic.ttf"),
    "Mulish-Regular": require("../assets/fonts/Mulish-Regular.ttf"),
    "Mulish-SemiBold": require("../assets/fonts/Mulish-SemiBold.ttf"),
    "Mulish-SemiBoldItalic": require("../assets/fonts/Mulish-SemiBoldItalic.ttf"),
  });

  if (!fontsLoaded) {
    return <View />; 
  }

  return (
    <QueryClientProvider client={queryClient}>
      <WebSocketProvider>
        <GlobalProvider>
          <CountryProvider>
            <LayoutContent />
          </CountryProvider>
        </GlobalProvider>
      </WebSocketProvider>
    </QueryClientProvider>
  );
}

function LayoutContent() {
  const { selectedCurrency } = useGlobal();
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#fff" },
        headerTintColor: "#002859",
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontFamily: "Mulish-Bold",
          fontSize: 18,
        },
      }}
    >
      <Stack.Screen
        name="views/home/index"
        options={{
          headerShown: true,
          headerBackVisible: false,
          headerRight(props) {
            return (
              <CurrencyButton currencyMoney={selectedCurrency.abbreviation} />
            )
          },
        }}
      />
      <Stack.Screen
        name="views/select-currency/index"
        options={{
          headerTitle: "Selecciona una divisa",
          headerLeft(props) {
            return (
              <HeaderLeftButton />
            )
          },
        }}
      />
      <Stack.Screen
        name="views/select-country/index"
        options={{
          headerTitle: "Selecciona un país",
          headerLeft(props) {
            return (
              <HeaderLeftButton />
            )
          },
          }}
      />
      <Stack.Screen
        name="views/payment/index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="views/qr/index"
        options={{
          headerShown: true,
          headerTitle: "",
          headerLeft(props) {
            return (
              <HeaderLeftButton />
            )
          },
        }}
      />
      <Stack.Screen
        name="views/payment-success/index"
        options={{
          headerShown: true,
          headerTitleAlign: 'center',
          headerTitle: () => (
            <Image 
              source={require('../assets/logo-header.png')}
              className="w-28 h-16"
              resizeMode="cover"
            />
          ),  
        headerBackVisible: false,
        headerLeft: () => null,
        }}
      />
      <Stack.Screen
        name="views/payment-failed/index"
        options={{
          headerShown: true,
          headerTitleAlign: 'center',
          headerTitle: () => (
            <Image 
              source={require('../assets/logo-header.png')}
              className="w-28 h-16"
              resizeMode="cover"
            />
          ),  
          headerBackVisible: false,
          headerLeft: () => null,
        }}
      />
    </Stack>
  );
} 