import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

const DrawerHeader: React.FC<{ navigation: any }> = ({ navigation }) => (
    <Icon.Button
        name="menu"
        size={25}
        backgroundColor="#832438"
        onPress={() => navigation.openDrawer()}
    />
);

export default DrawerHeader;
