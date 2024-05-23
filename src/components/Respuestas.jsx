import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import StyledText from "./StyledText";
import theme from "../theme";
import { useNavigation } from "@react-navigation/native";

function randomNumber() {
  return Math.floor(Math.random() * 400 + 1);
}

// const Item = ({title}) => (
//   <View style={styles.item}>
//     <Text style={styles.title}>{title}</Text>
//   </View>
// );

// const getItem = (_data, index) => {
//   console.log(_data, index);
//   return ({
//   id: Math.random().toString(12).substring(0),
//   title: `Item ${index + 1}`,
// })
// };

// const getItemCount = _data => 4;

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

  Object.entries(pregunta).forEach((key, value) => console.log(key, value));

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
      </ScrollView>

      {Object.entries(pregunta).slice(2,6).map(( [key,value], index) => (
        <Text>
         {key} ---- {value} - {index}
        </Text>
      ))}

      {/* <VirtualizedList
        initialNumToRender={4}
        renderItem={({item}) => <Item title={item.title} />}
        keyExtractor={item => item.id}
        getItemCount={getItemCount}
        getItem={getItem}
      /> */}
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
