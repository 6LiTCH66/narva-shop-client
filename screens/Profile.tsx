import React, { useState, useEffect } from 'react';
import { Button, Text, View, StyleSheet, Image, TouchableOpacity, TextInput, Alert, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
// import { fireStorage, auth, db } from '../components/Firebase/firebase';
import * as ImagePicker from 'expo-image-picker';
import { Avatar, Title, Caption } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {getMe, User} from "../http/userAPI";

const Profile: React.FC<{ navigation: any }> = ({ navigation }) => {
    const [userPhotoUri, setUserPhotoUri] = useState<string>('');


    const [user, setUser] = useState<User>({email: "", firstName: "", lastName: "", id: null, photo: null })

    // const [name, setName] = useState<string>('');
    // const [secondname, setSecondname] = useState<string>('');
    // const [email, setEmail] = useState<string>('');

    const [newName, setNewName] = useState<string>('');
    const [newSecondName, setNewSecondName] = useState<string>('');

    useEffect(() => {
        getMe().then((user) => {
            setUser(user)
        })
    }, []);

    // useEffect(() => {
    //     const subscriber = db.collection("users").doc(auth.currentUser.uid).onSnapshot(doc => {
    //         if (doc.data()) {
    //             setUserPhotoUri(doc.data().userPhoto || '');
    //             setName(doc.data().name || '');
    //             setSecondname(doc.data().secondname || '');
    //             setEmail(doc.data().email || '');
    //         } else {
    //             setUserPhotoUri('http://www.coogfans.com/uploads/db5902/original/3X/8/1/81173237ffa580ef710b0862fdddaac163274db1.jpeg');
    //         }
    //     });
    //     return () => subscriber();
    // }, []);

    const onChooseImagePress = async () => {
        // let result = await ImagePicker.launchImageLibraryAsync();
        // if (!result.cancelled) {
        //     uploadImage(result.uri, auth.currentUser.uid)
        //         .then(async () => {
        //             const imageUri = await fireStorage.ref("images/" + auth.currentUser.uid).getDownloadURL();
        //             db.collection("users").doc(auth.currentUser.uid).update({ userPhoto: imageUri });
        //         })
        //         .catch(error => Alert.alert(error.message));
        // }
    };


    // const uploadImage = async (uri: string, imageName: string) => {
    //     const response = await fetch(uri);
    //     const blob = await response.blob();
    //     const ref = fireStorage.ref().child("images/" + imageName);
    //     return ref.put(blob);
    // };

    const onChangeUserData = () => {
        // if (newName && newSecondName) {
        //     db.collection("users").doc(auth.currentUser.uid).update({
        //         name: newName,
        //         secondname: newSecondName,
        //     });
        //     setNewName('');
        //     setNewSecondName('');
        // } else {
        //     Alert.alert("Name or Secondname cannot be empty");
        // }
    };

    return (
        <KeyboardAwareScrollView style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={{ alignItems: "center", width: '100%' }}>

                    <View style={{ marginTop: 10 }}>
                        <Avatar.Image
                            source={{ uri: userPhotoUri || undefined }}
                            size={100}
                        />
                    </View>

                    <View style={{ alignItems: 'center' }}>
                        <Title style={styles.userData}>{user.firstName || ''} {user.lastName || ''}</Title>
                        <Caption style={styles.caption}>{user.email}</Caption>
                    </View>

                    <View style={{ position: 'absolute', right: 0, bottom: 0, marginRight: 10 }}>
                        <TouchableOpacity onPress={onChooseImagePress}>
                            <Icon name="image-outline" size={50} />
                        </TouchableOpacity>
                    </View>

                </View>

                <View style={styles.myAccount}>
                    <Text style={styles.myAccountText}>MY ACCOUNT</Text>
                </View>

                <View style={styles.myCart}>
                    <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => navigation.jumpTo('CartScreen')}>
                        <Text style={styles.myCartText}>My Cart</Text>
                        <Icon name="arrow-forward" size={20} style={{ position: 'absolute', right: 0 }} />
                    </TouchableOpacity>
                </View>

                <View style={styles.myCart}>
                    <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => navigation.navigate('ResetPassword')}>
                        <Text style={styles.myCartText}>Change password</Text>
                        <Icon name="arrow-forward" size={20} style={{ position: 'absolute', right: 0 }} />
                    </TouchableOpacity>
                </View>

                <View style={styles.myAccount}>
                    <Text style={styles.myAccountText}>USER INFORMATION</Text>
                </View>

                <View style={{ marginTop: 15 }}>
                    <Text style={styles.userNameText}>Firstname</Text>
                    <TextInput style={styles.input} placeholder={user.firstName} value={newName} onChangeText={setNewName} />
                </View>

                <View style={{ marginTop: 15 }}>
                    <Text style={styles.userNameText}>Lastname</Text>
                    <TextInput style={styles.input} placeholder={user.lastName} value={newSecondName} onChangeText={setNewSecondName} />
                </View>

                <View>
                    <TouchableOpacity style={styles.button} onPress={onChangeUserData}>
                        <Text style={styles.buttonText}>Update</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </KeyboardAwareScrollView>
    );
};

export default Profile;

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center' },
    userData: { fontSize: 16, marginTop: 10, fontWeight: 'bold' },
    myAccount: { backgroundColor: '#832438', marginTop: 20, width: Dimensions.get("window").width - 25, height: 50, borderRadius: 7, justifyContent: 'center' },
    myAccountText: { fontSize: 17, fontWeight: 'bold', color: '#fff', marginLeft: 20 },
    myCart: { marginTop: 20, width: Dimensions.get("window").width - 60, height: 40, justifyContent: 'center', borderBottomColor: '#888', borderBottomWidth: 2 },
    myCartText: { fontSize: 17, fontWeight: 'bold' },
    input: { width: Dimensions.get("window").width - 60, height: 40, backgroundColor: '#fff', paddingVertical: 10, paddingHorizontal: 15, borderColor: '#ccc', borderWidth: 1, borderRadius: 10, fontSize: 16, marginBottom: 5 },
    userNameText: { marginBottom: 5, fontSize: 20, marginLeft: 5 },
    button: { marginTop: 20, paddingVertical: 5, backgroundColor: '#832438', borderRadius: 5, width: 200, justifyContent: 'center', alignItems: 'center' },
    buttonText: { fontSize: 20, fontWeight: 'bold', color: '#fff' },
    caption: { fontSize: 12, lineHeight: 15 },
});
