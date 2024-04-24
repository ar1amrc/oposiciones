import React, { useLayoutEffect } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native"
import Preguntas from "../components/Preguntas"
import { useNavigation, useRoute } from "@react-navigation/native";
import { SimpleLineIcons, Ionicons } from '@expo/vector-icons'


const Main = () => {
    const navigation = useNavigation();
    const { params: { preguntaId } } = useRoute()

    useLayoutEffect(() => {
        let pp =  preguntaId > 399 ? 1 : preguntaId + 1;
        navigation.setOptions({
            headerLeft: () => (
                <Pressable onPress={() => navigation.navigate('Settings')} style={styles.header}>
                    <SimpleLineIcons name="settings" size={24} color="black"></SimpleLineIcons>
                </Pressable>
            ),

            headerRight: () => (

                <Pressable onPress={() => navigation.navigate('Main', { preguntaId: pp})} style={styles.header}>
                    <Ionicons name="chevron-forward" size={24} color="black"></Ionicons>
                    {/* <Text>hoola</Text> */}
                </Pressable>
            ),
            headerTitle: 'Pregunta #' + preguntaId
        })
    }, [preguntaId])

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.container} >
                <Preguntas />
            </ScrollView>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAE5D3',
        justifyContent: 'center',

    },
    header: {
        marginHorizontal: 15
    }
});

export default Main