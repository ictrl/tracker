import React, { useContext, useState } from "react";
import { NavigationEvents } from "react-navigation";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  FlatList,
} from "react-native";
import { ListItem } from "react-native-elements";
import { Context as TrackContext } from "../context/TrackContext";
import { Entypo } from "@expo/vector-icons";

const TrackListScreen = ({ navigation }) => {
  const { state, fetchTracks } = useContext(TrackContext);
  const [refresh, setRefresh] = useState(false);
  const onRefresh = async () => {
    setRefresh(true);
    const res = await fetchTracks();
    res ? setRefresh(false) : null;
  };

  return (
    <View style={styles.container}>
      <NavigationEvents onWillFocus={fetchTracks} />
      {!state.data.length ? (
        <TouchableOpacity onPress={() => navigation.navigate("TrackCreate")}>
          <Entypo
            style={styles.icon}
            name="add-to-list"
            size={80}
            color="black"
          />
        </TouchableOpacity>
      ) : null}
      <FlatList
        onRefresh={onRefresh}
        refreshing={refresh}
        data={state.data}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("TrackDetail", { id: item._id })}
          >
            <ListItem chevron title={item.name} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

TrackListScreen.navigationOptions = {
  title: "Tracks",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  icon: {
    textAlign: "center",
    marginVertical: 200,
    color: "gray",
  },
});

export default TrackListScreen;
