import React, { useState } from 'react'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { View, ScrollView, KeyboardAvoidingView, Image, Text, TextInput, TouchableOpacity, Platform } from 'react-native'

import api from '../../services/api'

import logoImg from '../../assets/logo.png'

import styles from './styles'

export default function Register() {
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [email, setEmail] = useState('')
    const [whatsapp, setWhatsapp] = useState('')
    const [city, setCity] = useState('')
    const [uf, setUF] = useState('')

    const navigation = useNavigation()

    function navigateBack() {
        navigation.goBack()
    }

    async function handleRegister(e) {
        const data = {
            name,
            password,
            whatsapp,
            email,
            city,
            uf,
        }

        try {
            const response = await api.post('users', data)
            alert('Cadastro realizado')

            navigation.navigate('Login')

        } catch (err) {
            alert('Erro no cadastro, tente novamente.')
        }
    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS == "android" ? "height" : null}
        >
            <ScrollView
                showsVerticalScrollIndicator={false}
            >

                <View style={styles.container}>
                    <View style={styles.header}>
                        <Image source={logoImg}/>

                        <TouchableOpacity onPress={navigateBack}>
                            <Feather name="arrow-left" size={28} color="#E82041"/>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.title}>Cadastro</Text>
                    <Text style={styles.description}>
                        Faça seu cadastro, entre na plataforma e procure sua república.
                    </Text>

                    <View style={styles.form}>
                        <TextInput 
                            style={styles.input}
                            placeholder="Nome"
                            onChangeText={name => setName(name)}
                            defaultValue={name}
                        />

                        <TextInput 
                            style={styles.input}
                            placeholder="Senha"
                            secureTextEntry={true}
                            onChangeText={password => setPassword(password)}
                            defaultValue={password}
                        />

                        <TextInput 
                            style={styles.input}
                            placeholder="Confirmar Senha"
                            secureTextEntry={true}
                            onChangeText={confirmPassword => setConfirmPassword(confirmPassword)}
                            defaultValue={confirmPassword}
                        />

                        <TextInput 
                            style={styles.input}
                            placeholder="E-mail"
                            keyboardType="email-address"
                            onChangeText={email => setEmail(email)}
                            defaultValue={email}
                        />

                        <TextInput 
                            style={styles.input}
                            placeholder="WhatsApp"
                            keyboardType="numeric"
                            onChangeText={whatsapp => setWhatsapp(whatsapp)}
                            defaultValue={whatsapp}
                        />

                        <View style={styles.inputGroup}>
                            <TextInput 
                                style={styles.inputCity}
                                placeholder="Cidade"
                                onChangeText={city => setCity(city)}
                                defaultValue={city}
                            />

                            <TextInput 
                                style={styles.inputUF}
                                placeholder="UF"
                                onChangeText={uf => setUF(uf)}
                                defaultValue={uf}
                            />
                        </View>

                    </View>

                    <TouchableOpacity 
                        style={styles.action}
                        onPress={() => handleRegister()}
                    >
                        <Text style={styles.actionText}>Cadastrar</Text>
                    </TouchableOpacity>

                </View>

            </ScrollView>

        </KeyboardAvoidingView>
    )
}