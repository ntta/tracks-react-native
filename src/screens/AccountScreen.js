import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Context as AuthContext } from '../context/AuthContext';
import Spacer from '../components/Spacer';
import ScreenTitle from '../components/ScreenTitle';

const AccountScreen = () => {
  const { signout } = useContext(AuthContext);

  return (
    <SafeAreaView style={styles.container}>
      <ScreenTitle text='Your Account' />
      <Spacer>
        <Button
          title='Sign Out'
          onPress={signout}
        />
      </Spacer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    margin: 12
  },
});

export default AccountScreen;
