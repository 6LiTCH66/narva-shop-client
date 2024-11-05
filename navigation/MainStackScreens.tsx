import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import ViewProducts from '../screens/ViewProducts';

import HomeScreen from '../screens/HomeScreen';

import CartScreen from '../screens/CartScreen';

const MainStack = createMaterialBottomTabNavigator();

function MainStackScreens() {
    return(
        <MainStack.Navigator
            initialRouteName="Products"
            activeColor="#fff"
            barStyle={{ backgroundColor: '#832438' }}
            inactiveColor={"black"}
            shifting={false}

            >

            <MainStack.Screen
            name="ViewProducts"
            component={ViewProducts}
            options={{
                tabBarLabel: 'Products',
                tabBarIcon: ({ color }) => (
                <Icon name="home" color={color} size={27} />
                ),
            }}
            />



            <MainStack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{
                tabBarLabel: 'Profile',
                tabBarIcon: ({ color }) => (
                <Icon name="person" color={color} size={27}/>
                ),
            }}
            />


            <MainStack.Screen
            name="CartScreen"
            component={CartScreen}
            options={{
                tabBarLabel: 'Cart',
                tabBarIcon: ({ color }) => (
                <Icon name="cart-sharp" color={color} size={27} />
                ),
            }}
            />

        </MainStack.Navigator>
    )
}
export default MainStackScreens;
