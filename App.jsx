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

const App = () => { 

  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);
  const [presupuesto, setPresupuesto] = useState(0);
  const [gastos, setGastos] = useState([
    // {id:1,cantidad: 30},
    // {id:2,cantidad: 40},
    // {id:3,cantidad: 50},
  ]);

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


      {isValidPresupuesto && (
        <Pressable>
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
    top: 120,
    right: 20
  }
});

export default App;
