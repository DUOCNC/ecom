import {ic_phone2} from 'assets/images';
import {ThemeStyle} from 'assets/theme';
import {Font} from 'components/Base/Text';
import CTLayout from 'components/CTLayout';
import CTStatusBar from 'components/CTStatusBar';
import CTTypography from 'components/CTTypography';
import React, {createRef} from 'react';
import {TouchableOpacity, View, Image, Linking} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {normalize} from 'utils/DimensionsUtils';
import {HelpData} from './data';
import {HelpStyle} from './style';
import PhoneUtils from 'utils/PhoneUtils';

const HelpScreen: React.FC = () => {
  const callRef = createRef<RBSheet>();
  const bottom = useSafeAreaInsets().bottom;
  const onPressItem = (id: number) => {
    if (id === 1) {
      onPressHotline();
      return;
    }
    if (id === 2) {
      onPressGapo();
      return;
    }
    if (id === 3) {
      onPressFeedback();
      return;
    }
    console.error('ID ', id, 'không chính xác');
  };

  const onPressHotline = () => {
    callRef.current?.open();
  };

  const onCall = () => {
    PhoneUtils.callNumber('0888464258');
  };

  const onPressGapo = () => {
    Linking.openURL('https://www.gapowork.vn/group/unicorn');
  };
  const onPressFeedback = () => {
    Linking.openURL(
      'https://docs.google.com/forms/d/e/1FAIpQLSfjs8OeH4koFLiDtDZKCfufdwv_0rOfRBeuL3ARWjuPL-R3iA/viewform',
    );
  };

  const onCancel = () => {
    callRef.current?.close();
  };

  return (
    <CTLayout.Container>
      <CTStatusBar barStyle="dark-content" />
      <CTLayout.HeaderBack title="Trợ giúp" />
      <CTLayout.Body>
        <View style={HelpStyle.view}>
          {HelpData.map(item => (
            <React.Fragment key={item.id.toString()}>
              <TouchableOpacity
                onPress={() => onPressItem(item.id)}
                style={HelpStyle.btn}>
                <View style={HelpStyle.itemContainer}>
                  <Image source={item.icon} />
                  <CTTypography.Text
                    style={HelpStyle.itemText}
                    level="2"
                    text={item.title}
                  />
                </View>
              </TouchableOpacity>
              <View style={ThemeStyle.separator} />
            </React.Fragment>
          ))}
        </View>
      </CTLayout.Body>
      <RBSheet
        height={normalize(104) + bottom}
        customStyles={{
          container: HelpStyle.modal,
        }}
        ref={callRef}>
        <View>
          <TouchableOpacity onPress={onCall} style={[HelpStyle.btnModal]}>
            <Image source={ic_phone2} />
            <CTTypography.Text
              style={[HelpStyle.txtBtn, HelpStyle.txtCall]}
              level="0"
              text="Gọi 0888 464 258"
              font={Font.Regular}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onCancel}
            style={[HelpStyle.btnModal, HelpStyle.btnCancel]}>
            <CTTypography.Text
              style={HelpStyle.txtBtn}
              level="0"
              text="Hủy"
              font={Font.Medium}
            />
          </TouchableOpacity>
        </View>
      </RBSheet>
    </CTLayout.Container>
  );
};

export default HelpScreen;
