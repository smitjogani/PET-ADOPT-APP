import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import Shared from "../../Shared/Shared"
import { useUser } from '@clerk/clerk-expo'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../config/FirebaseConfig'

const favourite = () => {

  const { user } = useUser();
  const [favIds, setFavIds] = useState([]);


  useEffect(() => {
    user && GetFavPetIds();
  }, [])

  const GetFavPetIds = async () => {
    const result = await Shared.GetFavList(user);
    setFavIds(result?.favorites);
    GetFavPetList();
  }

  const GetFavPetList = async () => {
    const q = query(collection(db, 'Pets'), where('id', 'in', favIds));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
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
    </View>
  )
}

export default favourite