import {
  Alert,
  ImageBackground,
  Keyboard,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import homeImage from '../Assets/chatback1.png';
import {useContext, useEffect} from 'react';
import {GlobalContext} from '../Context';

export default function Homescreen({navigation}) {
  const {
    showLoginView,
    setShowLoginView,
    currentUserName,
    setCurrentUserName,
    currentUser,
    setCurrentUser,
    allUsers,
    setAllUsers,
  } = useContext(GlobalContext);

  function handleRegisterAndSignIn(isLogin) {
    if (currentUserName.trim() !== '') {
      const index = allUsers.findIndex(
        userItem => userItem === currentUserName,
      );
      if (isLogin) {
        if (index === -1) {
          Alert.alert('Please register first');
        } else {
          setCurrentUser(currentUserName);
        }
      } else {
        if (index === -1) {
          allUsers.push(currentUserName);
          setAllUsers(allUsers);
          setCurrentUser(currentUserName);
        } else {
          Alert.alert('Already registered ! Please login');
        }
      }
      setCurrentUserName('');
    } else {
      Alert.alert('User name field is empty');
    }
    Keyboard.dismiss();
  }

  useEffect(() => {
    if (currentUser.trim() !== '') navigation.navigate('ChatScreen');
  }, [currentUser]);

  console.log(allUsers, currentUser);

  return (
    <View style={styles.mainWrapper}>
      <ImageBackground
        source={homeImage}
        style={styles.homeImage}
        resizeMode="cover"
      />
      <View style={styles.content}>
        {showLoginView ? (
          <View style={styles.infoBlock}>
            <View style={styles.loginInputContainer}>
              <Text style={styles.heading}>Enter Your Name</Text>
              <TextInput
                autoCorrect={false}
                placeholder="Enter your name"
                style={styles.loginInput}
                onChangeText={value => setCurrentUserName(value)}
                value={currentUserName}
              />
            </View>
            <View style={styles.buttonWrapper}>
              <Pressable
                onPress={() => handleRegisterAndSignIn(false)}
                style={styles.button}>
                <View>
                  <Text style={styles.buttonText}>Register</Text>
                </View>
              </Pressable>
              <Pressable
                onPress={() => handleRegisterAndSignIn(true)}
                style={styles.button}>
                <View>
                  <Text style={styles.buttonText}>Login</Text>
                </View>
              </Pressable>
            </View>
          </View>
        ) : (
          <View style={styles.infoBlock}>
            <Text style={styles.heading}>Connect , Grow and Inspire</Text>
            <Text style={styles.subHeading}>
              Connect people around the world for free
            </Text>
            <Pressable
              style={styles.button}
              onPress={() => setShowLoginView(true)}>
              <View>
                <Text style={styles.buttonText}>Let's Chat</Text>
              </View>
            </Pressable>
          </View>
        )}
      </View>
      <StatusBar backgroundColor={'#703EFE'} />
    </View>
  );
}

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
  },
  homeImage: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '98%',
    // backgroundColor: 'red',
    position: 'absolute',
    top: '40%',
    backgroundColor: 'rgba(255, 255, 255, .7)',
    borderRadius: 10,
    alignSelf: 'center',
    // bottom: 0,
  },
  infoBlock: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  subHeading: {
    fontSize: 15,
    color: '#703efe',
    marginBottom: 15,
  },
  loginInput: {
    borderRadius: 50,
    borderWidth: 1,
    padding: 8,
  },
  button: {
    backgroundColor: '#703efe',
    padding: 15,
    marginVertical: 10,
    width: '34%',
    elevation: 1,
    borderRadius: 50,
  },
  buttonWrapper: {
    flexDirection: 'row',
    gap: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
});
