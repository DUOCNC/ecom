import React, {useEffect, useState} from 'react';
import {ErrorType, Layout} from 'common-ui';
import {FlatList, View} from 'react-native';
import style from './style';
import {performanceService} from 'modules/performance/services';
import {AwardItemView} from '../../views';
import {AwardEntity} from 'modules/performance/models/entities';
import {ThemeStyle} from 'assets/theme';
import {useAppSelector} from 'hook';

const AwardScreen: React.FC = () => {
  const [error, setError] = useState<ErrorType | false>(false);
  const [msgError, setMsgError] = useState<string | undefined>(undefined);
  const [awards, setAwards] = useState<Array<AwardEntity>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const user = useAppSelector(state => state.profile.data);

  useEffect(() => {
    if (user?.code) {
      performanceService.getAwardFor(
        user?.code,
        r => setAwards(r),
        () => setLoading(true),
        (err, msg) => {
          setError(err);
          setMsgError(msg);
        },
        () => setLoading(false),
      );
    }
  }, [user?.code]);

  return (
    <Layout.Screen barStyle="dark-content">
      <Layout.ScreenHeaderBack title="Thành tích" />
      <Layout.SafeAreaContainer edges={['bottom']}>
        <Layout.Loading position="top" loading={loading}>
          <Layout.Error subTitle={msgError} error={error}>
            <FlatList
              style={style.container}
              showsVerticalScrollIndicator={false}
              data={awards}
              keyExtractor={item => item.getId().toFixed()}
              ItemSeparatorComponent={() => (
                <View style={ThemeStyle.separator} />
              )}
              renderItem={({item}) => (
                <AwardItemView key={item.getSubTitle()} item={item} />
              )}
            />
          </Layout.Error>
        </Layout.Loading>
      </Layout.SafeAreaContainer>
    </Layout.Screen>
  );
};

export default AwardScreen;
