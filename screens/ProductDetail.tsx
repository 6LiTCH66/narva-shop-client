import React, {useEffect, useState} from 'react';
import {
    View,
    ImageBackground,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    Dimensions,
    FlatList,
    Animated
} from 'react-native';
import CounterInput from "react-native-counter-input";
import ScrollView = Animated.ScrollView;
import {NewCartItem, useAddToCart} from "../http/cartAPI";

interface ProductDetailProps {
    route: {
        params: {
            data: {
                id: number;
                name: string;
                price: number;
                description: string;
                image: string;
                quantity: number;
                size: string[]
            };
        };
    };
}

const ProductDetail: React.FC<ProductDetailProps> = ({ route }) => {

    const sizeOrder = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];
    const [selectedSize, setSelectedSize] = useState<string>("");
    const [productQuantity, setProductQuantity] = useState<number>(1);

    const addProductToCart = useAddToCart()

    const { data } = route.params;

    useEffect(() => {
        data.size.sort((a, b) => sizeOrder.indexOf(a) - sizeOrder.indexOf(b));
        setSelectedSize(data.size[0])

    }, [data]);


    const addToCart = (newCartItem: NewCartItem) => {
        addProductToCart.mutate(newCartItem)
    }


    const renderHeader = (info: typeof data) => (
        <ScrollView style={styles.header}>
            <ImageBackground style={styles.image} source={{ uri: info.image }} />
            <View style={styles.detailsContainer}>
                <Text style={{ fontWeight: "bold", fontSize: 20 }}>{info.name}</Text>
                <Text style={styles.price}>${info.price}</Text>
                <View style={styles.size}>
                    <Text style={{fontSize: 18}}>Size:
                        <Text style={{fontWeight: "bold"}}> {selectedSize}</Text>
                    </Text>
                    <ScrollView contentContainerStyle={styles.scrollView}>
                        <View style={styles.flatListContainer}>
                            {data.size.map((item, index) => (
                                <TouchableOpacity key={index} onPress={() => setSelectedSize(item)}>
                                    <View style={[
                                        styles.innerItem,
                                        selectedSize === item ? styles.selectedItem : null,
                                    ]}>
                                        <Text style={[
                                            styles.innerText,
                                            selectedSize === item ? styles.selectedText : null,
                                        ]}>{item}</Text>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </ScrollView>
                </View>
                <View style={styles.actionContainer}>
                    <CounterInput
                        width={140}
                        initial={1}
                        decreaseButtonBackgroundColor={"#832438"}
                        increaseButtonBackgroundColor={"#832438"}
                        reverseCounterButtons={true}
                        borderRadius={10}
                        horizontal={true}
                        min={1}
                        max={data.quantity}
                        onChange={(counter) => {
                            setProductQuantity(counter)
                        }}
                    />
                    <TouchableOpacity onPress={() => addToCart({productId: data.id, quantity: productQuantity, size: selectedSize})} style={styles.buttonStyle}>
                        <Text style={styles.textStyle}>IN STOCK - ADD TO CART</Text>
                    </TouchableOpacity>
                </View>
                <View style={{marginTop: 20}}>

                    <Text style={{fontWeight: "bold", fontSize: 20 }}>
                        Description
                    </Text>
                    <Text style={styles.description}>{info.description}</Text>

                </View>
            </View>
        </ScrollView>
    );

    return (
        <SafeAreaView>
            {renderHeader(data)}
        </SafeAreaView>
    );
};

export default ProductDetail;

const styles = StyleSheet.create({
    header: {
        marginBottom: 8,

    },
    image: {
        height: 340,
        width: "100%",
    },
    detailsContainer: {
        paddingVertical: 24,
        paddingHorizontal: 16,
    },
    price: {
        position: "absolute",
        top: 24,
        right: 16,
        fontSize: 17,
    },
    description: {
        marginVertical: 5,
        color: "black",
        fontSize: 15,

    },
    actionContainer: {
        flexDirection: "row",
        gap: 15,
        marginTop: 24,
    },
    buttonStyle: {
        flex: 2,
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: "#832438",
        // padding: 10,
        width: Dimensions.get("window").width / 2,
        borderRadius: 0,
    },
    textStyle: {
        color: '#fff',
        fontSize: 17,
        fontWeight: "bold",
    },
    size: {
        marginTop: 10
    },
    flatListContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 10,
        gap: 20
    },
    innerItem: {
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "black",
        // padding: 10,
        paddingTop: 6,
        paddingBottom: 6,
        paddingLeft: 11,
        paddingRight: 11,
        borderRadius: 5,
        // justifyContent: 'center',
        // alignItems: 'center'
    },
    innerText: {

        // backgroundColor: "red",
        minWidth: 20,
        textAlign: "center",
        fontWeight: "bold"
    },
    scrollView: {
        flexGrow: 1
    },
    selectedItem: {
        backgroundColor: "black"
    },
    selectedText: {
        color: "#fff"
    }

});
