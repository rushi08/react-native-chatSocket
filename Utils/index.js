import {Platform} from 'react-native';
import {io} from 'socket.io-client';
export const BaseUrl =
  Platform.OS === 'android'
    ? 'http://yourIPAddress:3000/' // replace you ip address
    : 'http://localhost:3000';

export const socket = io.connect('http://yourIPAddress:3000');
