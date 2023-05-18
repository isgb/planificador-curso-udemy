import React, { useState } from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
  Image
} from 'react-native';
import Header from './src/components/Header';
import NuevoPresupuesto from './src/components/NuevoPresupuesto';
import ControlPresupuesto from './src/components/ControlPresupuesto';
import FormularioGasto from './src/components/FormularioGasto';
import { generarId } from './src/helpers';
import ListadoGastos from './src/components/ListadoGastos';


const App = () => {

  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);
  const [presupuesto, setPresupuesto] = useState(0);
  const [gastos, setGastos] = useState([
    // {id:1,cantidad: 30},
    // {id:2,cantidad: 40},
    // {id:3,cantidad: 50},
  ]);
  const [modal, setModal] = useState(false);
  const [gasto, setGasto] = useState({});

  const handleNuevoPresupuesto = (presupuesto) => {
    console.log('desde app', presupuesto)

    if (Number(presupuesto) > 0) {
      // console.log('Presupuesto valido')
      setIsValidPresupuesto(true)
    }
    else {
      // console.log('Presupuesto no válido')
      Alert.alert('Error', 'El presupuesto no puede ser 0 o menor', 'OK')
    }
  }

  const handleGasto = gasto => {
    // console.log(gasto)
    // console.log(Object.values(gasto))

    // if (Object.values(gastos).includes('')) {
      if ([ gasto.nombre, gasto.categoria, gasto.cantidad ].includes('')) {
      // console.log('Hay almenos un cmapo vacio')
      Alert.alert(
        'Error',
        "Todos los campos son obligatorios",
      )
      return
    }

    if(gasto.id){
      // console.log('Edicion')
      const gastosActualizados = gastos.map( gastoState => gastoState.id === gasto.id ? gasto : gastoState )
      setGastos(gastosActualizados)
    }
    else{
      console.log('Nuevo regsitro')

          //Añadir el nuevo gasto al state
          // console.log(gasto)
          gasto.id = generarId();
          gasto.fecha = Date.now();
          // console.log(gasto)
          setGastos([...gastos, gasto])
    }
    setModal(!modal)
  }

  const eliminarGasto = id =>{
    // console.log('eliminando',id)
    Alert.alert(
      '¿Deseas eliminar este gasto',
      'Un gasto eliminado no se puede recuperar',
      [
        { text: 'No', style: 'cancel' },
        { text: 'Sí, Eliminar' , onPress: ()=>{
          // console.log('Eliminando ',id)

          const gastosActualizados = gastos.filter( gastoState => 
              gastoState.id !== id)

              setGastos(gastosActualizados)
              setModal(!modal)
              setGasto({})
        }}
      ]
    )
  }

  return (
    <View style={styles.contenedor}>
      <ScrollView>

        <View style={styles.header}>
          <Header />

          {isValidPresupuesto ? (

            <ControlPresupuesto
              presupuesto={presupuesto}
              gastos={gastos}
            />

          ) : (
            <NuevoPresupuesto
              presupuesto={presupuesto}
              setPresupuesto={setPresupuesto}
              handleNuevoPresupuesto={handleNuevoPresupuesto}
            />
          )}

        </View>

        {isValidPresupuesto && (
          <ListadoGastos
            gastos={gastos}
            setModal={setModal}
            setGasto={setGasto}
          />
        )}
      </ScrollView>

      {modal && (
        <Modal
          animationType='slide'
          visible={modal}
          onRequestClose={() => {
            setModal(!modal)
          }}
        >
          <FormularioGasto
            setModal={setModal}
            handleGasto={handleGasto}
            gasto={gasto}
            setGasto={setGasto}
            eliminarGasto={eliminarGasto}
          />
        </Modal>
      )}

      {isValidPresupuesto && (
        <Pressable
        style={styles.pressable}
          onPress={() => setModal(!modal)}
        >
          <Image
            style={styles.imagen}
            source={require('./src/img/nuevo-gasto.png')}
          />

        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: '#F5F5F5',
    flex: 1
  },
  header: {
    backgroundColor: '#3B82F6',
    minHeight:400
  },
  pressable:{
    // backgroundColor: 'red',
    width: 60,
    height: 60,
    position: 'absolute',
    bottom: 40,
    right: 30
  },
  imagen: {
    width: 60,
    height: 60,
    // position: 'absolute',
    // bottom: 40,
    // right: 30
  }
});

export default App;
