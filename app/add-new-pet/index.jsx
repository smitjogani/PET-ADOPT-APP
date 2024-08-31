import { View, Text, Image, TextInput, StyleSheet, ScrollView, TouchableOpacity, Pressable, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import Colors from "../../constants/Colors"
import { useNavigation } from 'expo-router'
import { Picker } from '@react-native-picker/picker'
import { db } from "../../config/FirebaseConfig"
import { getDocs, collection } from 'firebase/firestore'
import * as ImagePicker from 'expo-image-picker';

const AddNewPet = () => {

  const [categoryList, setCategoryList] = useState([]);
  const [formData, setFormData] = useState();
  const [gender, setGender] = useState();
  const [selectedCategory, setSelectedCategory] = useState({
    category: 'Dogs', sex: "Male"
  });
  const [image, setImage] = useState();

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Add New Pet'
    })
    GetCategories();
  }, []);

  const GetCategories = async () => {
    setCategoryList([])
    const snapshot = await getDocs(collection(db, 'Category'));
    snapshot.forEach((doc) => {
      setCategoryList(categoryList => [...categoryList, doc.data()]);
    })
  }

  const imagePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  }

  const onsubmit = () => {
    if (Object.keys(formData).length < 8) {
      ToastAndroid.show('Enter All Details', ToastAndroid.SHORT);
      return;
    }
  }

  const handleInputChange = (fieldName, fieldValue) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: fieldValue
    }))
  }

  return (
    <ScrollView style={{
      padding: 20
    }}>
      <Text style={{
        fontFamily: 'outfit-medium',
        fontSize: 24,
        marginBottom: 10
      }}>
        Add New Pet for Adoption
      </Text>

      <Pressable onPress={imagePicker}>
        {!image ? <Image source={require('../../assets/images/placeholder.png')} style={{
          width: 100,
          height: 100,
          borderWidth: 1,
          borderColor: "#000",
          borderRadius: 15,
          marginBottom: 8
        }} /> :
          <Image source={{ uri: image }}
            style={{
              width: 100,
              height: 100,
              borderColor: "#000",
              borderRadius: 15,
              marginBottom: 8
            }} />
        }
      </Pressable>

      <View style={style.inputContainer}>
        <Text style={style.lable}>Pet Name *</Text>
        <TextInput placeholder='Enter pet name' style={style.input} onChangeText={(value) => handleInputChange('name', value)} />
      </View>

      <View style={style.inputContainer}>
        <Text style={style.lable}>Pet Category *</Text>
        <Picker
          style={style.input}
          selectedValue={selectedCategory}
          onValueChange={(itemValue, itemIndex) => {
            setSelectedCategory(itemValue),
              handleInputChange('category', itemValue)
          }}>

          {
            categoryList.map((category, index) => (
              <Picker.Item key={index} label={category.name} value={category.name} />
            ))
          }
        </Picker>
      </View>

      <View style={style.inputContainer}>
        <Text style={style.lable}>Breed *</Text>
        <TextInput placeholder="Enter pet's breed" style={style.input} onChangeText={(value) => handleInputChange('breed', value)} />
      </View>

      <View style={style.inputContainer}>
        <Text style={style.lable}>Age *</Text>
        <TextInput placeholder="Enter pet's age" style={style.input} onChangeText={(value) => handleInputChange('age', value)} />
      </View>

      <View style={style.inputContainer}>
        <Text style={style.lable}>Gender *</Text>
        <Picker
          style={{
            padding: 10,
            backgroundColor: Colors.WHITE,
            borderRadius: 7,
            fontFamily: 'outfit'
          }}
          selectedValue={gender}
          onValueChange={(itemValue, itemIndex) => {
            setGender(itemValue),
              handleInputChange('sex', itemValue)
          }}>
          <Picker.Item label="Male" value="Male" />
          <Picker.Item label="Female" value="Female" />
        </Picker>
      </View>

      <View style={style.inputContainer}>
        <Text style={style.lable}>Weight *</Text>
        <TextInput placeholder="Enter pet's weight" style={style.input} onChangeText={(value) => handleInputChange('weight', value)} />
      </View>

      <View style={style.inputContainer}>
        <Text style={style.lable}>Address *</Text>
        <TextInput placeholder="Enter pet's address" style={style.input} onChangeText={(value) => handleInputChange('address', value)} />
      </View>

      <View style={style.inputContainer}>
        <Text style={style.lable}>About *</Text>
        <TextInput style={style.input} multiline={true} numberOfLines={5} onChangeText={(value) => handleInputChange('about', value)} />
      </View>

      <TouchableOpacity style={style.button} onPress={onsubmit}>
        <Text style={{
          fontFamily: 'outfit-medium',
          textAlign: 'center',
          fontSize: 16
        }}>Submit</Text>
      </TouchableOpacity>

    </ScrollView>
  )
}

const style = StyleSheet.create({
  inputContainer: {
    marginVertical: 5
  },

  input:
  {
    padding: 10,
    backgroundColor: Colors.WHITE,
    borderRadius: 7,
    fontFamily: 'outfit'
  },
  lable: {
    marginVertical: 5,
    fontFamily: 'outfit-medium'
  },
  button: {
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 7,
    textAlign: 'center',
    marginTop: 15,
    marginBottom: 48
  }
})

export default AddNewPet