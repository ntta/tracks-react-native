//import '../_mockLocation';
import React, { useEffect, useState, useContext, useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import { requestPermissionsAsync, watchPositionAsync, Accuracy } from 'expo-location';
import { withNavigationFocus } from '@react-navigation/compat';

import ScreenTitle from '../components/ScreenTitle';
import Map from '../components/Map';
import TrackForm from '../components/TrackForm';
import { Context as LocationContext } from '../context/LocationContext';
import useLocation from '../hooks/useLocation';

const TrackCreateScreen = ({ isFocused }) => {
  const { state: { recording }, addLocation } = useContext(LocationContext);
  const callback = useCallback(location => {
    addLocation(location, recording);
  }, [recording]);
  const [err] = useLocation(isFocused || recording, callback);

  return (
    <SafeAreaView>
      <ScreenTitle text='Create a Track' />
      <Map />
      {err ? <Text h4 style={styles.errMsg}>{err}</Text> : null}
      <TrackForm />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  errMsg: {
    marginTop: 20,
    alignSelf: 'center',
    color: 'red',
  },
});

export default withNavigationFocus(TrackCreateScreen);
