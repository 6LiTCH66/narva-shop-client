import React from 'react';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { RouteProp } from '@react-navigation/native';
import ProductDetail from '../screens/ProductDetail';
import ShoppingCartIcon from "../Icons/ShoppingCartIcon";

// Define your route parameters for the ProductDetail screen
type ProductsStackParamList = {
    'Products Detail': { data: { name: string; price: number; description: string; image: string } };
};

// Define the navigation prop type
type ProductDetailScreenNavigationProp = StackNavigationProp<ProductsStackParamList, 'Products Detail'>;

// Define the route prop type
type ProductDetailScreenRouteProp = RouteProp<ProductsStackParamList, 'Products Detail'>;

// Combine navigation and route props
type ProductDetailNavProps = {
    navigation: ProductDetailScreenNavigationProp;
    route: ProductDetailScreenRouteProp;
};

const ProductsStack = createStackNavigator<ProductsStackParamList>();

const ProductDetailNav: React.FC<ProductDetailNavProps> = ({ navigation }) => {
    return (
        <ProductsStack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: '#FFF',
            },
            headerTintColor: 'black',
        }}>
            <ProductsStack.Screen name="Products Detail" component={ProductDetail} options={{
                headerLeft: () => (
                    <Icon.Button
                        name="arrow-back-outline"
                        size={25}
                        backgroundColor="#FFF"
                        color="black"
                        onPress={() => navigation.goBack()}
                    ></Icon.Button>
                ),
                headerRight: () => (
                    <ShoppingCartIcon/>
                )
            }}/>
        </ProductsStack.Navigator>
    );
};

export default ProductDetailNav;
