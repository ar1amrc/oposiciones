import React, { useContext, useState } from "react";
import {
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import StyledText from "../components/StyledText";
import { UserContext } from "../context/user";

function SettingsMain() {
  const {
    state: user,
    updateRandomUser,
    updateNameUser,
  } = useContext(UserContext);
  const [currentName, setCurrentName] = useState(user.nombre);
  const [edit, setEdit] = useState(false);
  const [isEnabled, setIsEnabled] = useState(user.random == 1 ? true : false);

  const navigation = useNavigation();

  const toggleSwitch = () => {
    updateRandomUser(!isEnabled ? 1 : 0);
    setIsEnabled((previousState) => !previousState);
  };

  const update = () => {
    updateNameUser(currentName);
    setEdit(!edit);
  };

  const navigate = (event) => {
    const page = Number(event.replace(/\D/gm, ""));

    if (page > 540)
      Alert.alert("Pregunta inválida", "Solo existen 400 preguntas");
    else navigation.navigate("Main", { preguntaId: page });
  };

  return (
    <>
      <View style={{ alignItems: "center", marginBottom: 50 }}>
        <Image
          source={require("../../assets/istockphoto.jpeg")}
          style={{ width: 100, height: 100, borderRadius: 100 }}
        />
      </View>
      {edit ? (
        <View style={styles.nombre}>
          <TextInput
            value={currentName}
            placeholder="Usuario"
            onChangeText={setCurrentName}
            onEndEditing={update}
            style={styles.textInput}
          />
          <Pressable onPress={() => update()}>
            <Feather name="send" size={24} color="black"></Feather>
          </Pressable>
        </View>
      ) : (
        <View style={styles.nombre}>
          <Text> {currentName}</Text>
          <Pressable onPress={() => setEdit(!edit)}>
            <Feather name="edit-2" size={24} color="black"></Feather>
          </Pressable>
        </View>
      )}

      <View style={styles.nombre}>
        <StyledText fontSize="subheading" fontWeight="bold">
          Orden Aleatorio
        </StyledText>
        <Switch onValueChange={toggleSwitch} value={isEnabled}></Switch>
      </View>
      <View style={styles.nombre}>
        <StyledText
          fontSize="subheading"
          fontWeight="bold"
          color="blue"
          onPress={(event) => navigation.navigate("Main", { preguntaId: 3 })}
        >
          Ir a pregunta:
        </StyledText>

        <TextInput
          placeholder="No."
          keyboardType="numeric"
          maxLength={3}
          onEndEditing={(event) => navigate(event.nativeEvent.text)}
          style={{
            width: 40,
            borderRadius: 100,
            textAlign: "center",
            borderWidth: 1,
            borderColor: "black",
          }}
        />
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  nombre: {
    flexDirection: "row",
    // flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  textInput: {
    borderRadius: 2,
    borderWidth: 1,
    borderColor: "gray",
  },
});
export default SettingsMain;
