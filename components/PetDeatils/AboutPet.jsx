import { View, Text, Pressable } from 'react-native'
import React, { useState } from 'react'
import Colors from "../../constants/Colors"

const AboutPet = ({ pet }) => {

    const [readMore, setReadMore] = useState(true);

    return (
        <View style={{
            padding: 20
        }}>
            <Text style={{
                fontFamily: 'outfit-medium',
                fontSize: 20
            }}>About {pet?.name}</Text>

            <Text
                numberOfLines={readMore ? 3 : 20}
                style={{
                    fontFamily: 'outfit',
                    fontSize: 14,
                    color: Colors.LIGHT_GRAY
                }}>
                {pet?.about}
            </Text>

            <Pressable onPress={()=>setReadMore(false)}>
                <Text>
                    {readMore && <Text style={{
                        fontFamily: 'outfit-medium',
                        fontSize: 14,
                        color: Colors.SECONDARY
                    }}>Read More</Text>}
                </Text>
            </Pressable>

        </View>
    )
}

export default AboutPet