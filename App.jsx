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

  const handleNuevoPresupuesto = (presupuesto) => {
    console.log('desde app', presupuesto)

    if(Number(presupuesto) > 0){
      // console.log('Presupuesto valido')
      setIsValidPresupuesto(true)
    }
    else{
      // console.log('Presupuesto no válido')
      Alert.alert('Error', 'El presupuesto no puede ser 0 o menor','OK')
    }
  }

  const handleGasto = gasto =>{
    // console.log(gasto)
    // console.log(Object.values(gasto))

    if(Object.values(gastos).includes('')){
      // console.log('Hay almenos un cmapo vacio')
      Alert.alert(
        'Error',
        "Todos los campos son obligatorios",
      )
      return
    }

    //Añadir el nuevo gasto al state
    // console.log(gasto)
    gasto.id = generarId()
    console.log(gasto)
  
    setGastos([...gastos, gasto])
    setModal(!modal)
  }

  return (
    <View style={styles.contenedor}>

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

      {isValidPresupuesto &&(
        <ListadoGastos
          gastos={gastos}
        />
      )}

      {modal && (
          <Modal
            animationType='slide'
            visible={modal}
            onRequestClose={() =>{
              setModal(!modal)
            }}
          >
            <FormularioGasto
              setModal={setModal}
              handleGasto={handleGasto}
            />
          </Modal>
        )}

      {isValidPresupuesto && (
        <Pressable
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
    backgroundColor: '#3B82F6'
  },
  imagen:{
    width: 60,
    height:60,
    position:'absolute',
    top: 10,
    right: 20
  }
});

export default App;
