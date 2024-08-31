import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors'
import { useRouter } from 'expo-router'
import MarkFav from '../PetDeatils/MarkFav'

const PetListItem = ({ pet }) => {

  const router = useRouter();

  return (
    <TouchableOpacity style={{
      padding: 10,
      marginTop: 10,
      marginRight: 15,
      borderRadius: 15,
      backgroundColor: Colors.WHITE,
    }}
      onPress={() => router.push({
        pathname: '/pet-details',
        params: pet
      })}
    >

      <Image source={{ uri: pet?.imageUrl }}
        style={{
          width: 220,
          height: 180,
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

    </TouchableOpacity>
  )
}

export default PetListItem