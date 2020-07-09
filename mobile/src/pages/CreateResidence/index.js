import React, { useState } from 'react'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { View, ScrollView, KeyboardAvoidingView, Image, Text, TextInput, TouchableOpacity, Platform, AsyncStorage, Dimensions } from 'react-native'

import api from '../../services/api'

import logoImg from '../../assets/logo.png'

import styles from './styles'

const { height } = Dimensions.get('window')

export default function CreateResidence() {
    const [city, setCity] = useState('')
    const [district, setDistrict] = useState('')
    const [street, setStreet] = useState('')
    const [house_number, setHouseNumber] = useState('')
    const [uf, setUF] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [vacancies_number, setVacanciesNumber] = useState('')
    const [residents_number, setResidentsNumber] = useState('')
    const [price, setPrice] = useState('')

    async function handleNewResidence() {
        const data = {
            city, 
            district, 
            street, 
            house_number, 
            uf,
            title, 
            description, 
            vacancies_number, 
            residents_number, 
            price,
        }

        try {
            const userID = await AsyncStorage.getItem('userID')

            await api.post('residences', data, {
                headers: {
                    Authorization: userID,
                }
            })
            
            alert('Cadastro realizado com sucesso.')

            navigation.navigate('Residences')

        } catch (err) {
            alert('Erro no cadastro, tente novamente.')

        }
    }

    const navigation = useNavigation()

    function navigateBack() {
        navigation.goBack()
    }

    state = {
        screenHeight: 0
    }

    onContentSizeChange = (contentWidth, contentHeigt) => {
        this.setChange({ screenHeight: contentHeigt })
    }

    const scrollEnabled = this.state.screenHeight > height
    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS == "android" ? "height" : null}
        >
            <ScrollView
                showsVerticalScrollIndicator={false}
            >

                <View style={styles.container}
                    onContentSizeChange={this.onContentSizeChange}
                >
                    <View style={styles.header}>
                        <Image source={logoImg}/>

                        <TouchableOpacity onPress={navigateBack}>
                            <Feather name="arrow-left" size={28} color="#E82041"/>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.title}>Cadastro de República</Text>
                    <Text style={styles.description}>
                        Faça seu cadastro, entre na plataforma e procure sua república.
                    </Text>

                    <View style={styles.form}>

                        <Text style={styles.formProperty}>INFO:</Text>

                        <TextInput 
                            style={styles.input}
                            placeholder="Título"
                            onChangeText={title => setTitle(title)}
                            defaultValue={title}
                        />

                        <TextInput 
                            style={styles.input}
                            placeholder="Descrição"
                            onChangeText={description => setDescription(description)}
                            defaultValue={description}
                        />
                                                
                        <TextInput 
                            style={styles.input}
                            placeholder="Preço"
                            keyboardType="numeric"
                            onChangeText={price => setPrice(price)}
                            defaultValue={price}
                        />

                        <Text style={styles.formProperty}>LOCALIZAÇÃO:</Text>

                        <TextInput 
                            style={styles.input}
                            placeholder="Rua"
                            onChangeText={street => setStreet(street)}
                            defaultValue={street}
                        />

                        <TextInput 
                            style={styles.input}
                            placeholder="N° da casa"
                            keyboardType="numeric"
                            onChangeText={house_number => setHouseNumber(house_number)}
                            defaultValue={house_number}
                        />

                        <TextInput 
                            style={styles.input}
                            placeholder="Bairro"
                            onChangeText={district => setDistrict(district)}
                            defaultValue={district}
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

                        <Text style={styles.formProperty}>DETALHES:</Text>

                        <TextInput 
                            style={styles.input}
                            placeholder="Número de vagas"
                            keyboardType="numeric"
                            onChangeText={vacancies_number => setVacanciesNumber(vacancies_number)}
                            defaultValue={vacancies_number}
                        />
                        
                        <TextInput 
                            style={styles.input}
                            placeholder="Número de moradores"
                            keyboardType="numeric"
                            onChangeText={residents_number => setResidentsNumber(residents_number)}
                            defaultValue={residents_number}
                        />

                    </View>

                    <TouchableOpacity 
                        style={styles.action}
                        onPress={() => handleNewResidence()}
                    >
                        <Text style={styles.actionText}>Cadastrar</Text>
                    </TouchableOpacity>

                </View>

            </ScrollView>

        </KeyboardAvoidingView>
    )
}