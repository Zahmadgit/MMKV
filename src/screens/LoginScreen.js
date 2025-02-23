import React, { useState, useEffect } from "react";
import { View, TextInput, Button } from "react-native";
import { useDispatch } from "react-redux";
import { loginRequest } from "../store/userSlice";
import { storage } from "../mmkvInstance";
import { useTranslation } from "react-i18next";

const LoginScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { t, i18n } = useTranslation();

    const handleLoginUser = () => {
        dispatch(loginRequest({ email, password }));
        navigation.navigate('GoalScreen');
    };

    //use mmkv for storing language pref
    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
        storage.setLanguage(lang);
    };

    //on mounting the current language will persist through screens
    useEffect(() => {
        const storedLanguage = storage.getLanguage();
        i18n.changeLanguage(storedLanguage); 
    }, []);

    return (
        <View style={{ alignSelf: 'center', justifyContent: 'center' }}>
            <TextInput 
                placeholder={t("login.emailPlaceholder")} 
                value={email} 
                onChangeText={setEmail} 
            />
            <TextInput 
                placeholder={t("login.passwordPlaceholder")} 
                value={password} 
                onChangeText={setPassword} 
                secureTextEntry 
            />
            <Button title={t("login.loginButton")} onPress={handleLoginUser} />

            <View style={{ flexDirection: 'row', marginTop: 20 }}>
                <Button title="English" onPress={() => changeLanguage('en')} />
                <Button title="Spanish" onPress={() => changeLanguage('es')} />
            </View>
        </View>
    );
};

export default LoginScreen;