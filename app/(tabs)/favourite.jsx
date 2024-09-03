import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Shared from "../../Shared/Shared"
import { useUser } from '@clerk/clerk-expo'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../config/FirebaseConfig'
import { useRouter } from 'expo-router'
import Colors from "../../constants/Colors"

const favourite = () => {

  const router = useRouter();

  const { user } = useUser();
  const [favIds, setFavIds] = useState([]);
  const [favPetList, setFavPetList] = useState([]);

  useEffect(() => {
    user && GetFavPetIds();
  }, [])

  const GetFavPetIds = async () => {
    const result = await Shared.GetFavList(user);
    setFavIds(result?.favorites);
    console.log("Fav ==> ", favIds);
    GetFavPetList();
  }

  const GetFavPetList = async () => {
    const q = query(collection(db, 'Pets'), where('id', 'in', ["1725267863180", "1725267863180", "1725267954157"]));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      setFavPetList(prev => [...prev, doc.data()]);
    })
  }

  return (
    <View style={{
      padding: 20,
      marginTop: 20
    }}>
      <Text style={{
        fontFamily: 'outfit-medium',
        fontSize: 30
      }}>
        Favourite
      </Text>
      <FlatList
        data={favPetList}
        numColumns={2}
        renderItem={({ item, index }) => (
          <View>
            <TouchableOpacity style={{
              padding: 10,
              marginTop: 10,
              marginRight: 15,
              borderRadius: 15,
              backgroundColor: Colors.WHITE,
            }}
              onPress={() => router.push({
                pathname: '/pet-details',
                params: item
              })}
            >

              <Image source={{ uri: item?.imageUrl }}
                style={{
                  width: 165,
                  height: 140,
                  objectFit: 'cover',
                  borderRadius: 11,
                }}
              />

              <Text style={{
                fontFamily: 'outfit-medium',
                fontSize: 20,
                paddingTop: 5
              }}>
                {item?.name}
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
                  {item?.breed}
                </Text>

                <Text style={{
                  backgroundColor: Colors.LIGHT_PRIMARY,
                  paddingHorizontal: 10,
                  borderRadius: 99,
                  borderColor: Colors.PRIMARY,
                  borderWidth: .7
                }}>
                  {item?.age} Year
                </Text>
              </View>

            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  )
}

export default favourite