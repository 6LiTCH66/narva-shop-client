import React, { Component, useState, useEffect } from 'react'
import { StyleSheet } from 'react-native'
//import { Divider, Drawer, DrawerItem } from "@ui-kitten/components";
import { createDrawerNavigator } from "@react-navigation/drawer";

// import {authStateChange} from '../components/Firebase/firebase';

import DrawerContent from '../navigation/DrawerContent';

import MainStackScreens from '../navigation/MainStackScreens';
import AuthStackScreens from '../navigation/AuthStackScreens';
import {getMe} from "../http/userAPI";


const Drawer = createDrawerNavigator();

const DrawerNavigation = ( props: any, navigation: any ) =>{
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();


    useEffect(() => {

        getMe().then((user) => {

            setUser(user);

        }).catch(_err => {})

    }, []);



    return(

        <Drawer.Navigator drawerContent={props => <DrawerContent{...props}/>}>

            {!user ? (
                <Drawer.Screen name="Auth" component={AuthStackScreens} options={{headerShown: false}}/>
            ):(
                <Drawer.Screen name="Home" component={MainStackScreens} options={{headerShown: false}}/>
            )}

        </Drawer.Navigator>
    )
}

const styles = StyleSheet.create({
    header: {
        height: 250,
        flexDirection: "row",
        alignItems: "center",
    },
});

export default DrawerNavigation
