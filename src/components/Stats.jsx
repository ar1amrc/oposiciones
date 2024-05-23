import React, { useContext} from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import StyledText from "../components/StyledText";
import { UserContext } from "../context/user";

function Stats() {
  const { state: user, resetStatsUser } = useContext(UserContext);

  const resetStats = () => {
    resetStatsUser();
  };

  return (
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
      <Pressable
        onPress={resetStats}
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? "rgb(210, 230, 255)" : "#FAE5D3",
            borderRadius: 33,
          },
        ]}
      >
        <StyledText> Reset </StyledText>
      </Pressable>
    </View>
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
});
export default Stats;
