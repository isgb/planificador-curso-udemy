import React, { useState } from 'react'
// import { Text, View, TextInput, Pressable, StyleSheet } from 'react-native'
import globalStyles from '../styles'
import { err } from 'react-native-svg/lib/typescript/xml'

const NuevoPresupuesto = ({ 
    presupuesto, 
    setPresupuesto, 
    handleNuevoPresupuesto }) => {

    // useEffect(() => {
    //     const obtenerAS = async () =>{
    //         try {

    //             const valor = await AsyncStorage.getItem('get_item')
    //             console.log(JSON.parse(valor))
                
    //         } catch (error) {
    //             console.log(error)
    //         }
    //     }

    //     obtenerAS();
    // },[])

    return (
        <View style={styles.contenedor}>
            <Text style={styles.label}>Definir presupuesto</Text>

            <TextInput
                keyboardType='numeric'
                placeholder='Agregar presupuestp Ej. 300'
                style={styles.input}
                value={presupuesto.toString()}
                onChange={setPresupuesto}
            />

            <Pressable
                style={styles.boton}
                onPress={() => handleNuevoPresupuesto(presupuesto)}
            >
                <Text style={styles.botonText}>Agregar presupuesto</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    contenedor: {
        ...globalStyles.contenedor,
    },
    label: {
        textAlign: 'center',
        fontSize: 24,
        color: '#3B82F6',
    },
    input: {
        backgroundColor: '#F5F5F5',
        padding: 10,
        borderRadius: 10,
        textAlign: 'center',
        marginTop: 30
    },
    boton: {
        marginTop: 30,
        backgroundColor: '#1048A4',
        padding: 10,
        borderRadius: 10
    },
    botonText: {
        color: '#FFF',
        textAlign: 'center',
        textTransform: 'uppercase',
        fontWeight: 'bold',

    }
})

export default NuevoPresupuesto