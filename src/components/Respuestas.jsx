import React, { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import StyledText from "./StyledText";
import theme from "../theme";
import { useNavigation } from "@react-navigation/native";

function randomNumber() {
  return Math.floor(Math.random() * 400 + 1);
}

const Respuestas = ({ pregunta, selected, random }) => {
  const navigation = useNavigation();

  const color = (key) => {
    if (key == pregunta.respuesta) return styles.ok;
    if (key != pregunta.respuesta && key == selected) return styles.wrong;
    else return styles.white;
  };

  const next = () => {
    let pp = random ? randomNumber() : pregunta.id + 1;
    if (pp > 400) pp = 1;

    navigation.navigate("Main", { preguntaId: pp });
  };

  return (
    <View style={styles.margin} key={pregunta.id}>
      <ScrollView
        style={{ marginVertical: 10 }}
        showsVerticalScrollIndicator={false}
      >
        <StyledText
          color="blue"
          fontSize="title"
          fontWeight="bold"
          style={styles.pregunta}
        >
          {pregunta.pregunta}
        </StyledText>

        <View style={[styles.container, color("a")]}>
          <StyledText style={[styles.texto]}>{"a. " + pregunta.a}</StyledText>
        </View>
        <View style={[styles.container, color("b")]}>
          <StyledText style={styles.texto}>{"b. " + pregunta.b}</StyledText>
        </View>
        <View style={[styles.container, color("c")]}>
          <StyledText style={styles.texto}>{"c. " + pregunta.c}</StyledText>
        </View>
        <View style={styles.fixToText}>
          <Pressable
            onPress={next}
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? "rgb(210, 230, 255)" : "white",
              },
              styles.wrapperCustom,
            ]}
          >
            <StyledText
              color="blue"
              fontSize="subheading"
              fontWeight="bold"
              style={styles.pregunta}
            >
              Siguiente
            </StyledText>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 14,
    borderRadius: 21,
    marginBottom: 10,
  },
  margin: {
    marginHorizontal: 25,
  },
  pregunta: {
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
  wrapperCustom: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "black",
    padding: 6,
    backgroundColor: "#FAE5D3",
  },
  fixToText: {
    flexDirection: "row",
    justifyContent: "center",
  },
});

export default Respuestas;