import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const TrackListScreen = ({ navigation }) => {
  return (
    <View>
      <Text>TrackListScreen</Text>
      <Button
        title='Go to Auth Flow'
        onPress={() => navigation.navigate('authFlow')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
});

export default TrackListScreen;
