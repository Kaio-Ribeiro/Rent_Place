import React, { useState } from 'react'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { View, Image, Text, TextInput, TouchableOpacity, AsyncStorage } from 'react-native'

import api from '../../services/api'

import logoImg from '../../assets/logo.png'

import styles from './styles'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigation = useNavigation()
    
    function navigateToRegister() {
        navigation.navigate('Register')
    }

    async function handleLogin() {
        try {
            const response = await api.post('sessions', { email })


        
            await AsyncStorage.setItem('userID', response.data.id)

            await AsyncStorage.setItem('userName', response.data.name)

            navigation.navigate('CreateResidence')

        } catch (err) {
            alert('Falha no login, tente novamente.')
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg}/>
            </View>

            <Text style={styles.title}>Faça seu Login</Text>

            <TextInput 
                style={styles.input}
                placeholder="E-mail"
                keyboardType="email-address"
                onChangeText={email => setEmail(email)}
                defaultValue={email}
            />

            <TextInput 
                style={styles.input}
                placeholder="Senha"
                secureTextEntry={true}
                onChangeText={password => setPassword(password)}
                defaultValue={password}
            />

            <TouchableOpacity 
                style={styles.action}
                onPress={handleLogin}
            >
                <Text style={styles.actionText}>Entrar</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={styles.registerButton}
                onPress={navigateToRegister}
            >
                <Feather name="log-in" size={16}  color="#E02041"/>
                <Text style={styles.registerButtonText}>Não tenho cadastro</Text>
            </TouchableOpacity>

        </View>
    )
}