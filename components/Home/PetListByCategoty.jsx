import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'

import Category from "./Category"
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from "../../config/FirebaseConfig"
import PetListItem from './PetListItem'

const PetListByCategoty = () => {

  useEffect(() => {
    GetPetList('Dogs')
  }, [])

  const [petList, setPetList] = useState([]);
  const [loader, setLoader] = useState(false);

  /**
   * used to get pet list on Category selection
   * @param {*} category
   */

  const GetPetList = async (category) => {
    setLoader(true);

    setPetList([]);
    const q = query(collection(db, "Pets"), where('category', '==', category));

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(doc => {
      setPetList(petList => [...petList, doc.data()]);
    })

    setLoader(false);
  }



  return (
    <View>
      <Category category={(value) => {
        GetPetList(value);
      }} />

      <FlatList
        style={{ marginTop: 10 }}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={petList}
        refreshing={loader}
        onRefresh={() => GetPetList('Dogs')}
        renderItem={({ item, index }) => (
          <PetListItem pet={item} />
        )}
      />

    </View>
  )
}

export default PetListByCategoty