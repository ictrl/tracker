import React, { useContext, useState } from "react";
import { TextInput, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { Context as TrackContext } from "../context/TrackContext";
import MapView, { Polygon } from "react-native-maps";
import Spacer from "../components/Spacer";
import ShowError from "../components/ShowError";
import { ConfirmDialog } from "react-native-simple-dialogs";

const TrackDetailScreen = ({ navigation }) => {
  const { state, deleteTack, renameTack } = useContext(TrackContext);
  const [popup, setPopup] = useState(false);
  const id = navigation.getParam("id");
  const record = state.data.find((track) => track._id === id);
  const initialCoords = record.locations[0].coords;

  const showPopup = () => {
    setPopup(true);
  };

  return (
    <>
      <ConfirmDialog
        title="Confirm Dialog"
        message="Are you sure you want to delete this record."
        visible={popup}
        onTouchOutside={() => this.setState({ dialogVisible: false })}
        positiveButton={{
          title: "YES",
          onPress: () => {
            setPopup(false);
            return deleteTack(id);
          },
        }}
        negativeButton={{
          title: "NO",
          onPress: () => {
            setPopup(false);
          },
        }}
      />
      <TextInput
        onSubmitEditing={({ nativeEvent }) => renameTack(id, nativeEvent.text)}
        style={{ fontSize: 48 }}
      >
        {" "}
        {record.name}{" "}
      </TextInput>
      <MapView
        style={style.map}
        initialRegion={{
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
          ...initialCoords,
        }}
      >
        <Polygon coordinates={record.locations.map((loc) => loc.coords)} />
      </MapView>
      {state.errMsg ? <ShowError errMsg={state.errMsg} /> : null}
      <Spacer />

      <Spacer>
        <Button
          name="danger"
          buttonStyle={style.deleteButton}
          title="Delete"
          onPress={showPopup}
        />
      </Spacer>
    </>
  );
};

const style = StyleSheet.create({
  map: { height: 450 },
  deleteButton: { backgroundColor: "red" },
});

export default TrackDetailScreen;
