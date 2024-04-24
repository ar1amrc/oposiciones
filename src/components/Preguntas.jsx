import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  FlatList,
  Pressable,
  ScrollView,
} from "react-native";
import StyledText from "./StyledText";
import Respuestas from "./Respuestas";
import { getPregunta, getUser, updateStatsUser } from "../database/db";
import theme from "../theme";
import { useRoute } from "@react-navigation/native";

const Preguntas = () => {
  const [pregunta, setPregunta] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSelected, setIsSelected] = useState(false);
  const [correcta, setCorrecta] = useState(false);
  const [user, setUser] = useState(undefined);

  const {
    params: { preguntaId },
  } = useRoute();

  const add = (key) => {
    setIsSelected(key);
  };

  const press = () => {
    if (!isSelected) return;
    setIsLoading(true);
    setCorrecta(true);

    pregunta.respuesta == isSelected ? user.correctas++ : user.fallidas++;
    user.porciento = (user.correctas * 100) / (user.correctas + user.fallidas);
    updateStatsUser(user.correctas, user.fallidas, user.porciento);
  };

  useEffect(() => {
    setIsSelected(false);
    setCorrecta(false);
    getUser(1).then((value) => {
      setUser(value);
    });
    getPregunta(preguntaId).then((value) => {
      setPregunta(value);
      setIsLoading(false);
    });
  }, [preguntaId]);

  if (correcta) {
    return (
      <Respuestas
        pregunta={pregunta}
        selected={isSelected}
        random={user.random}
      />
    );
  }

  if (isLoading) {
    return (
      <View style={styles.margin}>
        <StyledText fontSize="title" fontWeight="bold" style={styles.pregunta}>
          Cargando...
        </StyledText>
      </View>
    );
  }

  return (
    <View style={styles.margin} key={pregunta.id}>
      <ScrollView
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

        <Pressable
          key="a"
          onPress={() => add("a")}
          style={[
            styles.container,
            isSelected == "a" ? styles.selected : styles.white,
          ]}
        >
          <StyledText style={styles.texto}>{"a. " + pregunta.a}</StyledText>
        </Pressable>

        <Pressable
          key="b"
          onPress={() => add("b")}
          style={[
            styles.container,
            isSelected == "b" ? styles.selected : styles.white,
          ]}
        >
          <StyledText style={styles.texto}>{"b. " + pregunta.b}</StyledText>
        </Pressable>

        <Pressable
          key="c"
          onPress={() => add("c")}
          style={[
            styles.container,
            isSelected == "c" ? styles.selected : styles.white,
          ]}
        >
          <StyledText style={styles.texto}>{"c. " + pregunta.c}</StyledText>
        </Pressable>

        <View style={styles.fixToText}>
          <Pressable
            onPress={press}
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? "rgb(210, 230, 255)" : "white",
              },
              styles.wrapperCustom,
            ]}
          >
            <StyledText
              fontSize="subheading"
              fontWeight="bold"
              style={styles.pregunta}
            >
              Comprobar
            </StyledText>
          </Pressable>
        </View>
      </ScrollView>
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
