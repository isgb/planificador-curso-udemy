import React, { useEffect, useState } from 'react'
import { Text,View,Image, StyleSheet, Pressable } from 'react-native/types'
import globalStyles from '../styles'
import { formatearCantidad } from '../helpers'
import CircularProgress from 'react-native-circular-progress-indicator'

const ControlPresupuesto = ({presupuesto, gastos, resetearAp}) => {

  const [disponible, setDisponible] = useState(0)
  const [gastado, setGastado] = useState(0)
  const [porcentaje, setPorcentaje] = useState(0)

  useEffect(() => {

    const totalGastado = gastos.reduce((total,gasto) => 
                                        Number(gasto.cantidad) + total, 0) 

    const totalDisponible = presupuesto - totalGastado;
    // console.log(totalDisponible)

    const nuevoPorcentaje = (
     ((presupuesto - totalDisponible)/presupuesto) * 100
    )

   
    setTimeout(() => {
      setPorcentaje(nuevoPorcentaje)
    },1000);

    setGastado(totalGastado)
    setDisponible(totalDisponible)
    // console.log(totalGastado)
  },[gastos])

  return (
    <View style={styles.contenedor}>
      <View style={styles.centrarGrafica}>
        {/* <Image 
        style={styles.imagen}
          source={require('../img/grafico.jpg')}
        /> */}
      <CircularProgress
        value={porcentaje}
        duration={10000}
        radius={150}
        valueSuffix={'%'}
        title='Gastado'
        inActiveStrokeColor='#F5F5F5'
        inActiveStrokeWidth={20}
        activeStrokeColor='#3b82f6'
        activeStrokeWidth={20}
        titleStyle={{ fontWeight: 'bold', fontSize:20 }}
        titleColor='#64748B'
      />
      </View>

      <View style={styles.contenedorTexto}>
        <Pressable
        onLongPress={resetearAp}
          style={styles.boton}
        >
          <Text style={styles.textoBoton}>Reiniciar App</Text>
        </Pressable>

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
    // imagen:{
    //   width: 250,
    //   height:250
    // },
    boton:{
      backgroundColor:'#DB2777',
      padding: 10,
      marginBottom:40,
      borderRadius: 5
    },
    textoBoton:{
      textAlign: 'center',
      color: '#FFF',
      fontWeight: 'bold',
      textTransform: 'uppercase'
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