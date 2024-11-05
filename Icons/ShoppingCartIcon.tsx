import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import {getUserCart, useUserCart} from "../http/cartAPI";

const ShoppingCartIcon: React.FC = () => {

    const { data: cart, isLoading, isError, error } = useUserCart();


    return (
        <View style={{ padding: 5 }}>
            <View style={styles.iconStyle}>
                <Text style={{ color: 'white', fontWeight: 'bold' }}>{cart?.cartItems?.length}</Text>
            </View>
            <Icon name="cart" size={30} />
        </View>
    );
};

export default ShoppingCartIcon;

const styles = StyleSheet.create({
    iconStyle: {
        position: 'absolute',
        height: 30,
        width: 30,
        borderRadius: 15,
        backgroundColor: 'rgba(95, 197, 123,0.8)',
        justifyContent: 'center',
        alignItems: 'center',
        right: 15,
        bottom: 15,
        zIndex: 2000,
    },
});
