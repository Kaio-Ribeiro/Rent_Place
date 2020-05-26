import { StyleSheet } from 'react-native'
import Constants from 'expo-constants'

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: Constants.statusBarHeight + 20,
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    title: {
        fontSize: 30,
        marginBottom: 10,
        marginTop: 48,
        color: '#13131a',
        fontWeight: 'bold',
    },

    form: {
        marginTop: 48,
        borderRadius: 8,
    },

    input: {
        height: 50,
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#dcdce6',
        borderRadius: 8,
        marginTop: 8,
        padding: 8,
    },

    action: {
        marginTop: 8,
        marginBottom: 16,
        backgroundColor: '#e02041',
        borderRadius: 8,
        height: 50,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    actionText: {
        color: '#FFF',
        fontSize: 15,
        fontWeight: 'bold',
    },

    registerButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    registerButtonText: {
        marginLeft: 8,
        color: '#e02041',
        fontSize: 15,
        fontWeight: 'bold',
    },

})