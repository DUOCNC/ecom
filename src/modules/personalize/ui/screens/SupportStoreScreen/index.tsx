import {colors} from 'assets/v2';
import {FlatListItemControl, Layout, SearchInput} from 'common-ui';
import {useAppDispatch} from 'hook';
import {homeService} from 'modules/personalize/services';
import React, {useCallback, useEffect, useState} from 'react';
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  View,
  Keyboard,
  Platform,
  BackHandler,
  Animated,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {StoreItemView} from '../../views';
import style from './style';
import {MainStackScreenProps} from 'ui/screens/MainStack';
import {showConfirm, hideModal} from 'reduxs/Modals/ModalReducer';
import {StringUtils} from 'common';
import {useAuth} from 'providers/contexts/AuthContext';
import {Location, LocationSelectedProvider} from 'model/providers';

const {FlatList} = Animated;

type Props = MainStackScreenProps<'SupportStore'>;

const SupportStoreScreen: React.FC<Props> = ({navigation}) => {
  const dispatch = useAppDispatch();
  const {locationSupported, locationSelected, setLocationSelected} = useAuth();
  const [locationFilter, setLocationFilter] = useState<Array<Location>>([]);
  const [keyword, setKeyword] = useState<string>('');
  const onSelectStore = useCallback(
    (newLocationSelectedProvider: LocationSelectedProvider) => {
      setLocationSelected(newLocationSelectedProvider);
      navigation.goBack();
    },
    [navigation, setLocationSelected],
  );
  const onOk = useCallback(
    (newLocationSelectedProvider: LocationSelectedProvider) => {
      dispatch(hideModal());
      onSelectStore(newLocationSelectedProvider);
    },
    [dispatch, onSelectStore],
  );

  const onSelect = useCallback(
    (locationSelect: Location) => {
      Keyboard.dismiss();
      dispatch(
        showConfirm({
          title: 'Xác nhận đi hỗ trợ',
          buttonType: 'default',
          cancelButtonType: 'destruction',
          message: StringUtils.format(
            'Cửa hàng bạn chọn đi hỗ trợ là {0}?',
            locationSelect.name,
          ),
          onOk: () => {
            let newLocationActive =
              LocationSelectedProvider.createSupport(locationSelect);
            onOk(newLocationActive);
          },
        }),
      );
    },
    [dispatch, onOk],
  );

  const onBackPress = useCallback(() => {
    if (locationSelected.selected) {
      navigation.goBack();
      return;
    }
  }, [locationSelected.selected, navigation]);

  useEffect(() => {
    const event = BackHandler.addEventListener('hardwareBackPress', () => {
      onBackPress();
      return true;
    });
    return () => event.remove();
  }, [onBackPress]);
  const {bottom} = useSafeAreaInsets();
  useEffect(() => {
    setLocationFilter(
      homeService.getStoreEntitiesForSupport(locationSupported, keyword),
    );
  }, [keyword, locationSupported]);
  return (
    <Layout.Screen barStyle="dark-content">
      <TouchableWithoutFeedback
        style={style.feedback}
        onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          keyboardVerticalOffset={-bottom}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={style.container}>
          <Layout.ScreenHeaderBack
            onBackPress={onBackPress}
            title="Chọn cửa hàng hỗ trợ">
            <View style={style.viewSearch}>
              <SearchInput
                value={keyword}
                onValueChange={txt => setKeyword(txt)}
                placeholder="Tìm kiếm cửa hàng"
                themeStyle="dark"
              />
            </View>
          </Layout.ScreenHeaderBack>
          <Layout.SafeAreaContainer
            backgroundColor={colors.base.white}
            edges={['bottom', 'left', 'right']}>
            <FlatList
              keyboardShouldPersistTaps="handled"
              data={locationFilter}
              keyExtractor={item => item.id.toString()}
              ItemSeparatorComponent={() => <FlatListItemControl.Separator />}
              renderItem={({item}) => (
                <StoreItemView
                  locationSelected={locationSelected}
                  onSelect={onSelect}
                  location={item}
                />
              )}
            />
          </Layout.SafeAreaContainer>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Layout.Screen>
  );
};

export default SupportStoreScreen;
