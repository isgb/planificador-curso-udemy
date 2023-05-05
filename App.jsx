import React, { useState } from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Header from './src/components/Header';
import NuevoPresupuesto from './src/components/NuevoPresupuesto';
import ControlPresupuesto from './src/components/ControlPresupuesto';

const App = () => {

  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);

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
           <ControlPresupuesto/>
        ) : (
            <NuevoPresupuesto 
              handleNuevoPresupuesto={handleNuevoPresupuesto}
            />
        )}
        
      </View>

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
});

export default App;
