import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import SocketContextProvider from './SocketContect'

export default function RootLayout() {

  useFonts({
    "outfit": require('./../assets/fonts/Outfit-Regular.ttf'),
    "outfit-medium": require('./../assets/fonts/Outfit-Medium.ttf'),
    "outfit-bold": require('./../assets/fonts/Outfit-Bold.ttf'),
    "outfit-extra-bold": require('./../assets/fonts/Outfit-ExtraBold.ttf')
  })


  return (
    // <SocketContextProvider>
      <Stack>
        <Stack.Screen name="index" options={{
          headerShown: false
        }} />
        <Stack.Screen name="login/index" options={{
          headerShown: false
        }} />
      </Stack>
    // </SocketContextProvider>
  );
}
