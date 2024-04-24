import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Main from '../screens/Main';
import Settings from '../screens/Settings';

const Stack = createNativeStackNavigator();

const Navigation = () => {
    return <NavigationContainer>
        <Stack.Navigator initialRouteName="Main" screenOptions={{
            headerStyle: { backgroundColor: '#FAE5D3' },
            headerTitleAlign: 'center',
            headerTitleStyle: { fontWeight: 'bold', fontSize: 24 }
        }}>
            <Stack.Screen component={Main} name='Main' initialParams={{ preguntaId: 1 }} />
            <Stack.Screen component={Settings} name='Settings' options={{
                presentation: "modal",
                headerTitle: "Settings",
                headerShown: true,
            }} />
        </Stack.Navigator>
    </NavigationContainer>
}

export default Navigation