import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
// import { registerWithEmail, db } from '../components/Firebase/firebase';

const Signup: React.FC<{ navigation: any }> = ({ navigation }) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [secondname, setSecondname] = useState<string>('');

    const handleSignup = () => {
        // registerWithEmail(email, password)
        //     .then(data => {
        //         db.collection("users").doc(data.user.uid).set({
        //             name: name,
        //             secondname: secondname,
        //             email: email,
        //             userPhoto: ''
        //         });
        //     })
        //     .catch(error => {
        //         alert(error.message);
        //     });
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.inputBox}
                value={name}
                onChangeText={setName}
                placeholder='Name'
            />
            <TextInput
                style={styles.inputBox}
                value={secondname}
                onChangeText={setSecondname}
                placeholder='Second name'
            />
            <TextInput
                style={styles.inputBox}
                value={email}
                onChangeText={setEmail}
                placeholder='Email'
                autoCapitalize='none'
            />
            <TextInput
                style={styles.inputBox}
                value={password}
                onChangeText={setPassword}
                placeholder='Password'
                secureTextEntry={true}
            />
            <TouchableOpacity style={styles.button} onPress={handleSignup}>
                <Text style={styles.buttonText}>Signup</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Signup;

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center' },
    inputBox: { width: '85%', margin: 10, padding: 15, fontSize: 16, borderBottomWidth: 1, textAlign: 'center' },
    button: { marginTop: 30, paddingVertical: 5, backgroundColor: '#832438', borderRadius: 5, width: 200, alignItems: 'center' },
    buttonText: { fontSize: 20, fontWeight: 'bold', color: '#fff' },
});
