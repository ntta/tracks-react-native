import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

import Spacer from '../components/Spacer';

const AccountScreen = () => {
  return (
    <View style={styles.container}>
      <Spacer>
        <Button
          title='Sign Out'
        />
      </Spacer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default AccountScreen;
