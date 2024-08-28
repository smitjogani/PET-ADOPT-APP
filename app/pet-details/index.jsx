import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'

import PetInfo from "../../components/PetDeatils/PetInfo"
import PetSubInfo from '../../components/PetDeatils/PetSubInfo'
import AboutPet from '../../components/PetDeatils/AboutPet'
import OwnerInfo from '../../components/PetDeatils/OwnerInfo'
import Colors from '../../constants/Colors'

const PetDetails = () => {

    const pet = useLocalSearchParams();
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            headerTransparent: true,
            headerTitle: ''
        })
    }, []);

    return (
        <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
            <PetInfo pet={pet} />
            <PetSubInfo pet={pet} />
            <AboutPet pet={pet} />
            <OwnerInfo pet={pet} />

            <View style={{
                height: 70,
            }}>

            </View>

            <View style={{
                position: 'absolute',
                width: '100%',
                bottom: 0
            }}>
                <TouchableOpacity style={{
                    backgroundColor: Colors.PRIMARY,
                    padding: 15
                }}>
                    <Text style={{
                        textAlign: 'center',
                        fontFamily: 'outfit-medium',
                        fontSize: 20
                    }}>Adopt Me</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default PetDetails