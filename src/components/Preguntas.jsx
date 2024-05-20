import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import StyledText from "./StyledText";
import Opcion from "./Opcion";
import StyledButton from "./StyledButton";
import theme from "../theme";
import { getPregunta, getUser, updateStatsUser } from "../database/db";
import { useRoute, useNavigation } from "@react-navigation/native";

function randomNumber() {
  return Math.floor(Math.random() * 400 + 1);
}

const Preguntas = () => {
  const [pregunta, setPregunta] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSelected, setIsSelected] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [user, setUser] = useState(undefined);
  const navigation = useNavigation();

  const {
    params: { preguntaId },
  } = useRoute();

  const add = (key) => {
    setIsSelected(key);
  };

  const press = () => {
    if (!isSelected) return;
    // setIsLoading(true);
    setIsPressed(true);

    if (pregunta.respuesta == isSelected) {
      user.correctas++;
    } else {
      user.fallidas++;
    }
    //pregunta.respuesta == isSelected ? user.correctas++ : user.fallidas++;
    user.porciento = (user.correctas * 100) / (user.correctas + user.fallidas);
    updateStatsUser(user.correctas, user.fallidas, user.porciento);
  };

  const color = (key) => {
    if (key == pregunta.respuesta) return styles.ok;
    if (key != pregunta.respuesta && key == isSelected) return styles.wrong;
    else return styles.white;
  };

  const next = () => {
    let pp = user.random ? randomNumber() : pregunta.id + 1;
    if (pp > 400) pp = 1;

    navigation.navigate("Main", { preguntaId: pp });
  };

  useEffect(() => {
    setIsSelected(false);
    setIsPressed(false);
    getUser(1).then((value) => {
      setUser(value);
    });
    getPregunta(preguntaId).then((value) => {
      setPregunta(value);
      setIsLoading(false);
    });
  }, [preguntaId]);

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
              <Opcion
                llave={"a"}
                opcion={pregunta.a}
                isSelected={isSelected}
                add={add}
                color={color}
                disabled={true}
              />
              <Opcion
                llave={"b"}
                opcion={pregunta.b}
                isSelected={isSelected}
                add={add}
                color={color}
                disabled={true}
              />
              <Opcion
                llave={"c"}
                opcion={pregunta.c}
                isSelected={isSelected}
                add={add}
                color={color}
                disabled={true}
              />
            </>
          ) : (
            <>
              <Opcion
                llave={"a"}
                opcion={pregunta.a}
                isSelected={isSelected}
                add={add}
              />
              <Opcion
                llave={"b"}
                opcion={pregunta.b}
                isSelected={isSelected}
                add={add}
              />
              <Opcion
                llave={"c"}
                opcion={pregunta.c}
                isSelected={isSelected}
                add={add}
              />
            </>
          )}

          {isPressed ? (
            <StyledButton text={"Siguiente"} pressFn={next} />
          ) : (
            <StyledButton text={"Comprobar"} pressFn={press} />
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
