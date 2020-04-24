import React, { useState, useEffect } from 'react'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native'

import api from '../../services/api'

import logoImg from '../../assets/logo.png'

import styles from './styles'

export default function Residences() {
    const [residences, setResidences] = useState([])
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)

    const navigation = useNavigation()

    function navigateToDetail(residence) {
        navigation.navigate('Detail', { residence })
    }

    async function loadResidences() {
        if(loading) {
            return
        }

        if(total > 0 && residences.length === total) {
            return
        }

        setLoading(true)

        const response = await api.get('residences', {
            params: { page }
        })

        setResidences([...residences, ... response.data])
        setTotal(response.headers['x-total-count'])
        setPage(page + 1)
        setLoading(false)
    }

    useEffect(() => {
        loadResidences()
    }, [])
    
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg}/>
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{total} repúblicas</Text>.
                </Text>
            </View>

            <Text style={styles.title}>Bem-vindo!</Text>
            <Text style={styles.description}>Veja todas as repúblicas com vagas disponíveis na sua cidade.</Text>

            <FlatList
                data={residences}
                style={styles.residenceList}
                keyExtractor={residence => String(residence.id)}
                showsVerticalScrollIndicator={false}
                onEndReached={loadResidences}
                onEndReachedThreshold={0.2}
                renderItem={({ item: residence }) => (
                    <View style={styles.residence}>
                        <Text style={styles.residenceProperty}>TÍTULO:</Text>
                        <Text style={styles.residenceValue}>{residence.title}</Text>

                        <Text style={styles.residenceProperty}>LOCALIZAÇÃO:</Text>
                        <Text style={styles.residenceValue}>{ residence.city }/{ residence.uf }</Text>

                        <Text style={styles.residenceProperty}>PREÇO:</Text>
                        <Text style={styles.residenceValue}>
                            {Intl.NumberFormat('pt-BR', { 
                                style: 'currency', 
                                currency: 'BRL'  
                            }).format(residence.price)}
                        </Text>

                        <TouchableOpacity 
                        style={styles.detailsButton}
                        onPress={() => navigateToDetail(residence)}
                        >
                            <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                            <Feather name="arrow-right" size={16} color="#E02041"/>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    )
}