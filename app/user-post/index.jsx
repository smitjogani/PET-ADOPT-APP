import { View, Text, FlatList, TouchableOpacity, Image, Pressable, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from 'expo-router'
import { query } from "firebase/database"
import { collection, deleteDoc, doc, getDocs, where } from 'firebase/firestore'
import { db } from "../../config/FirebaseConfig"
import { useUser } from '@clerk/clerk-expo'
import Colors from '../../constants/Colors'


const UserPost = () => {

    const navigation = useNavigation();
    const { user } = useUser();
    const [userPostList, setUserPostList] = useState([]);
    const [loader, serLoader] = useState(false);


    useEffect(() => {
        navigation.setOptions({
            headerTitle: 'User Post'
        });
        user && GetUserPost();
    }, [user])

    const GetUserPost = async () => {
        serLoader(true)
        setUserPostList([]);
        const q = query(collection(db, 'Pets'), where('email', '==', user?.primaryEmailAddress?.emailAddress));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            setUserPostList(prev => [...prev, doc.data()]);
        })
        serLoader(false)
    }

    const onDeletePost = async (docId) => {
        Alert.alert('Do you want to Delete?', 'Do you really want to delete this post', [
            {
                text: 'Cancel',
                onPress: () => console.log("Cancel Clicked"),
                style: 'cancel'
            },
            {
                text: 'Delete',
                onPress: () => deletePost(docId),
            }
        ])
    }

    const deletePost = async (docId) => {
        await deleteDoc(doc(db, 'Pets', docId));
        GetUserPost();
    }

    return (
        <View style={{
            padding: 20,
        }}>
            <Text style={{
                fontFamily: 'outfit-medium',
                fontSize: 30
            }}>
                UserPost
            </Text>

            <FlatList
                data={userPostList}
                refreshing={loader}
                onRefresh={GetUserPost}
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
                        <Pressable onPress={() => onDeletePost(item?.id)} style={{
                            backgroundColor: Colors.LIGHT_PRIMARY,
                            padding: 5,
                            borderRadius: 7,
                            marginTop: 5,
                            marginRight: 10
                        }}>
                            <Text style={{
                                fontFamily: 'outfit',
                                textAlign: 'center'
                            }}>Delete</Text>
                        </Pressable>
                    </View>
                )}
            />

        </View>
    )
}

export default UserPost