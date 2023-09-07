import { ThemeProvider } from "styled-components/native";

import { AppProvider, UserProvider } from "@realm/react";

import { REALM_APP_ID } from "@env";

import { SignIn } from "./src/screens/SignIn";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import { Loading } from "./src/components/Loading";
import { StatusBar } from "react-native";
import { theme } from "./src/theme";

import { ANDROID_CLIENT_ID } from "@env";
import { Routes } from "./src/routes";

console.log(ANDROID_CLIENT_ID);

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  if (!fontsLoaded) {
    return <Loading />;
  }

  return (
    <AppProvider id={REALM_APP_ID}>
      <ThemeProvider theme={theme}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />
        <UserProvider fallback={SignIn}>
          <Routes />
        </UserProvider>
      </ThemeProvider>
    </AppProvider>
  );
}
