import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';

const ScreenTitle = ({ text }) => {
  return (
    <Text h3 style={styles.title}>{text}</Text>
  );
};

const styles = StyleSheet.create({
  title: {
    margin: 12,
  },
});

export default ScreenTitle;
