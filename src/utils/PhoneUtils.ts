import {Linking, Platform} from 'react-native';
import {showWarning} from './ToastUtils';

const PhoneUtils = {
  callNumber: (phone: string) => {
    let phoneNumber = phone;
    if (Platform.OS !== 'android') {
      phoneNumber = `telprompt:${phone}`;
    } else {
      phoneNumber = `tel:${phone}`;
    }
    Linking.canOpenURL(phoneNumber)
      .then(supported => {
        if (!supported) {
          showWarning('Phone number is not available');
        } else {
          return Linking.openURL(phoneNumber);
        }
      })
      .catch(err => console.log(err));
  },
};

export default PhoneUtils;
