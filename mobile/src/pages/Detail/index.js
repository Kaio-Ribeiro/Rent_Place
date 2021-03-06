import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons'
import { View, Text, Image, ScrollView, TouchableOpacity, Linking } from 'react-native'
import * as MailComposer from 'expo-mail-composer'

import logoImg from '../../assets/logo.png'

import styles from './styles'

export default function Detail() {
    const navigation = useNavigation()
    const route = useRoute()

    const residence = route.params.residence
    const message = `Olá ${residence.name}, estou entrando em contato pois gostaria de alugar a vaga em sua república`

    function navigateBack() {
        navigation.goBack()
    }

    function sendMail() {
        MailComposer.composeAsync({
            subject: residence.title,
            recipients: [residence.email],
            body: message,
        })
    }

    function sendWhatsApp() {
        Linking.openURL(`whatsapp://send?phone=${residence.whatsapp}&text=${message}`)
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg}/>

                <TouchableOpacity onPress={navigateBack}>
                    <Feather name="arrow-left" size={28} color="#E82041"/>
                </TouchableOpacity>
            </View>

            <ScrollView 
                style={styles.residence}
                showsVerticalScrollIndicator={false}
            >
                    <Text style={[styles.residenceProperty, { marginTop: 0 }]}>TÍTULO:</Text>
                    <Text style={styles.residenceValue}>{ residence.title }</Text>

                    <Text style={styles.residenceProperty}>DESCRIÇÃO:</Text>
                    <Text style={styles.residenceValue}>{ residence.description }</Text>

                    <Text style={styles.residenceProperty}>LOCALIZAÇÃO:</Text>
                    <Text style={styles.residenceValue}>{ residence.city }/{ residence.uf }</Text>

                    <Text style={styles.residenceProperty}>ENDEREÇO:</Text>
                    <Text style={styles.residenceValue}>{ residence.street }, { residence.house_number }</Text>

                    <Text style={styles.residenceProperty}>NÚMERO DE MORADORES:</Text>
                    <Text style={styles.residenceValue}>{ residence.residents_number }</Text>

                    <Text style={styles.residenceProperty}>NÚMERO DE VAGAS:</Text>
                    <Text style={styles.residenceValue}>{ residence.vacancies_number }</Text>

                    <Text style={styles.residenceProperty}>PREÇO:</Text>
                    <Text style={styles.residenceValue}>
                        {Intl.NumberFormat('pt-BR', { 
                            style: 'currency', 
                            currency: 'BRL'  
                        }).format(residence.price)}
                    </Text>
            </ScrollView>

            <View style={styles.contactBox}>
                <Text style={styles.contactTitle}>Fale com o anunciante!</Text>
                <Text style={styles.contactDescription}>Entre em contato:</Text>

                <View style={styles.actions}>
                    <TouchableOpacity style={styles.action} onPress={sendWhatsApp}>
                        <Text style={styles.actionText}>WhatsApp</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.action} onPress={sendMail}>
                        <Text style={styles.actionText}>E-mail</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}