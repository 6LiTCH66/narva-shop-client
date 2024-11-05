import React, {useEffect} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import ShoppingCartIcon from '../Icons/ShoppingCartIcon';
import Cart from '../screens/Cart';
import { useNavigation } from '@react-navigation/native';

const MyStack = createStackNavigator();

const CartScreen: React.FC<{ navigation: any }> = ({ navigation }) => {




    return (
        <MyStack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: '#832438',
            },
            headerTintColor: '#fff',
        }}>
            <MyStack.Screen name="Cart" component={Cart}
                            options={{
                headerLeft: () => (
                    <Icon.Button
                        name="menu"
                        size={25}
                        backgroundColor="#832438"
                        onPress={() => navigation.openDrawer()}
                    ></Icon.Button>
                ),
                headerRight: () => <ShoppingCartIcon />,
            }}
            />
        </MyStack.Navigator>
    );
};

export default CartScreen;
