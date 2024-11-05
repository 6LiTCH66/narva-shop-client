import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import ShoppingCartIcon from '../Icons/ShoppingCartIcon';
import Products from '../screens/Products';
import ProductDetail from '../screens/ProductDetail';
import CartScreen from '../screens/CartScreen';

const ProductsStack = createStackNavigator();

const ViewProducts: React.FC<{ navigation: any }> = ({ navigation }) => {
    return (
        <ProductsStack.Navigator initialRouteName="Products" screenOptions={{
            headerStyle: {
                backgroundColor: '#832438',
            },
            headerTintColor: '#fff',
        }}>
            <ProductsStack.Screen name="Products" component={Products} options={{
                headerLeft: () => (
                    <Icon.Button
                        name="menu"
                        size={25}
                        backgroundColor="#832438"
                        onPress={() => navigation.openDrawer()}
                    ></Icon.Button>
                ),
                headerRight: () => <ShoppingCartIcon/>
            }}/>
            <ProductsStack.Screen name="ProductDetail" component={ProductDetail} options={{
                title: 'Product Detail',
                headerBackTitleVisible: false,
                headerRight: () => <ShoppingCartIcon/>
            }}/>
        </ProductsStack.Navigator>
    );
};

export default ViewProducts;
