import { View, Text, Image } from 'react-native'
import React from 'react'
import Colors from "../../constants/Colors"
import { Link } from 'expo-router';

const UserItem = ({ userInfo }) => {
    return (
        <Link href={'/chat?id=' + userInfo.docId}>

            <View style={{
                marginVertical: 7,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
            }}>
                <Image source={{ uri: userInfo?.image }}
                    style={{
                        width: 40,
                        height: 40,
                        borderRadius: 99
                    }}
                />
                <Text style={{
                    fontFamily: 'outfit',
                    fontSize: 20
                }}>{userInfo?.name}</Text>
            </View>
        </Link >
    )
}

export default UserItem