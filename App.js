import React from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";

import ResolveAuthScreen from "./src/screens/ResolveAuthScreen";
import SignupScreen from "./src/screens/SignupScreen";
import SigninScreen from "./src/screens/SigninScreen";
import TrackListScreen from "./src/screens/TrackListScreen";
import TrackDetailScreen from "./src/screens/TrackDetailScreen";
import TrackCreateScreen from "./src/screens/TrackCreateScreen";
import AccountScreen from "./src/screens/AccountScreen";

import { Provider as AuthProvider } from "./src/context/AuthContext";
import { Provider as LocationProvider } from "./src/context/LocationContext";
import { Provider as TrackProvider } from "./src/context/TrackContext";
import { navigationRef } from "./src/navigationRef";

const ParentStack = createStackNavigator();
const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();
const TrackListStack = createStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#fff",
  },
};

const authFlow = () => {
  return (
    <AuthStack.Navigator
      initialRouteName="Signup"
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthStack.Screen name="Signin" component={SigninScreen} />
      <AuthStack.Screen name="Signup" component={SignupScreen} />
    </AuthStack.Navigator>
  );
};

const mainFlow = () => {
  return (
    <MainTab.Navigator>
      <MainTab.Screen
        name="trackListFlow"
        component={trackListFlow}
        options={{
          title: "Tracks",
          tabBarIcon: () => {
            return <Feather name="list" size={24} />;
          },
        }}
      />
      <MainTab.Screen
        name="TrackCreate"
        component={TrackCreateScreen}
        options={{
          title: "Create",
          tabBarIcon: () => {
            return <Feather name="plus" size={24} />;
          },
        }}
      />
      <MainTab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          title: "Account",
          tabBarIcon: () => {
            return <Feather name="settings" size={24} />;
          },
        }}
      />
    </MainTab.Navigator>
  );
};

const trackListFlow = () => {
  return (
    <TrackListStack.Navigator>
      <TrackListStack.Screen
        name="TrackList"
        component={TrackListScreen}
        options={{ title: "Track List", headerShown: false }}
      />
      <TrackListStack.Screen
        name="TrackDetail"
        component={TrackDetailScreen}
        options={{ title: "Track Detail" }}
      />
    </TrackListStack.Navigator>
  );
};

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer ref={navigationRef} theme={MyTheme}>
        <ParentStack.Navigator
          initialRouteName="ResolveAuth"
          screenOptions={{
            headerShown: false,
          }}
        >
          <ParentStack.Screen
            name="ResolveAuth"
            component={ResolveAuthScreen}
          />
          <ParentStack.Screen name="authFlow" component={authFlow} />
          <ParentStack.Screen name="mainFlow" component={mainFlow} />
        </ParentStack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default () => {
  return (
    <TrackProvider>
      <LocationProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </LocationProvider>
    </TrackProvider>
  );
};
