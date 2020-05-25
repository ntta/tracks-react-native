import React, { useContext, useEffect } from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { ListItem } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";

import { Context as TrackContext } from "../context/TrackContext";
import ScreenTitle from "../components/ScreenTitle";

const TrackListScreen = ({ navigation }) => {
  const { state, fetchTracks } = useContext(TrackContext);

  useEffect(() => {
    return navigation.addListener("focus", fetchTracks);
  }, [navigation]);

  return (
    <SafeAreaView>
      <ScreenTitle text="Track List" />
      <FlatList
        data={state}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("TrackDetail", { _id: item._id })
              }
            >
              <ListItem chevron title={item.name} />
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default TrackListScreen;
