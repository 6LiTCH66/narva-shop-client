import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Icon2 from "react-native-vector-icons/Entypo";
import React, {useEffect, useState} from "react";
import {CartItem, EditProduct, Operation, useEditProductInCart} from "../http/cartAPI";

interface CounterIconProps{
    item: CartItem
}

const CounterIcon = (counterIconProps: CounterIconProps) => {
    const [operation, setOperation] = useState<Operation>("increase")
    const [counter, setCounter] = useState<number>(1)

    const editProductInCart = useEditProductInCart()

    useEffect(() => {
        setCounter(counterIconProps.item.quantity)
    }, [counterIconProps.item.quantity]);


    const onIncreasePress = () => {

        setOperation("increase")

        if (counterIconProps.item.product.quantity >= 1){
            // setCounter((prevCounter) => prevCounter + 1)

            const editedProduct: EditProduct = {
                id: counterIconProps.item.id,
                quantity: 1,
                operation: "increase"

            }

            editProductInCart.mutate(editedProduct)
        }

    }

    const onDecreasePress = () => {

        setOperation("decrease")

        if (counter > 1){
            setCounter((prevCounter) => prevCounter - 1)

            const editedProduct: EditProduct = {
                id: counterIconProps.item.id,
                quantity: 1,
                operation: "decrease"
            }

            editProductInCart.mutate(editedProduct)
        }
    }
    return (
        <View style={styles.itemQuantity}>

            <TouchableOpacity style={[styles.itemQuantityBtn, operation === "decrease" ? styles.itemQuantityBtnPress : styles.itemQuantityBtnDefault]} onPress={onDecreasePress}>

                <Icon2 name="minus" size={30} color={operation === "decrease" ? "#fff" : "black"}/>

            </TouchableOpacity>

            <Text style={styles.itemQuantityText}>{counter}</Text>

            <TouchableOpacity style={[styles.itemQuantityBtn, operation === "increase" ? styles.itemQuantityBtnPress : styles.itemQuantityBtnDefault]} onPress={onIncreasePress}>

                <Icon2 name="plus" size={30} color={operation === "increase" ? "#fff" : "black"} />

            </TouchableOpacity>
        </View>
    )
}

export default CounterIcon;


const styles = StyleSheet.create({
    itemQuantity: {
        // backgroundColor: "red",
        justifyContent: "center",
        gap: 17
    },
    itemQuantityText: {
        alignSelf: 'center',
        fontSize: 20,
        fontWeight: "bold"
    },
    itemQuantityBtn: {
        backgroundColor: "green",

        borderRadius: 10,
        padding: 1
    },
    itemQuantityBtnPress: {
        backgroundColor: "#832438",
    },
    itemQuantityBtnDefault: {
        backgroundColor: "transparent",
    }
});
