import React, {useEffect, useState} from 'react';
import {Layout} from 'common-ui';
import {MainStackScreenProps} from 'ui/screens/MainStack';
import {AccountJobEntity} from 'modules/personalize/models/entities';
import {accountService} from 'modules/personalize/services';
import {useAppSelector} from 'hook';
import {Animated} from 'react-native';
import {AccountJobView} from '../../views';
import style from './style';

const {FlatList} = Animated;

type Props = MainStackScreenProps<'AccountJob'>;

const AccountJobScreen: React.FC<Props> = ({}) => {
  const [accountJobs, setAccountJobs] = useState<Array<AccountJobEntity>>([]);
  const profile = useAppSelector(state => state.profile);
  useEffect(() => {
    const account = accountService.getAccount(profile.data);
    if (account !== null) {
      setAccountJobs(account.getAccountJobs());
    }
  }, [profile.data]);
  return (
    <Layout.Screen barStyle="dark-content">
      <Layout.ScreenHeaderBack title="Thông tin công việc" />
      <Layout.Container>
        <FlatList
          style={style.flatlist}
          data={accountJobs}
          keyExtractor={item => item.getKey()}
          renderItem={({item}) => <AccountJobView accountJob={item} />}
        />
      </Layout.Container>
    </Layout.Screen>
  );
};

export default AccountJobScreen;
