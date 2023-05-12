import React from 'react'
import { View } from 'react-native/types'

const Gasto = ({gasto}) => {
  return (
    <View>
        <Text>{gasto.nombre}</Text>
    </View>
  )
}

export default Gasto