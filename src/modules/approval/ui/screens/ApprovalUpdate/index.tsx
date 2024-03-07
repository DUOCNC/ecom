import {Keyboard, KeyboardAvoidingView, Platform, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {MainStackScreenProps} from 'ui/screens/MainStack';
import {DimentionUtils, Layout, TextInput} from 'common-ui';
import {CTButton} from 'components/Button';
import {style} from './style';
import {
  CheckInOut,
  CustomerLabel,
  Leave,
  Resignation,
  Overtime,
  Absence,
} from '../../views/Updates';
import {SelectApplicationView} from '../../views';
import {EnumTxtTypeHrm, EnumTypeHrm} from 'modules/approval/config';
import {RequestProps} from '../../views/Updates/type';
import {DateFormatPattern} from 'common/enums';
import {useHrmData} from 'modules/approval/hooks';
import {
  IBodyRequestCreateHrm,
  IDetailCreateHrm,
  Surcharge,
} from 'modules/approval/models/response';
import _ from 'lodash';
import {Controller, useForm} from 'react-hook-form';
import {Font} from 'components/Base/Text';
import {DateUtils} from 'common';
import {useAuth} from 'providers/contexts/AuthContext';
import {showError, showSuccess} from 'utils/ToastUtils';
import moment from 'moment';
import {
  createSingleWordHrm,
  updateSingleWordHrm,
} from 'modules/approval/services';
import {MainRouteConfig} from 'config/RouteConfig';
import {hideModal, showLoading} from 'reduxs/Modals/ModalReducer';
import {useAppDispatch} from 'hook';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const optionsRequestType = Object.keys(EnumTxtTypeHrm).map(key => ({
  value: key,
  label: EnumTxtTypeHrm[key as EnumTypeHrm],
}));

type RequestBody = Omit<IBodyRequestCreateHrm, 'id'> & {
  requestType?: EnumTypeHrm;
};

let runningId = 0;

const defaultDetail: IDetailCreateHrm = {
  key: runningId++,
  date_start: moment(),
  date_end: moment(),
  shifts_start: 'Nửa ca đầu',
  shifts_end: 'Nửa ca sau',
  date: moment(),
  time: moment(),
  reason: '',
  start_time: moment(),
  end_time: moment(),
  time_start: moment(),
  time_end: moment(),
  is_attendance: '',
  type: 'Tính công',
  gps_location_ids: '',
  date_of_application: moment(),
};
const timeFormatString = DateFormatPattern['HHmm'];
const dateFormatString = DateFormatPattern['DDMMYYYY'];

type Props = MainStackScreenProps<'ApprovalUpdate'>;
const ApprovalUpdateScreen: React.FC<Props> = ({navigation, route}) => {
  const bottom = useSafeAreaInsets().bottom;
  const id = route.params?.id;
  const type = route.params?.type;
  const isNew = id === undefined;
  const {profile} = useAuth();
  const [requestType, setRequestType] = useState<EnumTypeHrm>(
    EnumTypeHrm.LEAVES,
  );
  const [sur, setSurCharges] = useState<Surcharge[]>([]);
  const [detail, setDetail] = useState<IDetailCreateHrm[]>([
    _.cloneDeep(defaultDetail),
  ]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const {loading, hrmData} = useHrmData(id as string, type as EnumTypeHrm);
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm({
    defaultValues: {
      desc: '',
    },
  });

  const addDetailItem = () => {
    setDetail(prevDetail => [
      ...prevDetail,
      {..._.cloneDeep(defaultDetail), key: runningId++},
    ]);
  };

  const setDetailTime = (
    itemKey: React.Key,
    field: keyof IDetailCreateHrm,
    value: unknown,
  ) => {
    setDetail(prevDetails =>
      prevDetails.map(d => {
        if (d.key === itemKey) {
          return {
            ...d,
            [field]: value,
          };
        }

        return d;
      }),
    );
  };

  const removeDetailTime = (itemIndex: number) => {
    setDetail(prevDetail =>
      prevDetail.filter((e, index) => index !== itemIndex),
    );
  };

  const onSubmit = async (value: RequestBody) => {
    if (!profile) {
      return;
    }
    if (!requestType) {
      showError('Bạn chưa chọn loại đơn từ');
      return;
    }
    const bodyDetail: IDetailCreateHrm[] = detail.map(item => {
      return {
        ...item,
        date_start: DateUtils.parseMoment(item.date_start, dateFormatString),
        date_end: DateUtils.parseMoment(item.date_end, dateFormatString),
        date: DateUtils.parseMoment(item.date, dateFormatString),
        time: DateUtils.parseMoment(item.time, timeFormatString),
        time_start: DateUtils.parseMoment(item.time_start, timeFormatString),
        time_end: DateUtils.parseMoment(item.time_end, timeFormatString),
        date_change: DateUtils.parseMoment(item.date_change, dateFormatString),
        date_other: DateUtils.parseMoment(item.date_other, dateFormatString),
        start_time: DateUtils.parseMoment(item.start_time, timeFormatString),
        end_time: DateUtils.parseMoment(item.end_time, timeFormatString),
        shift_ids: Array.isArray(item.shift_ids)
          ? item.shift_ids?.join(',')
          : item.shift_ids,
        shift_other: Array.isArray(item.shift_other)
          ? item.shift_other?.join(',')
          : item.shift_other,
      };
    });

    const body: RequestBody = {
      personnel_id: profile.code,
      desc: value.desc,
      reason: value.reason,
      detail: bodyDetail,
      app_approval_ids: value.app_approval_ids,
    };

    switch (requestType) {
      case EnumTypeHrm.RESIGNATION:
        body.date = DateUtils.parseMoment(detail[0].date, dateFormatString);
        body.date_of_application = DateUtils.parseMoment(
          detail[0].date_of_application,
          dateFormatString,
        );
        delete body.detail;
        break;

      case EnumTypeHrm.ONSITE:
        body.vehicle_id = value.vehicle_id;
        body.is_work_abroad =
          value.is_work_abroad?.toString() === 'true'
            ? 'Nước ngoài'
            : 'Trong nước';
        body.address = value.address;
        body.surcharges = sur.map(s => ({
          ...s,
          name: s.typeId,
        }));
        body.date_from = DateUtils.parseMoment(
          detail[0].date_from,
          dateFormatString,
        );
        body.date_to = DateUtils.parseMoment(
          detail[0].date_to,
          dateFormatString,
        );
        body.time_start = DateUtils.parseMoment(
          detail[0].time_start,
          timeFormatString,
        );
        body.time_end = DateUtils.parseMoment(
          detail[0].time_end,
          timeFormatString,
        );
        break;

      case EnumTypeHrm.SHIFTCHANGE:
        body.is_change = value.is_change;
        break;

      default:
        break;
    }
    setIsSubmitting(true);
    Keyboard.dismiss();
    try {
      let res;
      if (id) res = await updateSingleWordHrm(id, requestType, body);
      else res = await createSingleWordHrm(requestType, body);

      if (res) {
        showSuccess(
          `${id ? 'Sửa' : 'Tạo'} đơn ${EnumTxtTypeHrm[requestType]} thành công`,
        );
        navigation.navigate(MainRouteConfig.Approval);
      }
    } catch (e: any) {
      if (e?.response?.data?.errors?.base[0]) {
        let htmlContent = e?.response?.data?.errors?.base[0];
        htmlContent = htmlContent.replace('<ul>', '').replace('</ul>', '');
        // Xóa các thẻ HTML
        const plainText = htmlContent.replace(/<[^>]+>/g, '\n');
        // Thay thế các ký tự đặc biệt
        const formattedText = plainText
          .replace(/&nbsp;/g, ' ')
          .replace(/&amp;/g, '&');
        // @ts-ignore
        showError(formattedText);
        return;
      } else {
        showError(
          e?.response?.data?.errors?.base[0] ||
            `${id ? 'Sửa' : 'Tạo'} đơn ${
              EnumTxtTypeHrm[requestType]
            } không thành công. Vui lòng thử lại`,
        );
      }
    } finally {
      setIsSubmitting(false);
      dispatch(hideModal());
    }
  };

  useEffect(() => {
    if (isSubmitting) {
      dispatch(showLoading());
      return;
    }
    dispatch(hideModal());
  }, [dispatch, isSubmitting]);

  useEffect(() => {
    console.log('errors', errors);

    if (Object.keys(errors).length === 1) {
      let firstKeyError: string = Object.keys(errors)[0];
      // @ts-ignore
      showError(errors[firstKeyError].message);
    }
    if (Object.keys(errors).length > 1) {
      showError('Bạn chưa điền đủ thông tin bắt buộc');
    }
  }, [errors]);

  const requestProps: RequestProps = {
    requestType: requestType,
    disabledDate: undefined,
    dateFormat: dateFormatString,
    timeFormat: timeFormatString,
    detail,
    onSetDetailItem: setDetailTime,
    onRemoveDetailItem: removeDetailTime,
    onAddDetailItem: addDetailItem,
    surcharges: sur,
    onSetSurcharges: setSurCharges,
    hrmData,
    setDetail,
    isEditting: Boolean(type),
    Controller,
    control,
  };

  useEffect(() => {
    if (type && hrmData) {
      // form.resetFields()

      setRequestType(type as EnumTypeHrm);

      const detailData =
        ((hrmData.inoutinfo ||
          hrmData.detail) as unknown as IDetailCreateHrm[]) || [];
      const {surcharges = []} = hrmData;

      const newFormFieldsValue = {...hrmData};

      // Resign form response does not contains detail array, neither inoutinfo, ...etc
      // So work around by taking data from hrmData and build detail array
      switch (type) {
        case EnumTypeHrm.RESIGNATION: {
          detailData.push({
            date_of_application: DateUtils.toMoment(hrmData.dateOfApplication),
            date: DateUtils.toMoment(hrmData.date),
            key: 0,
          });
          break;
        }

        case EnumTypeHrm.ONSITE: {
          if (hrmData.surcharges)
            setSurCharges(
              hrmData.surcharges.map((surcharge, i) => ({
                ...surcharge,
                type: 'VND',
                key: i,
              })),
            );
          newFormFieldsValue['isWorkAbroad'] =
            hrmData.isWorkAbroad === 'Nước ngoài'; // @TODO: Fix me

          detailData.push({
            date_from: DateUtils.toMoment(hrmData.dateFrom),
            date_to: DateUtils.toMoment(hrmData.dateTo),
            time_start: DateUtils.toMoment(hrmData.timeStart),
            time_end: DateUtils.toMoment(hrmData.timeEnd),
            key: 0,
          });
          break;
        }

        // case EnumTypeHrm.SHIFTCHANGE: {
        //   detailData.push({
        //     date_change: parseMoment(hrmData.date_change, dateFormatString),
        //     date_other: parseMoment(hrmData.date_other, dateFormatString),
        //     shift: parseMoment(hrmData.shift, timeFormatString),
        //     time_end: parseMoment(hrmData.time_end, timeFormatString),
        //     key: 0
        //   })
        // }
      }

      detailData.forEach((item, i) => {
        for (const field in item) {
          const fieldName = `${field}${i}`;
          if (
            (field as keyof IDetailCreateHrm) === 'shift_ids' ||
            (field as keyof IDetailCreateHrm) === 'shift_other'
          ) {
            // @ts-ignore
            newFormFieldsValue[fieldName] = item[field].split(/,\s*/);
          } else {
            // @ts-ignore
            newFormFieldsValue[fieldName] = DateUtils.toMoment(item[field]);
          }
        }
      });

      if (surcharges?.length) {
        surcharges.forEach(({type_id, money}, i) => {
          // @ts-ignore
          newFormFieldsValue[`type_id${i}`] = type_id;
          // @ts-ignore
          newFormFieldsValue[`money${i}`] = money;
        });
      }
      reset(newFormFieldsValue);
      setDetail(detailData.map((item, i) => ({...item, key: i})));
      runningId = detailData.length;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, hrmData]);

  return (
    <Layout.Screen barStyle="light-content">
      <Layout.ScreenHeaderBack
        title={isNew ? 'Tạo mới đơn từ' : 'Cập nhật đơn từ'}
      />
      <KeyboardAvoidingView
        keyboardVerticalOffset={-bottom + 20}
        style={style.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          extraScrollHeight={Platform.OS === 'ios' ? -300 : 0}
          keyboardShouldPersistTaps="handled"
          style={style.body}>
          <View style={style.row}>
            <View style={style.label}>
              <CustomerLabel text="Loại đơn" require />
            </View>
            <View style={style.value}>
              <SelectApplicationView
                title="Chọn loại đơn"
                value={requestType}
                dataSource={optionsRequestType}
                onChangeValue={setRequestType}
              />
            </View>
          </View>
          {requestType === EnumTypeHrm.LEAVES && (
            <Leave key={requestType} {...requestProps} />
          )}
          {requestType === EnumTypeHrm.RESIGNATION && (
            <Resignation key={requestType} {...requestProps} />
          )}
          {requestType === EnumTypeHrm.CHECKOUTS && (
            <CheckInOut key={requestType} {...requestProps} />
          )}
          {requestType === EnumTypeHrm.OVERTIME && (
            <Overtime key={requestType} {...requestProps} />
          )}
          {requestType === EnumTypeHrm.ABSENCE && (
            <Absence key={requestType} {...requestProps} />
          )}
          <View style={[style.row, style.mt20]}>
            <View style={style.label}>
              <CustomerLabel text="Mô tả" />
            </View>
          </View>
          <View
            style={[
              style.row,
              style.mt20,
              {marginRight: DimentionUtils.scale(4)},
            ]}>
            <Controller
              control={control}
              name="desc"
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  onChangeText={onChange}
                  value={value}
                  multiline
                  lineHeight={18}
                  style={style.noteInput}
                  size={14}
                  fontWeight="400"
                  textAlignVertical="top"
                  placeholder="Nhập nội dung mô tả"
                />
              )}
            />
          </View>
        </KeyboardAwareScrollView>
        <Layout.ScreenBottom>
          <View style={style.viewBottom}>
            <CTButton
              onPress={handleSubmit(onSubmit)}
              text={isNew ? 'Tạo đơn' : 'Cập nhật'}
              font={Font.Medium}
            />
          </View>
        </Layout.ScreenBottom>
      </KeyboardAvoidingView>
    </Layout.Screen>
  );
};
export default ApprovalUpdateScreen;
