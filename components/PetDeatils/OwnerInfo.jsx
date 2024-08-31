import { View, Text, Image } from 'react-native'
import React from 'react'
import Colors from "../../constants/Colors"
import Ionicons from '@expo/vector-icons/Ionicons';

const OwnerInfo = ({ pet }) => {
    return (
        <View style={{
            paddingHorizontal: 20,
            marginHorizontal: 20,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 20,
            borderWidth: 1,
            backgroundColor: Colors.LIGHT_PRIMARY,
            borderRadius: 15,
            padding: 10,
            marginBottom: 10,
            borderColor: Colors.PRIMARY
        }}>
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 20
            }}>
                <Image source={{ uri: pet?.userImage }}
                    style={{
                        width: 50,
                        height: 50,
                        borderRadius: 99
                    }}
                />
                <View>
                    <Text style={{
                        fontFamily: 'outfit-medium',
                        fontSize: 20
                    }}>
                        {pet?.userName}
                    </Text>
                    <Text style={{
                        fontFamily: 'outfit',
                        color: Colors.LIGHT_GRAY
                    }}>Pet Owner</Text>
                </View>
            </View>
            <View>
                <Ionicons name="send" size={26} color="black" />
            </View>
        </View>
    )
}

export default OwnerInfo