import { View, Text } from 'react-native'
import React from 'react'

import Header from "../../components/Home/Header"
import Slider from "../../components/Home/Slider"
import PetListByCategoty from '../../components/Home/PetListByCategoty'

const Home = () => {
  return (
    <View style={{
      padding: 20,
      marginTop: 20
    }}>
      <Header/>
      <Slider/>
      <PetListByCategoty/>
    </View>
  )
}

export default Home