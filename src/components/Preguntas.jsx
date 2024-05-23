import React, { useContext, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Vibration,
  ToastAndroid,
} from "react-native";
import StyledText from "./StyledText";
import Opcion from "./Opcion";
import StyledButton from "./StyledButton";
import theme from "../theme";
import { getPregunta } from "../database/db";
import { useRoute, useNavigation } from "@react-navigation/native";
import { UserContext } from "../context/user";
import { badText, goodText, randomNumber, random_text } from "../utils";

const initialState = { isLoading: true, isPressed: false, isSelected: false };

const Preguntas = () => {
  const [pregunta, setPregunta] = useState(null);
  const [states, setStates] = useState(initialState);
  const { state: user, updateStatsUser } = useContext(UserContext);
  const navigation = useNavigation();

  const { isLoading, isSelected, isPressed } = states;
  const {
    params: { preguntaId },
  } = useRoute();

  useEffect(() => {
    getPregunta(preguntaId).then((value) => {
      setPregunta(value);
      const newState = {
        isLoading: false,
        isPressed: false,
        isSelected: false,
      };
      setStates(newState);
    });
  }, [preguntaId]);

  const add = (key) => {
    const newState = { ...states, isSelected: key };
    setStates(newState);
  };

  const press = () => {
    if (!isSelected) return;
    const newState = { ...states, isPressed: true };
    setStates(newState);
    const correcta = pregunta.respuesta == isSelected

    if(user.notificaciones)
      correcta ? ToastAndroid.showWithGravity(
        random_text(goodText),
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      ) : ToastAndroid.showWithGravity(
        random_text(badText),
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
    if(user.vibraciones) 
      correcta ? Vibration.vibrate([200, 100, 200]) : Vibration.vibrate(500);
      
    updateStatsUser(correcta);
  };

  const color = (key) => {
    if (key == pregunta.respuesta.toUpperCase()) return styles.ok;
    if (
      key != pregunta.respuesta.toUpperCase() &&
      key.toUpperCase() == isSelected
    )
      return styles.wrong;
    else return styles.white;
  };

  const next = () => {
    let pp = user.random ? randomNumber() : pregunta.id + 1;
    if (pp > 540) pp = 1;
    navigation.navigate("Main", { preguntaId: pp });
  };

  return (
    <View style={styles.margin}>
      {isLoading ? (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <ScrollView
          key={pregunta.id}
          style={{ marginVertical: 10 }}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ marginBottom: 8 }}>
            <StyledText
              fontSize="title"
              fontWeight="bold"
              style={styles.pregunta}
            >
              {pregunta.pregunta}
            </StyledText>
          </View>
          {isPressed ? (
            <>
              {Object.entries(pregunta)
                .slice(2, 6)
                .map(([keys, value], index) => (
                  <Opcion
                    key={index}
                    llave={keys.toUpperCase()}
                    opcion={value}
                    isSelected={isSelected}
                    add={add}
                    color={color}
                    disabled={true}
                  />
                ))}

              <StyledButton text={"Siguiente"} pressFn={next} />
            </>
          ) : (
            <>
              {Object.entries(pregunta)
                .slice(2, 6)
                .map(([keys, value], index) => (
                  <Opcion
                    key={index}
                    llave={keys.toUpperCase()}
                    opcion={value}
                    isSelected={isSelected}
                    add={add}
                  />
                ))}
              <StyledButton text={"Comprobar"} pressFn={press} />
            </>
          )}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  margin: {
    marginHorizontal: 25,
  },
  pregunta: {
    marginBottom: 10,
  },
  fixToText: {
    flexDirection: "row",
    justifyContent: "center",
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 14,
    borderRadius: 21,
    marginBottom: 10,
  },
  texto: {
    paddingHorizontal: 10,
  },
  white: {
    backgroundColor: theme.colors.lightWhite,
  },
  wrong: {
    backgroundColor: theme.colors.wrong,
  },
  ok: {
    backgroundColor: theme.colors.ok,
  },
  selected: {
    backgroundColor: "#5DADE2",
  },
  wrapperCustom: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "black",
    padding: 6,
    backgroundColor: "#FAE5D3",
  },
});

export default Preguntas;
