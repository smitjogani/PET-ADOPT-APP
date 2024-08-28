import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

import Header from "../../components/Home/Header"
import Slider from "../../components/Home/Slider"
import PetListByCategoty from '../../components/Home/PetListByCategoty'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Colors from '../../constants/Colors'

const Home = () => {
  return (
    <View style={{
      padding: 20,
      paddingTop: 40,
    }}>
      <Header />
      <Slider />
      <PetListByCategoty />

      {/* Add Pet Option */}
      <TouchableOpacity style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        padding: 20,
        marginTop: 20,
        backgroundColor: Colors.LIGHT_PRIMARY,
        borderWidth: 1,
        borderColor: Colors.PRIMARY,
        borderStyle: 'dashed',
        borderRadius: 15,
        justifyContent: 'center'
      }}>
        <MaterialIcons name="pets" size={24} color={Colors.PRIMARY} />
        <Text style={{
          fontFamily: 'outfit-medium',
          fontSize: 19,
          color: Colors.PRIMARY
        }}>Add New Pet</Text>
      </TouchableOpacity>

    </View>
  )
}

export default Home