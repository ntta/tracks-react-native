import React, { useContext, useEffect } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import AuthForm from "../components/AuthForm";
import NavLink from "../components/NavLink";

import { Context as AuthContext } from "../context/AuthContext";

const SigninScreen = ({ navigation }) => {
  const { state, signin, clearErrorMessage } = useContext(AuthContext);

  useEffect(() => {
    return navigation.addListener("blur", clearErrorMessage);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <AuthForm
        headerText="Sign In to Your Account"
        errorMessage={state.errorMessage}
        submitButtonText="Sign In"
        onSubmit={signin}
      />
      <NavLink
        routeName="Signup"
        text="Don't have an account? Sign up instead!"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginBottom: 100,
  },
});

export default SigninScreen;
