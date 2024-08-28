import { View, Text } from 'react-native'
import React from 'react'

import Header from "../../components/Home/Header"
import Slider from "../../components/Home/Slider"
import PetListByCategoty from '../../components/Home/PetListByCategoty'
import Colors from '../../constants/Colors'

const Home = () => {
  return (
    <View style={{
      padding: 20,
      paddingTop: 40,
    }}>
      <Header/>
      <Slider/>
      <PetListByCategoty/>
    </View>
  )
}

export default Home