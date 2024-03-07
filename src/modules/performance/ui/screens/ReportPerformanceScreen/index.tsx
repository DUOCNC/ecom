import React, {useEffect, useMemo, useState} from 'react';
import {DatePicker, ErrorType, Layout, Text, Typography} from 'common-ui';
import {ScrollView, View, Image} from 'react-native';
import style from './style';
import {colors} from 'assets/v2';
import {performanceService} from 'modules/performance/services';
import {AwardView, PerformanceCard, ReportPerformanceView} from '../../views';
import {ic_attention, ic_medal, ic_top_award} from 'assets/images';
import {PerformanceEntity} from 'modules/performance/models/entities/PerformanceEntity';
import {
  AwardEntity,
  EmployeeRevenueEntity,
} from 'modules/performance/models/entities';
import {useAppSelector} from 'hook';
import moment from 'moment';
import {FormatDatePattern} from 'utils/DateUtils';
import {useAuth} from 'providers/contexts/AuthContext';
import {REPORT_PERMISSION} from 'modules/performance/permission';

const ReportPerformanceScreen: React.FC = () => {
  const user = useAppSelector(state => state.profile.data);
  const {profile} = useAuth();
  const [date, setDate] = useState<Date>(new Date());
  const [error, setError] = useState<ErrorType | false>(false);
  const [msgError, setMsgError] = useState<string | undefined>(undefined);
  const [performance, setPerformance] = useState<PerformanceEntity>(
    PerformanceEntity.createFromDate(date),
  );
  const [awards, setAwards] = useState<Array<AwardEntity>>([]);
  const [personalRevenue, setPersonalRevenue] = useState<EmployeeRevenueEntity>(
    EmployeeRevenueEntity.createEmpty(),
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingTop, setLoadingTop] = useState<boolean>(true);

  const enableSalary = useMemo(() => {
    if (moment(date).isAfter(moment())) {
      return false;
    }
    return true;
  }, [date]);

  useEffect(() => {
    if (
      profile &&
      !profile.checkPermissionByKey(REPORT_PERMISSION.REPORT_PERFORMANCE)
    ) {
      setError('NotPermission');
      setMsgError('Bạn không có quyền xem hiệu suất cá nhân');
      return;
    }
    performanceService.get(
      date,
      r => setPerformance(r),
      () => setLoading(true),
      (code, msg) => {
        setError(code);
        setMsgError(msg);
      },
      () => setLoading(false),
    );
  }, [date, profile]);

  useEffect(() => {
    const code = performance.getEmployeeCode();
    if (code) {
      performanceService.getTopEmployeeRevenue(
        code,
        {
          beginDate: moment(date).format(FormatDatePattern['YYYY-MM-DD']),
          endDate: moment(date).format(FormatDatePattern['YYYY-MM-DD']),
          storeName: performance.getStore(),
          rsm: performance.getRsm(),
        },
        res => {
          setPersonalRevenue(res);
          setLoadingTop(false);
        },
        () => {
          setLoadingTop(true);
        },
        () => setLoadingTop(false),
      );
    } else {
      setLoadingTop(false);
    }
  }, [date, performance]);

  useEffect(() => {
    if (user?.code) {
      performanceService.getAwardFor(
        user?.code,
        r => {
          setAwards(r);
        },
        () => {},
        () => {},
        () => {},
      );
    }
  }, [user]);

  const contentTopRevenue = useMemo(() => {
    return (
      <Layout.Loading loading={loadingTop} size="small">
        <View style={style.topRevenue}>
          {personalRevenue.getOnTop() && <Image source={ic_medal} />}
          <Typography
            textAlign="center"
            style={style.contentTopRevenue}
            text={
              <>
                <Typography text={personalRevenue.getContent()[0]} />
                <Typography
                  color={
                    personalRevenue.getOnTop()
                      ? colors.success.o500
                      : colors.secondary.o900
                  }
                  lineHeight={18}
                  text={personalRevenue.getContent()[1]}
                />
                <Typography text={personalRevenue.getContent()[2]} />
              </>
            }
          />
        </View>
      </Layout.Loading>
    );
  }, [loadingTop, personalRevenue]);

  return (
    <Layout.Screen barStyle="dark-content">
      <Layout.ScreenHeaderBack title="Hiệu suất cá nhân" />
      <Layout.Container>
        <Layout.Loading position="top" loading={loading}>
          <Layout.Error subTitle={msgError} error={error}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={style.scroll}
              style={style.container}>
              <View style={style.header}>
                <Typography textType="medium" type="h3" text="TỔNG QUAN" />
                <DatePicker
                  onValueChange={v => {
                    setDate(v);
                  }}
                  type="date"
                  value={date}
                />
              </View>
              <View style={style.rowTitle}>
                <Typography
                  color={colors.secondary.o500}
                  textType="medium"
                  type="h3"
                  text="DOANH THU CÁ NHÂN"
                />
              </View>
              <View style={style.rowValueTitle}>
                <Text
                  color={colors.primary.o500}
                  fontWeight="600"
                  size={32}
                  text={performance.getRevenue()}
                />
              </View>
              {enableSalary && (
                <View style={style.rowSubValue}>{contentTopRevenue}</View>
              )}

              {/*<View style={style.view}>*/}
              {/*  <SalaryView enable={enableSalary} />*/}
              {/*</View>*/}

              <View style={style.view}>
                <PerformanceCard>
                  <ReportPerformanceView performance={performance} />
                </PerformanceCard>
              </View>
              <View style={style.rowTitle}>
                <Typography
                  color={colors.secondary.o500}
                  textType="medium"
                  type="h3"
                  text="THÀNH TÍCH"
                />
              </View>
              <View style={style.rowValueTitle}>
                <Text
                  color={colors.primary.o500}
                  fontWeight="600"
                  size={32}
                  text={awards.length}
                />
              </View>
              <View style={style.rowSubValue}>
                <Typography
                  textAlign="center"
                  text={performance.getAchievementRecognition(awards)}
                />
              </View>
              <View style={style.view}>
                <PerformanceCard>
                  <AwardView image={ic_top_award} data={awards.slice(0, 3)} />
                </PerformanceCard>
              </View>
              <View style={style.notify}>
                <Image source={ic_attention} />
                <Typography
                  style={style.txtAttention}
                  text="Bên cạnh việc thể hiện bản thân, đừng quên ghi nhận đồng nghiệp bạn nhé!"
                />
              </View>
            </ScrollView>
          </Layout.Error>
        </Layout.Loading>
      </Layout.Container>
    </Layout.Screen>
  );
};

export default ReportPerformanceScreen;
