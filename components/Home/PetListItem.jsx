import { View, Text, Image } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors'

const PetListItem = ({ pet }) => {
  return (
    <View style={{
      padding: 10,
      marginTop: 10,
      marginRight: 15,
      borderRadius: 15,
      backgroundColor: Colors.WHITE,

    }}>
      <Image source={{ uri: pet?.imageUrl }}
        style={{
          width: 200,
          height: 170,
          objectFit: 'cover',
          borderRadius: 11,
        }}
      />

      <Text style={{
        fontFamily: 'outfit-medium',
        fontSize: 20,
        paddingTop: 5
      }}>
        {pet.name}
      </Text>

      <View style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Text style={{
          fontFamily: 'outfit',
          color: "#a6a39c",
          fontSize: 15
        }}>
          {pet.breed}
        </Text>

        <Text style={{
          backgroundColor: Colors.LIGHT_PRIMARY,
          paddingHorizontal: 10,
          borderRadius: 99,
          borderColor: Colors.PRIMARY,
          borderWidth: .7
        }}>
          {pet.age} Year
        </Text>
      </View>

    </View>
  )
}

export default PetListItem