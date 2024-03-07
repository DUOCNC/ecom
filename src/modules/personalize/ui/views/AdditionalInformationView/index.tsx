import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {RefreshControl, ScrollView, View} from 'react-native';
import style from './style';
import CTTypography from 'components/CTTypography';
import {Font} from 'components/Base/Text';
import CTDatePicker from 'components/CTDatePicker';
import {ErrorType, Layout, Typography} from 'common-ui';
import {colors} from 'assets/v2';
import {expectedSalaryService} from 'modules/personalize/services';
import {useAppSelector} from 'hook';
import {ExpectedSalaryEntity} from 'modules/personalize/models/entities';
import CTLayout from 'components/CTLayout';
import {showError} from 'utils/ToastUtils';

const AdditionalInformationView: React.FC = () => {
  const [date, setDate] = useState<Date>(new Date());
  const user = useAppSelector(state => state.profile.data);
  const [data, setData] = useState<ExpectedSalaryEntity | null>(null);
  const [firstLoading, setFirstLoading] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorType | false>(false);

  const code = useMemo(() => {
    if (user == null) {
      return '';
    }
    return user.code;
  }, [user]);

  const accountJob = useMemo(() => {
    if (user == null) {
      return null;
    }
    if (user.accountJobs == null) {
      return null;
    }
    if (user.accountJobs.length === 0) {
      return null;
    }
    return user.accountJobs[0];
  }, [user]);

  const positionId = useMemo(() => {
    if (accountJob == null || accountJob.positionId == null) {
      return -1;
    }
    return accountJob.positionId;
  }, [accountJob]);

  const getExpectError = useCallback((codeEror: string, err: string) => {
    setFirstLoading(false);
    setLoading(false);
    showError(err);
  }, []);

  const getExpectData = useCallback((result: null | ExpectedSalaryEntity) => {
    setFirstLoading(false);
    setLoading(false);
    setData(result);
    if (result && (!result.getDetail() || result.getDetail().length === 0)) {
      setError('NotfoundReport');
    }
  }, []);

  useEffect(() => {
    expectedSalaryService.getFirstExpectedSalary(
      date,
      code,
      positionId,
      getExpectData,
      getExpectError,
    );
  }, [code, date, getExpectData, getExpectError, positionId]);

  const getExpectedSalary = useCallback(
    (beforeCallApi: () => void) => {
      expectedSalaryService.getExpectedSalary(
        beforeCallApi,
        date,
        code,
        positionId,
        getExpectData,
        getExpectError,
      );
    },
    [date, code, getExpectData, getExpectError, positionId],
  );

  useEffect(() => {
    if (!firstLoading) {
      getExpectedSalary(() => {
        setLoading(true);
        setError(false);
      });
    }
  }, [firstLoading, getExpectedSalary]);

  return (
    <React.Fragment>
      <View style={style.header}>
        <CTTypography.Text
          font={Font.Medium}
          level="2"
          text="DOANH THU CÁ NHÂN"
        />
        <CTDatePicker
          onValueChange={v => {
            setDate(v);
          }}
          type="month"
          value={date}
        />
      </View>
      <CTLayout.LoadingView firstLoading={firstLoading || loading}>
        <Layout.Error error={error}>
          <ScrollView
            showsVerticalScrollIndicator
            refreshControl={
              <RefreshControl onRefresh={() => {}} refreshing={false} />
            }
            style={style.container}>
            {data &&
              data.getDetail().map(salaryDetail => {
                return (
                  <View style={style.row}>
                    <Typography text={salaryDetail.getDate()} />
                    <Typography
                      color={colors.primary.o500}
                      textType="medium"
                      text={salaryDetail.getTurnover()}
                    />
                  </View>
                );
              })}
          </ScrollView>
        </Layout.Error>
      </CTLayout.LoadingView>
    </React.Fragment>
  );
};
export default AdditionalInformationView;
