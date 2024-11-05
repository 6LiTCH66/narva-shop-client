import React, { useState } from 'react';
import { Alert, Text, View, StyleSheet, TextInput, Dimensions, TouchableOpacity } from 'react-native';
// import { cred, auth } from '../components/Firebase/firebase';

const ResetPassword: React.FC = () => {
    const [currentPassword, setCurrentPassword] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');

    const reauthenticate = (currentPassword: string) => {
        // const user = auth.currentUser;
        // const credUser = cred(user.email, currentPassword);
        // return user.reauthenticateWithCredential(credUser);
    };

    const onChangePasswordPress = () => {
        // reauthenticate(currentPassword).then(() => {
        //     const user = auth.currentUser;
        //     user.updatePassword(newPassword).then(() => {
        //         Alert.alert("Password was changed");
        //         setCurrentPassword('');
        //         setNewPassword('');
        //     }).catch(error => {
        //         Alert.alert(error.message);
        //     });
        // }).catch(error => {
        //     Alert.alert(error.message);
        // });
    };

    return (
        <View style={styles.container}>
            <View style={{ marginTop: 190 }}>
                <TextInput
                    style={styles.input}
                    value={currentPassword}
                    placeholder="Current Password"
                    autoCapitalize="none"
                    secureTextEntry={true}
                    onChangeText={setCurrentPassword}
                />
                <TextInput
                    style={styles.input}
                    value={newPassword}
                    placeholder="New Password"
                    autoCapitalize="none"
                    secureTextEntry={true}
                    onChangeText={setNewPassword}
                />
                <TouchableOpacity style={styles.button} onPress={onChangePasswordPress}>
                    <Text style={styles.buttonText}>Change Password</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ResetPassword;

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center' },
    input: { width: Dimensions.get("window").width - 60, height: 40, backgroundColor: '#fff', paddingVertical: 10, paddingHorizontal: 15, borderColor: '#ccc', borderWidth: 1, borderRadius: 10, fontSize: 16, marginBottom: 5 },
    button: { marginTop: 20, paddingVertical: 5, backgroundColor: '#832438', borderRadius: 5, width: 200, justifyContent: 'center', alignItems: 'center' },
    buttonText: { fontSize: 20, fontWeight: 'bold', color: '#fff' },
});
