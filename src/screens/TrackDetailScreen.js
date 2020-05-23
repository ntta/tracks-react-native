import React, { useContext } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Text } from 'react-native-elements';
import { Context as TrackContext} from '../context/TrackContext';
import MapView, { Polyline } from 'react-native-maps';

const TrackDetailScreen = ({ route }) => {
  const { state } = useContext(TrackContext);
  const _id = route.params._id;

  const track = state.find(t=> t._id === _id);
  const initialCoords = track.locations[0].coords;

  return (
    <>
      <MapView
        style={styles.map}
        initialRegion={{
          longitudeDelta: 0.01,
          latitudeDelta: 0.01,
          ...initialCoords
        }}
      >
        <Polyline
          coordinates={track.locations.map(loc => loc.coords)}
          strokeWidth={4}
        />
      </MapView>
      <Text h3 style={styles.name}>{track.name}</Text>
    </>
  );
};

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 2.5,
  },
  name: {
    marginTop: 15,
    alignSelf: 'center',
  },
});

export default TrackDetailScreen;
