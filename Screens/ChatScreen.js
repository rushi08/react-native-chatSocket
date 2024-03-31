import {useContext, useEffect} from 'react';
import {
  FlatList,
  Image,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {GlobalContext} from '../Context';
import {AntDesign} from '@expo/vector-icons';
import Chatcomponent from '../Components/Chatcomponent';
import NewGroupModal from '../Components/Model';
import {socket} from '../Utils';
export default function Chatscreen({navigation}) {
  const {
    currentUser,
    allChatRooms,
    setAllChatRooms,
    modalVisible,
    setModalVisible,
    setCurrentUser,
    setShowLoginView,
  } = useContext(GlobalContext);

  useEffect(() => {
    socket.emit('getAllGroups');

    socket.on('groupList', groups => {
      setAllChatRooms(groups);
    });
  }, [socket]);

  function handleLogout() {
    console.log('helloooo');
    setCurrentUser('');
    setShowLoginView(false);
  }

  useEffect(() => {
    if (currentUser.trim() === '') navigation.navigate('HomeScreen');
  }, [currentUser]);

  return (
    <View style={styles.mainWrapper}>
      <View style={styles.topContainer}>
        <View style={styles.header}>
          <Text style={styles.heading}>Welcome {currentUser}!</Text>
          <Pressable onPress={handleLogout}>
            {/* <AntDesign name="logout" size={30} color={'black'} /> */}
            <Image
              source={require('../Assets/log-out.png')}
              style={{height: 30, width: 30}}
              tintColor={'#703efe'}
            />
          </Pressable>
        </View>
      </View>
      <View style={styles.listContainer}>
        {allChatRooms && allChatRooms.length > 0 ? (
          <FlatList
            data={allChatRooms}
            renderItem={({item}) => <Chatcomponent item={item} />}
            keyExtractor={item => item.id}
          />
        ) : null}
      </View>
      <View style={styles.bottomContainer}>
        <Pressable onPress={() => setModalVisible(true)} style={styles.button}>
          <View>
            <Text style={styles.buttonText}>Create New Group</Text>
          </View>
        </Pressable>
      </View>
      {modalVisible && <NewGroupModal />}
    </View>
  );
}

const styles = StyleSheet.create({
  mainWrapper: {
    backgroundColor: '#eee',
    flex: 1,
  },
  topContainer: {
    backgroundColor: '#fff',
    height: 70,
    width: '100%',
    padding: 10,
    justifyContent: 'center',
    marginBottom: 15,
    flex: 0.3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  listContainer: {
    flex: 3.4,
    paddingHorizontal: 10,
  },
  bottomContainer: {
    flex: 0.3,
    padding: 10,
  },
  button: {
    backgroundColor: '#703efe',
    padding: 12,
    width: '100%',
    elevation: 1,
    borderRadius: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
});
