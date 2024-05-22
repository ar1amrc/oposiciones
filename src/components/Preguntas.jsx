import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Text,
} from "react-native";
import StyledText from "./StyledText";
import Opcion from "./Opcion";
import StyledButton from "./StyledButton";
import theme from "../theme";
import { getPregunta, getUser, updateStatsUser } from "../database/db";
import { useRoute, useNavigation } from "@react-navigation/native";

function randomNumber() {
  return Math.floor(Math.random() * 540 + 1);
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
    setIsPressed(true);

    if (pregunta.respuesta == isSelected) {
      user.correctas++;
    } else {
      user.fallidas++;
    }
    user.porciento = (user.correctas * 100) / (user.correctas + user.fallidas);
    updateStatsUser(user.correctas, user.fallidas, user.porciento);
  };

  const color = (key) => {
    if (key == pregunta.respuesta.toUpperCase()) return styles.ok;
    if (key != pregunta.respuesta.toUpperCase() && key.toUpperCase() == isSelected) return styles.wrong;
    else return styles.white;
  };

  const next = () => {
    let pp = user.random ? randomNumber() : pregunta.id + 1;
    if (pp > 540) pp = 1;
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
              {Object.entries(pregunta)
                .slice(2, 6)
                .map(([keys, value], index) => (
                  <Opcion
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
