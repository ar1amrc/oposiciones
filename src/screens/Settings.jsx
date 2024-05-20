import React, { useEffect, useState } from "react";
import {
    Alert,
  Image,
  Pressable,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getUser, updateNameUser, updateRandomUser } from "../database/db";
import { Feather, Ionicons } from "@expo/vector-icons";
import StyledText from "../components/StyledText";

const Settings = () => {
  const [user, setUser] = useState(undefined);
  const [currentName, setCurrentName] = useState(" ");
  const [edit, setEdit] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    async function fetchUser() {
      const userf = await getUser(1);
      setUser(userf);
      setCurrentName(userf.nombre);
      setIsEnabled(userf.random == 1 ? true : false);
    }
    fetchUser();
  }, []);

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

    if (page > 400)
        Alert.alert('Pregunta inválida', 'Solo existen 400 preguntas')
    else
     navigation.navigate("Main", { preguntaId: page });
  };

  if (user)
    return (
      <View style={styles.container}>
        <View style={styles.margin}>
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
              onPress={(event) =>
                navigation.navigate("Main", { preguntaId: 3 })
              }
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

          <View style={[styles.nombre, { marginTop: 50 }]}>
            <View style={{ alignItems: "center" }}>
              <Text style={{ marginBottom: 5 }}>{user.correctas}</Text>
              <StyledText fontSize="subheading" fontWeight="bold">
                Correctas
              </StyledText>
            </View>
            <View style={{ alignItems: "center" }}>
              <Text style={{ marginBottom: 5 }}>{user.fallidas}</Text>
              <StyledText fontSize="subheading" fontWeight="bold">
                Incorrectas
              </StyledText>
            </View>
            <View style={{ alignItems: "center" }}>
              <Text style={{ marginBottom: 5 }}>
                {Number(user.porciento).toFixed(2)}
              </Text>
              <StyledText fontSize="subheading" fontWeight="bold">
                % aciertos
              </StyledText>
            </View>
          </View>
        </View>
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAE5D3",
    justifyContent: "center",
  },
  margin: {
    marginHorizontal: 25,
  },
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

export default Settings;
