import React, { useCallback, useEffect, useState } from 'react';
import Navigation from './src/wrappers/Navigation';
import { createDatabase } from './src/database/db';
import { StyleSheet, View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { Provider } from './src/context/user';

export default function App() {

    const [appIsReady, setAppIsReady] = useState(false);

    useEffect(() => {
      async function prepare() {
        try {
          await createDatabase();
        } catch (e) {
          warn.log(e);
        } finally {
          // Tell the application to render
          setAppIsReady(true);
          await SplashScreen.hideAsync();
        }
      }
  
      prepare();
    }, []);
  
    if (!appIsReady) {
      return null;
    }


    // const [isLoading, setIsLoading] = useState(true)

    // useEffect(() => {
    //     createDatabase().then(() => {
    //         console.log('Base de datos cargada');
    //         setIsLoading(false)
    //     });
    // }, []);

    // if (isLoading) {
    //     return (
    //         <View style={styles.co}>
    //             <StyledText color='blue' fontSize='title' fontWeight='bold' style={styles.pregunta}>Iniciando datos...</StyledText>
    //         </View>
    //     )
    // } 

    return  <Provider><Navigation /></Provider>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAE5D3',
        justifyContent: 'center',
        alignItems: 'center'
    },
});