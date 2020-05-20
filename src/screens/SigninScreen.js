import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const SigninScreen = ({ navigation }) => {
  return (
    <View>
      <Text>SigninScreen</Text>
      <Button
        title='Go to Sign Up'
        onPress={() => navigation.navigate('Signup')}
      />
      <Button
        title='Go to Main Flow'
        onPress={() => navigation.navigate('mainFlow')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
});

export default SigninScreen;
