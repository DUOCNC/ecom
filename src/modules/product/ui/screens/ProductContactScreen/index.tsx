import React, {useCallback, useEffect, useMemo} from 'react';
import {Layout} from 'common-ui';
import {MainStackScreenProps} from 'ui/screens/MainStack';
import CTTypography from 'components/CTTypography';
import {Image, Linking, TouchableOpacity, View} from 'react-native';
import {ThemeStyle} from 'assets/theme';
import {ic_mail, ic_phone2} from 'assets/images';
import ContactStyle from './style';
import PhoneUtils from 'utils/PhoneUtils';
import {Font} from 'components/Base/Text/enums';
import {useAuth} from 'providers/contexts/AuthContext';

type Props = MainStackScreenProps<'ProductContact'>;
const ProductContactScreen: React.FC<Props> = ({navigation, route}) => {
  const {storeId} = route.params;
  const {allLocations} = useAuth();

  const store = useMemo(() => {
    return allLocations.find(e => e.id === storeId);
  }, [allLocations, storeId]);

  const handleCall = useCallback(() => {
    if (!store?.hotline) {
      return;
    }
    PhoneUtils.callNumber(store?.hotline);
  }, [store]);

  useEffect(() => {
    if (store) {
      return;
    }
    navigation.goBack();
  }, [navigation, store]);
  return (
    <Layout.Screen barStyle="dark-content">
      <Layout.ScreenHeaderBack
        title={store?.name}
        onBackPress={() => {
          navigation.goBack();
        }}
      />
      <Layout.Container>
        <View style={ContactStyle.container}>
          <TouchableOpacity style={ContactStyle.row} onPress={handleCall}>
            <Image source={ic_phone2} style={ContactStyle.icon} />
            <CTTypography.Text
              level="2"
              font={Font.Medium}
              text={`Gọi ${store?.hotline}`}
              style={ContactStyle.btnText}
            />
          </TouchableOpacity>
          <View style={ThemeStyle.separator} />
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(`sms:&addresses=${store?.hotline}&body=`);
            }}
            style={ContactStyle.row}>
            <Image source={ic_mail} style={[ContactStyle.icon]} />
            <CTTypography.Text
              level="2"
              text="Gửi SMS"
              font={Font.Medium}
              style={ContactStyle.btnText}
            />
          </TouchableOpacity>
          <View style={ThemeStyle.separator} />
        </View>
      </Layout.Container>
    </Layout.Screen>
  );
};

export default ProductContactScreen;
