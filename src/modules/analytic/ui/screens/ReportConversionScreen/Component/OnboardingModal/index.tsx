import React, {useState} from 'react';
import {Modal, View, ScrollView, TouchableOpacity} from 'react-native';
import {style} from './style';
import {Typography} from 'common-ui';
import {colors} from 'assets/v2';
import {ImageSourcePropType, Image} from 'react-native';

export interface OnBoardingPage {
  key: number;
  title: string;
  subTitle?: string;
  backgroundColor: string;
  image: ImageSourcePropType;
}

interface Props {
  visible: boolean;
  onClose: () => void;
  pages: Array<OnBoardingPage>;
}

const OnboardingModal: React.FC<Props> = props => {
  const {visible, onClose, pages} = props;
  const [activePage, setActivePage] = useState<number>(0);

  const handlePageChange = (pageNumber: number) => {
    setActivePage(pageNumber);
  };

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={style.onboardingContainer}>
        <View style={style.container}>
          <ScrollView
            snapToAlignment="center"
            horizontal={true}
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={event => {
              const pageNumber = Math.round(
                event.nativeEvent.contentOffset.x /
                  event.nativeEvent.layoutMeasurement.width,
              );
              setActivePage(pageNumber);
            }}>
            {pages.map((page: OnBoardingPage, index: number) => (
              <View key={index} style={style.page}>
                <Image source={page.image} />
              </View>
            ))}
          </ScrollView>
          <View style={style.viewDot}>
            {pages
              .map((p: OnBoardingPage) => {
                return p.key;
              })
              .map((pageNumber: number) => (
                <TouchableOpacity
                  key={pageNumber}
                  onPress={() => handlePageChange(pageNumber)}>
                  <View style={style.dot}>
                    <View
                      style={pageNumber === activePage && style.dotActive}
                    />
                  </View>
                </TouchableOpacity>
              ))}
          </View>
          <TouchableOpacity style={style.btnClose} onPress={() => onClose()}>
            <Typography
              text="Tôi đã hiểu"
              color={colors.base.white}
              textType="medium"
            />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default OnboardingModal;
