import React, {useCallback, useEffect, useState} from 'react';
import { View, StyleSheet, Text, FlatList, Dimensions, ImageBackground, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import {getAllProducts} from "../http/productAPI";
import {useFocusEffect} from "@react-navigation/native";

const Products: React.FC<{ navigation: any }> = ({ navigation }) => {
    const [products, setProducts] = useState<any[]>([]);

    const [userCart, setUserCart] = useState<any[]>([]);

    useFocusEffect(
        useCallback(() => {
            getAllProducts().then((products) => {
                setProducts(products);
            });
        }, [])
    );

    // useEffect(() => {
    //     getAllProducts().then((products) => {
    //         setProducts(products);
    //     })
    //
    //
    // }, []);

    const renderItemFooter = (info: any) => (
        <View style={styles.itemFooter}>
            <Text style={{fontWeight: "bold"}}>From ${info.price}</Text>

        </View>
    );

    return (
        <View>
            <FlatList
                numColumns={2}
                keyExtractor={(item) => item.id}
                data={products}
                style={styles.productList}
                renderItem={({ item }) => (
                    <Card style={styles.productItem} onPress={() => navigation.navigate('ProductDetail', { data: item })}>
                        <ImageBackground style={styles.itemHeader} source={{ uri: item.image }}/>
                        <View style={styles.itemContent}>
                            <Text>{item.name}</Text>
                        </View>
                        {renderItemFooter(item)}
                    </Card>
                )}
            />
        </View>
    );
};

export default Products;

const styles = StyleSheet.create({
    productItem: {
        flex: 1,
        margin: 8,
        maxWidth: Dimensions.get("window").width / 2 - 24,
    },
    productList: {
        paddingHorizontal: 8,
        paddingVertical: 5,
    },
    itemFooter: {
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 10,
        paddingBottom: 10,
        marginBottom: 20,
    },
    iconButton: {
        paddingHorizontal: 0,
    },
    itemHeader: {
        height: 200,
        resizeMode: "contain",
        borderRadius: 10,
        overflow: 'hidden'
    },
    itemContent: {
        borderColor: '#E5E3DD',
        paddingBottom: 10,
        paddingLeft: 10,
        paddingTop: 10,
    },
});
