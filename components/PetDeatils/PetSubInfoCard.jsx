import { View, Text, Image } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors'

const PetSubInfoCard = ({ icon, title, value }) => {
    return (

        <View style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: Colors.WHITE,
            padding: 10,
            borderWidth: 1,
            borderRadius: 15,
            margin: 5,
            flex: 1,
            borderColor: Colors.PRIMARY,
            gap: 10,
        }}>
            <Image source={icon}
                style={{
                    width: 40,
                    height: 40
                }} />
            <View style={{
                flex:1
            }}>
                <Text style={{
                    fontFamily: 'outfit',
                    fontSize: 16,
                    color: Colors.LIGHT_GRAY
                }}>
                    {title}
                </Text>
                <Text style={{
                    fontFamily: 'outfit-medium',
                    fontSize: 18
                }}>
                    {value}
                </Text>
            </View>
        </View>
    )
}

export default PetSubInfoCard