import { Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { Provider } from "react-redux"
import { store } from "../store/store"

export default function RootLayout() {
  return (
    <Provider store={store}>
      <StatusBar style="light" backgroundColor="#003049" />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#003049",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
    </Provider>
  )
}
