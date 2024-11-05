import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, FlatList, Dimensions, ImageBackground, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import {getAllProducts} from "../http/productAPI";

const Products: React.FC<{ navigation: any }> = ({ navigation }) => {
    const [products, setProducts] = useState<any[]>([]);

    const [userCart, setUserCart] = useState<any[]>([]);

    useEffect(() => {
        getAllProducts().then((products) => {
            setProducts(products);
        })
        // setProducts([
        //     { id: 1, name: 'Carhartt J141 Relaxed Fit Washed Duck Sherpa-Lined Jacket', price: 49.99, quantity: 10, description: 'Stylish blue denim jacket with a comfortable fit.', image: 'https://gemplers.com/cdn/shop/products/104392-Carhartt-Brown_800x800.jpg?v=1707787937' },
        //     { id: 2, name: 'Red Cotton T-shirt', price: 19.99, quantity: 25, description: '100% cotton t-shirt in a bright red color.100% cotton t-shirt in a bright red color.100% cotton t-shirt in a bright red color.100% cotton t-shirt in a bright red color.100% cotton t-shirt in a bright red color.100% cotton t-shirt in a bright red color.', image: 'https://gemplers.com/cdn/shop/products/104392-Carhartt-Brown_800x800.jpg?v=1707787937' },
        //     { id: 3, name: 'Black Leather Boots', price: 89.99, quantity: 5, description: 'Classic black leather boots for all occasions.', image: 'https://gemplers.com/cdn/shop/products/104392-Carhartt-Brown_800x800.jpg?v=1707787937' },
        //     { id: 4, name: 'Green Hoodie', price: 35.99, quantity: 15, description: 'Warm green hoodie, perfect for colder days.', image: 'https://gemplers.com/cdn/shop/products/104392-Carhartt-Brown_800x800.jpg?v=1707787937' },
        //     { id: 5, name: 'White Sneakers', price: 59.99, quantity: 20, description: 'Comfortable and trendy white sneakers.', image: 'https://gemplers.com/cdn/shop/products/104392-Carhartt-Brown_800x800.jpg?v=1707787937' },
        //     { id: 6, name: 'Grey Sweatpants', price: 29.99, quantity: 30, description: 'Relaxed fit sweatpants in grey, perfect for lounging.', image: 'https://gemplers.com/cdn/shop/products/104392-Carhartt-Brown_800x800.jpg?v=1707787937' },
        //     { id: 7, name: 'Black Leather Jacket', price: 120.00, quantity: 8, description: 'Premium black leather jacket with a sleek look.', image: 'https://gemplers.com/cdn/shop/products/104392-Carhartt-Brown_800x800.jpg?v=1707787937' },
        //     { id: 8, name: 'Blue Skinny Jeans', price: 39.99, quantity: 18, description: 'Fitted blue skinny jeans for a modern style.', image: 'https://gemplers.com/cdn/shop/products/104392-Carhartt-Brown_800x800.jpg?v=1707787937' },
        //     { id: 9, name: 'Yellow Summer Dress', price: 45.99, quantity: 12, description: 'Flowy yellow dress, perfect for the summer season.', image: 'https://gemplers.com/cdn/shop/products/104392-Carhartt-Brown_800x800.jpg?v=1707787937' },
        //     { id: 10, name: 'Wool Beanie', price: 14.99, quantity: 50, description: 'Warm wool beanie to keep you cozy during winter.', image: 'https://gemplers.com/cdn/shop/products/104392-Carhartt-Brown_800x800.jpg?v=1707787937' }
        // ])

    }, []);

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
