import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, FlatList, Dimensions, ImageBackground, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Icon2 from 'react-native-vector-icons/Entypo';

import CounterInput from "react-native-counter-input";
import {
    ICart,
    getUserCart,
    deleteProductFromCart,
    useDeleteFromCart,
    useUserCart,
    CartItem,
    useEditProductInCart, EditProduct, Operation
} from "../http/cartAPI";
import {Product} from "../http/productAPI";
import {useNavigation} from "@react-navigation/native";
import CounterIcon from "../Icons/CounterIcon";


const Cart: React.FC = () => {
    const { data: products, isLoading, isError, error } = useUserCart();

    const [operation, setOperation] = useState<Operation | null>(null)


    const deleteFromCart = useDeleteFromCart();

    const editProductInCart = useEditProductInCart()


    const increaseItem = (editItem: EditProduct) => {
        // fire.ref('cart/' + auth.currentUser.uid + "/products/" + info.productId).update({
        //     quantity: info.quantity += 1,
        // });
    };

    const decreaseItem = (editItem: EditProduct) => {
        // if (info.quantity > 1) {
        //     fire.ref('cart/' + auth.currentUser.uid + "/products/" + info.productId).update({
        //         quantity: info.quantity -= 1,
        //     });
        // }
    };

    const editItem = (info: any) => {
        console.log(info)
    }

    const deleteItem = (productId: number) => {
        deleteFromCart.mutate(productId)

    };

    const renderItemHeader = (info: any) => (
        <TouchableOpacity onPress={() => alert("On image press")} style={styles.itemHeader}>
            <ImageBackground style={styles.image} source={{ uri: info.image }} />
        </TouchableOpacity>

    );

    const renderRightSide = (info: CartItem) => (
        <View style={styles.renderRight}>
            <Text style={styles.titleText}>{info.product.name}</Text>

            <View style={{ marginBottom: 10}}>
                <Text style={{ marginBottom: 0 }}>Price:
                    <Text style={{fontWeight: "bold"}}> ${info.product.price}</Text>
                </Text>

                <Text style={styles.sizeText}>Size:
                    <Text style={{fontWeight: "bold"}}> {info.size}</Text>
                </Text>


                <Text style={styles.quantityText}>Quantity:
                    <Text style={{fontWeight: "bold"}}> {info.quantity}</Text>
                </Text>
            </View>


        </View>
    );

    if ((products?.cartItems && products.cartItems.length > 0)) {
        return (
            <View>
                <FlatList
                    numColumns={1}
                    data={products.cartItems}

                    keyExtractor={(item, index) => item.id.toString()}
                    style={styles.productList}
                    renderItem={({ item, index }) => (
                        <Card style={styles.productItem}>
                            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                                {renderItemHeader(item.product)}
                                {renderRightSide(item)}
                                <CounterIcon item={item} key={index}/>



                                <View style={styles.renderLeft}>

                                    <TouchableOpacity onPress={() => deleteItem(item.id)}>
                                        <Icon name="highlight-remove" size={35} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Card>
                    )}
                />
            </View>
        );
    } else {
        return <Text style={styles.noItems}>There are currently no items in your cart!</Text>;
    }
};

export default Cart;

const styles = StyleSheet.create({
    // itemQuantity: {
    //     // backgroundColor: "red",
    //     justifyContent: "center",
    //     gap: 17
    // },
    // itemQuantityText: {
    //     alignSelf: 'center',
    //     fontSize: 20,
    //     fontWeight: "bold"
    // },
    // itemQuantityBtn: {
    //     backgroundColor: "green",
    //
    //     borderRadius: 10,
    //     padding: 1
    // },
    // itemQuantityBtnPress: {
    //     backgroundColor: "#832438",
    // },
    // itemQuantityBtnDefault: {
    //     backgroundColor: "transparent",
    // },
    sizeText: {

    },
    quantityText: {

    },
    productItem: { flex: 1, margin: 8, maxWidth: Dimensions.get("window").width, backgroundColor: '#fff' },
    productList: { paddingHorizontal: 8, paddingVertical: 5, height: '100%' },
    itemHeader: {
        alignSelf: "center",
        overflow: 'hidden',
        borderRadius: 12,
        height: 150,
        resizeMode: "contain",
        width: 170,
        flex: 1,
        // marginRight: 5,

    },
    renderRight: {
        flexDirection: "column",
        // flexGrow: 1,
        flex: 1,

    },
    image: {
        height: 150,
        resizeMode: "contain",
    },
    titleText: { fontSize: 15, fontWeight: 'bold', paddingBottom: 10 },
    bottomItems: { flexDirection: 'row', width: '50%', alignItems: 'center', position: 'absolute', bottom: 0, justifyContent: 'space-between' },
    iconRight: { color: 'red' },
    iconLeft: { color: 'green' },
    textNumber: { fontWeight: 'bold', textAlign: 'center' },
    renderLeft: {
        justifyContent: "center",
        marginLeft: 10
        // flex: 1,
        // position: 'absolute',
        // right: 0,
        // marginRight: 10,
        // marginTop: 75,
        // backgroundColor: "red"
    },
    descText: { width: 110, fontSize: 11, fontWeight: '400', color: "#888", textAlign: 'left', marginLeft: 7 },
    noItems: { textAlign: 'center', fontWeight: 'bold', fontSize: 30, marginTop: Dimensions.get("window").height / 3 },
});
