import {CTButton} from 'components/Button';
import CTTypography from 'components/CTTypography';
import React, {useRef, useState} from 'react';
import {Dimensions, ScrollView, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {IntroStyle} from './style';
import {dataIntro} from './data';
import PagerIntro from './PagerIntro';
import Indicator from './Indicator';
import LocalStorageUtils from 'utils/LocalStorageUtils';
import {useAppDispatch} from 'hook/CustomReduxHook';
import {Font} from 'components/Base/Text';
import {ThemeStyle} from 'assets/theme';
import CTStatusBar from 'components/CTStatusBar';
import {normalize} from 'utils/DimensionsUtils';
import {skipOnboard} from 'reduxs';

const MAX_WIDTH = Dimensions.get('screen').width;

const IntroScreen: React.FC = () => {
  const {top, bottom} = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const [page, setPage] = useState<number>(0);
  const componentRef = useRef<ScrollView>(null);
  const onBtnLoginPress = () => {
    if (page < dataIntro.length - 1) {
      const nextPage = page + 1;
      setPage(nextPage);
      componentRef.current?.scrollTo({
        x: MAX_WIDTH * nextPage,
        y: 0,
        animated: true,
      });
      setPage(nextPage);
      return;
    }
    active();
  };
  const active = () => {
    LocalStorageUtils.setOnBoard('active').then(() => {
      dispatch(skipOnboard());
    });
  };
  return (
    <View style={IntroStyle.container}>
      <CTStatusBar barStyle="dark-content" />
      {page < dataIntro.length - 1 && (
        <CTButton
          onPress={() => active()}
          style={[IntroStyle.skip, {top: top + 10}]}
          type="plain"
          textStyle={IntroStyle.skipTextStyle}
          text="Bỏ qua"
        />
      )}
      <View style={IntroStyle.pager}>
        <ScrollView
          bounces={true}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          horizontal
          scrollEnabled={false}
          ref={componentRef}
          scrollEventThrottle={10}
          style={IntroStyle.pagerContainer}>
          {dataIntro.map((data, index) => (
            <PagerIntro key={index} data={data} index={index} />
          ))}
        </ScrollView>
      </View>

      <View>
        <View
          style={[
            IntroStyle.bottomContainer,
            ThemeStyle.shadow,
            {paddingBottom: bottom + normalize(8)},
          ]}>
          <View style={IntroStyle.top}>
            <CTTypography.Header
              font={Font.Bold}
              style={IntroStyle.title}
              level="2"
              text={dataIntro[page].text}
            />
            <CTTypography.Text
              level="2"
              style={IntroStyle.subTitle}
              text={dataIntro[page].subText}
            />

            <View style={IntroStyle.indicator}>
              {dataIntro.map((data, index) => (
                <Indicator active={page === index} key={data.id} />
              ))}
            </View>
          </View>
          <CTButton
            onPress={onBtnLoginPress}
            style={IntroStyle.btn}
            text={page === dataIntro.length - 1 ? 'Bắt đầu' : 'Tiếp tục'}
          />
        </View>
      </View>
    </View>
  );
};

export default IntroScreen;
