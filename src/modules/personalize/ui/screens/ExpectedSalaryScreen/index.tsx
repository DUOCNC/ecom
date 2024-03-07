import React, {useMemo, useState} from 'react';
import CTLayout from 'components/CTLayout';
import {Image, Linking, TouchableOpacity, View} from 'react-native';
import EmptyState from 'components/CTScreen/EmptyState';
import {bg_salary, ic_support} from 'assets/images';
import StringUtils from 'common/utils/StringUtils';
import {Typography, Layout, ErrorType} from 'common-ui';
import {colors} from 'assets/v2';
import {useConfig} from 'hook';
import style from './style';
import ExpectSalaryTabConfig from 'modules/personalize/config/ExpectSalaryTabConfig';
import ExpectSalaryTabEntity from 'modules/personalize/models/entities/ExpectSalaryTabEntity';
import {AlignVerticalErrorEnum} from 'enums/MainErrorType';

const ExpectedSalaryScreen: React.FC = () => {
  const config = useConfig();
  const [firstLoading, setFirstLoading] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [tabActive, setTabActive] = useState<ExpectSalaryTabEntity>(
    ExpectSalaryTabConfig[0],
  );
  let ContentRender = useMemo(() => {
    return tabActive.getComponent();
  }, [tabActive]);

  return (
    <Layout.Screen barStyle="dark-content">
      <Layout.ScreenHeaderBack title="Lương dự kiến" />
      <Layout.SafeAreaContainer edges={['left', 'right', 'bottom']}>
        <CTLayout.LoadingView firstLoading={firstLoading || loading}>
          <ContentRender />
        </CTLayout.LoadingView>
      </Layout.SafeAreaContainer>
    </Layout.Screen>
  );
};

export default ExpectedSalaryScreen;
