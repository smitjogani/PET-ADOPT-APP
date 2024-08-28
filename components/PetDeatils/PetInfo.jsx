import { View, Text, Image } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from "../../constants/Colors"

const PetInfo = ({ pet }) => {
    return (
        <View>
            <Image source={{ uri: pet?.imageUrl }}
                style={{
                    width: '100%',
                    objectFit: 'cover',
                    height: 400
                }} />
            <View style={{
                padding: 20,
                display:'flex',
                flexDirection:'row',
                alignItems:'center',
                justifyContent:'space-between'
            }}>
                <View>
                    <Text style={{
                        fontFamily: 'outfit-bold',
                        fontSize: 27
                    }}>{pet?.name}</Text>

                    <Text style={{
                        fontFamily: 'outfit',
                        fontSize: 16,
                        color: Colors.GRAY
                    }}>
                        {pet?.address+""} 
                    </Text>
                </View>

                <Ionicons name="heart-outline" size={34} color="black" />
            </View>
        </View>
    )
}

export default PetInfo