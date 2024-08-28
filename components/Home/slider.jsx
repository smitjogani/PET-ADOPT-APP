import { View, Text, FlatList, Image, StyleSheet, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/FirebaseConfig"



const Slider = () => {

  const [sliderList, setSliderList] = useState([]);

  useEffect(() => {
    GetSliders();
  }, [])

  const GetSliders = async () => {
    setSliderList([]);

    const snapshot = await getDocs(collection(db, 'Sliders'));

    snapshot.forEach((doc) => {
      setSliderList(sliderList => [...sliderList, doc.data()])
    })
  }

  return (
    <View style={{
      marginTop: 15
    }}>
      <FlatList
        horizontal={true}
        data={sliderList}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View>
            <Image source={{ uri: item?.imageUrl }} style={Styles?.sliderImage} />
          </View>
        )}
      />
    </View>
  )
}

const Styles = StyleSheet.create({
  sliderImage: {
    height: 175,
    width: Dimensions.get('screen').width * 0.9,
    borderRadius: 15,
    marginRight: 15
  }
})

export default Slider