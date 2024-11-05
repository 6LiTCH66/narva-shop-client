import React from 'react';
import { Button, Text, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';
import ShoppingCartIcon from '../Icons/ShoppingCartIcon';
import Profile from '../screens/Profile';
import CartScreen from '../screens/CartScreen';
import ResetPassword from '../screens/ResetPassword';
import {DrawerNavigationProp} from "@react-navigation/drawer";

const MyStack = createStackNavigator();

const HomeScreen: React.FC<{ navigation: DrawerNavigationProp<any> }> = ({ navigation }) => {
    return (
        <MyStack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: '#832438',
            },
            headerTintColor: '#fff'
        }}>
            <MyStack.Screen name="Profile" component={Profile} options={{
                headerLeft: () => (
                    <Icon.Button
                        name="menu"
                        size={25}
                        backgroundColor="#832438"
                        onPress={() => navigation.openDrawer()}
                    ></Icon.Button>
                ),
                headerRight: () => (
                    <ShoppingCartIcon/>
                )
            }}/>
            <MyStack.Screen name="Cart" component={CartScreen}/>
            <MyStack.Screen name="ResetPassword" component={ResetPassword}/>
        </MyStack.Navigator>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
});
