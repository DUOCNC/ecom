import React, {useEffect, useMemo, useState} from 'react';
import {
  FlatList,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import style from './style';
import CTTypography from 'components/CTTypography';
import {Font} from 'components/Base/Text';
import CTDatePicker from 'components/CTDatePicker';
import {ErrorType, Layout, Typography} from 'common-ui';
import {colors} from 'assets/v2';
import ExpectSalaryCardView from 'modules/personalize/ui/views/ExpectSalaryCardView';
import personnelService from 'modules/personalize/services/PersonnelService';
import {PersonnelEntity} from 'modules/personalize/models/entities';
import {useAppSelector} from 'hook';
import {useAuth} from 'providers/contexts/AuthContext';
import SwitchTab from 'modules/personalize/ui/views/SwitchTab';
import {SalaryTabButton} from 'modules/personalize/enums/SalaryTabButton';
import DateUtils from 'common/utils/DateUtilts';

const ExpectSalaryView: React.FC = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [dataPersonalExpect, setDataPersonalExpect] = useState<
    Array<PersonnelEntity>
  >([]);
  const [loading, setLoading] = useState<boolean>(false);
  const user = useAppSelector(state => state.profile.data);
  const [error, setError] = useState<ErrorType | false>(false);
  const {profile} = useAuth();
  const [activeTab, setActiveTab] = useState<SalaryTabButton>(
    SalaryTabButton.revenue,
  );
  const [selectTab, setSelectTab] = useState<PersonnelEntity>(
    PersonnelEntity.createEmpty(),
  );
  const [dateUpdate, setDateUpdate] = useState<Date>(new Date());

  const code = useMemo(() => {
    if (user == null) {
      return '';
    }
    return user.code;
  }, [user]);

  useEffect(() => {
    setDateUpdate(new Date());
    personnelService.getPersonnelSalary(
      {
        beginDate: DateUtils.getStartDateOfMonthFormat(date),
        endDate: DateUtils.getEndDateOfMonthFormat(date),
      },
      (personnelEntityList: Array<PersonnelEntity>) => {
        if (personnelEntityList.length > 0) {
          setSelectTab(personnelEntityList[0]);
          setDataPersonalExpect(personnelEntityList);
        }
      },
      () => {
        setError('NotfoundReport');
      },
      () => {
        setLoading(true);
        setError(false);
      },
      () => {
        setLoading(false);
      },
    );
  }, [code, date, profile?.positionId]);

  const onChangeTabSalary = (value: SalaryTabButton) => {
    setActiveTab(value);
  };

  const onPressTableSalary = (selectSalary: PersonnelEntity) => {
    setSelectTab(selectSalary);
  };
  const dataSalary = useMemo(() => {
    if (activeTab === SalaryTabButton.revenue) {
      return selectTab.getIncomeSalaries();
    }
    if (activeTab === SalaryTabButton.deduct) {
      return selectTab.getDeductionSalaries();
    }
    return [];
  }, [activeTab, selectTab]);
  return (
    <ScrollView
      showsVerticalScrollIndicator
      refreshControl={
        <RefreshControl onRefresh={() => {}} refreshing={false} />
      }
      style={style.container}>
      <View style={style.header}>
        <CTTypography.Text font={Font.Medium} level="2" text="TỔNG QUAN" />
        <CTDatePicker
          onValueChange={v => {
            setDate(v);
          }}
          type="month"
          value={date}
        />
      </View>
      <View style={style.note}>
        <Typography
          text="Lưu ý: Đây chỉ là lương dự kiến. Lương thực nhận cuối cùng sẽ được C&B thông báo vào trước ngày 08 hàng tháng."
          color={colors.primary.o500}
          fontStyle="italic"
          textType="medium"
        />
      </View>
      {dataPersonalExpect.length > 1 && (
        <FlatList
          style={style.statusContainer}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={dataPersonalExpect}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity onPress={() => onPressTableSalary(item)}>
                <View
                  style={[
                    style.statusElement,
                    {
                      borderColor:
                        index + 1 === selectTab.getIndex()
                          ? colors.primary.o500
                          : colors.secondary.o300,
                    },
                  ]}>
                  <Typography
                    textType={
                      index + 1 === selectTab.getIndex() ? 'medium' : 'regular'
                    }
                    text={`Bảng lương ${item.getIndex()}`}
                    color={
                      index + 1 === selectTab.getIndex()
                        ? colors.primary.o500
                        : colors.secondary.o900
                    }
                  />
                </View>
              </TouchableOpacity>
            );
          }}
        />
      )}
      <Layout.Loading loading={loading}>
        <Layout.Error error={error}>
          <View style={style.viewContent}>
            <Typography
              color={colors.secondary.o500}
              type="h4"
              text={`Lương dự kiến từ ${DateUtils.getStartDateOfMonthFormatDDMMYYY(
                date,
              )} đến ${DateUtils.getEndDateOfMonthFormatDDMMYYYY(date)}`}
            />
            <Typography
              style={style.priceValue}
              type="h1"
              textType="medium"
              color={colors.primary.o600}
              text={selectTab.getTotalSalary()}
            />
            <Typography
              style={style.txtHint}
              type="h5"
              color={colors.secondary.o500}
              text={`Thời điểm kiểm tra ${DateUtils.getDateFormatHHMMDDMMYYYY(
                dateUpdate,
              )}`}
            />
          </View>
          <View style={style.switchTab}>
            <SwitchTab
              firstTabTitle="Lương khoản thu"
              secondTabTitle="Lương khấu trừ"
              firstTabValue={SalaryTabButton.revenue}
              secondTabValue={SalaryTabButton.deduct}
              onChangeTab={onChangeTabSalary}
              activeTab={activeTab}
            />
          </View>
          {dataPersonalExpect.length > 0 &&
            activeTab === SalaryTabButton.revenue && (
              <ExpectSalaryCardView
                title="Tổng lương các khoản thu"
                value={selectTab.getTotalIncomeSalary()}
                childData={[]}
              />
            )}
          {dataPersonalExpect.length > 0 &&
            activeTab === SalaryTabButton.deduct && (
              <ExpectSalaryCardView
                title="Tổng các khoản khấu trừ"
                value={selectTab.getTotalDeductionSalary()}
                childData={[]}
              />
            )}
          {dataSalary.map((item, index) => {
            return (
              <ExpectSalaryCardView
                key={index}
                title={item.getName()}
                value={item.getValue()}
                childData={item.getMetaData()}
              />
            );
          })}
        </Layout.Error>
      </Layout.Loading>
    </ScrollView>
  );
};

export default ExpectSalaryView;
