import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, getDocs, where } from "firebase/firestore"
import { query } from "firebase/database"
import { db } from "../../config/FirebaseConfig"
import { useUser } from '@clerk/clerk-expo'
import UserItem from '../../components/Inbox/UserItem'
import Colors from '../../constants/Colors'

const inbox = () => {

  const { user } = useUser();
  const [userList, setUserList] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    user && GetUserList();
  }, [user])

  const GetUserList = async () => {
    setLoader(true);
    const q = query(collection(db, 'Chat'), where('userIds', 'array-contains', user?.primaryEmailAddress?.emailAddress));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(doc => {
      setUserList(prevList => [...prevList, doc.data()]);
    })
    setLoader(false);
  }

  const MapOtherUserList = () => {
    const list = [];
    userList.forEach((record) => {
      const otherUser = record.users?.filter(user => user?.email != user?.primaryEmailAddress?.emailAddress)
      const result = {
        docId: record.id,
        ...otherUser[0]
      }
      list.push(result)
    })
    return list;
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
        Inbox
      </Text>

      <FlatList
        style={{
          marginTop: 20
        }}
        data={MapOtherUserList()}
        onRefresh={() => GetUserList()}
        refreshing={loader}
        renderItem={({ item, index }) => (
          <>
            <UserItem userInfo={item} key={index} />
            <View style={{
              borderWidth: 0.2,
              borderColor: Colors.LIGHT_GRAY,
              marginVertical: 7
            }}></View>
          </>
        )}
      />
    </View>
  )
}

export default inbox