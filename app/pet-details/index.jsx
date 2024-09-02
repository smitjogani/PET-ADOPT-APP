import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router'

import PetInfo from "../../components/PetDeatils/PetInfo"
import PetSubInfo from '../../components/PetDeatils/PetSubInfo'
import AboutPet from '../../components/PetDeatils/AboutPet'
import OwnerInfo from '../../components/PetDeatils/OwnerInfo'
import Colors from '../../constants/Colors'
import { useUser } from '@clerk/clerk-expo'
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore'
import { db } from '../../config/FirebaseConfig'

const PetDetails = () => {

    const pet = useLocalSearchParams();
    const navigation = useNavigation();
    const router = useRouter();
    const { user } = useUser();

    useEffect(() => {
        navigation.setOptions({
            headerTransparent: true,
            headerTitle: ''
        })
    }, []);

    const InitiateChat = async () => {
        const docId1 = user?.primaryEmailAddress?.emailAddress + '_' + pet?.email;
        const docId2 = pet?.email + user?.primaryEmailAddress?.emailAddress;


        const q = query(collection(db, 'Chat'),where('id', 'in', [docId1, docId2]));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(doc => {
            ``
            router.push({
                pathname: '/chat',
                params: {id:doc.id}
            })
        })

        if(querySnapshot.docs?.length == 0)
        {
            await setDoc(doc(db, 'Chat', docId1), {
                id:docId1,
                users:[
                    {
                        email: user?.primaryEmailAddress?.emailAddress,
                        image: user?.imageUrl,
                        name: user?.fullName
                    },
                    {
                        email: pet?.email,
                        imageUrl: pet?.userImage,
                        name: pet?.userName
                    }
                ],
                userIds:[user?.primaryEmailAddress?.emailAddress,pet?.email]
            });
            router.push({
                pathname: '/chat',
                params:{
                    id: docId1
                }
            })
        }
    }

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
                <TouchableOpacity
                    onPress={InitiateChat}
                    style={{
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