import React, { useEffect, useState } from 'react'
import { Text,View,Image, StyleSheet } from 'react-native/types'
import globalStyles from '../styles'
import { formatearCantidad } from '../helpers'

const ControlPresupuesto = ({presupuesto, presupuesto}) => {

  const [disponible, setDisponible] = useState(0)
  const [gastado, setGastado] = useState(0)

  useEffect(() => {

    const totalGastado = gastos.reduce((total,gasto) => 
                                        Number(gasto.cantidad) + total, 0) 

    const totalDisponible = presupuesto - totalGastado;
    // console.log(totalDisponible)

    setGastado(totalGastado)
    setDisponible(totalDisponible)
    // console.log(totalGastado)
  },[])

  return (
    <View style={styles.centrarGrafica}>
      <View>
        <Image 
        style={styles.imagen}
          source={require('../img/grafico.jpg')}
        />
      </View>

      <View style={styles.contenedorTexto}>

        <Text style={styles.valor}>
          <Text style={styles.label}>Presupuesto: {''}</Text>
          {formatearCantidad(presupuesto)}
        </Text>

        <Text style={styles.valor}>
          <Text style={styles.label}>Disponible: {''}</Text>
          {formatearCantidad(disponible)}
        </Text>

        <Text style={styles.valor}>
          <Text style={styles.label}>Gastado: {''}</Text>
          {formatearCantidad(gastado)}
        </Text>

      </View>
      
    </View>
    
  )
}

const styles = StyleSheet.create({
    contenedor:{
      ...globalStyles.contenedor,
    },
    centrarGrafica:{
      alignItems: 'center'
    },
    imagen:{
      width: 250,
      height:250
    },
    contenedorTexto:{
      marginTop:50
    },
    valor:{
      fontSize: 24,
      textAlign: 'center',
      marginBottom: 10
    },
    label:{
      fontWeight: '700',
      color: '#3B82F6'
    }
})

export default ControlPresupuesto