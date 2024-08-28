import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { db } from "../../config/FirebaseConfig"
import { getDocs, collection } from 'firebase/firestore'
import Colors from '../../constants/Colors'

const Category = ({category}) => {

  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Dogs');

  useEffect(() => {
    GetCategories();
  }, [])

  const GetCategories = async () => {

    setCategoryList([]);

    const snapshot = await getDocs(collection(db, 'Category'));
    snapshot.forEach((doc) => {
      setCategoryList(categoryList => [...categoryList, doc.data()]);
    })
  }

  return (
    <View style={{
      marginTop: 20,
    }}>

      <Text style={{
        fontFamily: 'outfit-medium',
        fontSize: 20
      }}>Category</Text>

      <FlatList
        style={{
          paddingTop: 8
        }}
        numColumns={4}
        data={categoryList}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => {
              setSelectedCategory(item.name);
                category(item.name)
              }}
            style={{
              flex: 1
            }}>
            <View style={[style.container,

            selectedCategory == item.name && style.selectedCategoryComtainer]}>
              <Image source={{ uri: item?.imageUrl }}
                style={{
                  width: 45,
                  height: 45,
                }} />
            </View>
            <Text style={{
              textAlign: 'center',
              fontFamily: 'outfit',
              fontSize: 16
            }}>{item?.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    backgroundColor: Colors.LIGHT_PRIMARY,
    padding: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 15,
    borderColor: Colors.PRIMARY,
    margin: 5
  },
  selectedCategoryComtainer: {
    backgroundColor: Colors.SECONDARY,
    borderColor: Colors.SECONDARY
  }
})


export default Category;