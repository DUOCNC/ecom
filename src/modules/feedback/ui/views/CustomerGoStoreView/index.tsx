import {
  bg_customer_visitor,
  ic_rp_up,
  ic_rp_down,
  icon_user,
} from 'assets/images';
import React, {
  forwardRef,
  ForwardRefRenderFunction,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import {Image, View} from 'react-native';
import style from './style';
import {Layout, Typography} from 'common-ui';
import {colors} from 'assets/v2';
import {useAuth} from 'providers/contexts/AuthContext';
import {LotFeedbackEntity} from 'modules/feedback/models/entities/LotFeedbackEntity';
import {feedbackService} from 'modules/feedback/services';
import DateUtilts from 'common/utils/DateUtilts';

export interface CustomerGoStoreProps {
  isStoreOnly: boolean;
  title: string;
}

export type CustomerGoStoreRef = {
  refresh: () => void;
};

export type CustomerGoStore = ForwardRefRenderFunction<
  CustomerGoStoreRef,
  CustomerGoStoreProps
>;

const CustomerGoStoreView: CustomerGoStore = (props, ref) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [visitor, setVisitor] = useState<LotFeedbackEntity>(
    LotFeedbackEntity.createEmpty(),
  );
  const onUpdateVisitorEntity = (result: LotFeedbackEntity) => {
    setVisitor(result);
  };
  const start = useMemo(() => {
    let startDate = new Date();
    startDate.setHours(0, 0, 0);
    return startDate;
  }, []);
  const end = useMemo(() => {
    let endDate = new Date();
    endDate.setHours(23, 59, 59);
    return endDate;
  }, []);

  const loadData = () => {
    let params = {
      isStoreOnly: props.isStoreOnly ?? false,
      storeIds,
      positionId: profile?.positionId,
      createdAtFrom: DateUtilts.clearMillisecond(start.toJSON()),
      createdAtTo: DateUtilts.clearMillisecond(end.toJSON()),
    };
    feedbackService.getLotFeedback(
      params,
      onUpdateVisitorEntity,
      () => {},
      () => {
        setLoading(true);
      },
      () => {
        setLoading(false);
      },
    );
  };
  const onRefresh = () => {
    loadData();
  };

  const {profile, locationSelected} = useAuth();

  const growPercent = visitor.getGrowPercent(props.isStoreOnly);

  const iconGrow = growPercent >= 0 ? ic_rp_up : ic_rp_down;

  const currentDate = useMemo(() => {
    let date = new Date();
    return date.getDate();
  }, []);

  useImperativeHandle(ref, () => ({
    refresh: onRefresh,
  }));

  const storeIds = useMemo(() => {
    if (locationSelected.locationId === -1) {
      return profile?.locationIds ?? [0];
    } else {
      return [locationSelected.locationId ?? 0];
    }
  }, [locationSelected.locationId, profile?.locationIds]);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    loadData();
  }, [locationSelected]);

  return (
    <View style={style.container}>
      <View style={style.main}>
        <View style={style.header}>
          <Typography
            color={colors.primary.o500}
            textType="medium"
            type="h3"
            text={props.title}
            style={style.title}
          />
        </View>
        <Layout.Loading loading={loading}>
          <View>
            <View style={style.controlContainer}>
              <View style={style.controlLeft}>
                <View style={style.row}>
                  <Typography
                    type="h0"
                    text={
                      props.isStoreOnly
                        ? visitor.getTotalVisitor()
                        : visitor.getTotalVisitorProcessed()
                    }
                    textType="medium"
                  />
                  <Image source={icon_user} style={style.icon} />
                </View>
                {currentDate > 1 && (
                  <View style={style.note}>
                    <Image style={style.icGrow} source={iconGrow} />
                    <Typography
                      style={style.txtGrow}
                      color={
                        growPercent >= 0
                          ? colors.success.o700
                          : colors.error.o700
                      }
                      text={Math.abs(growPercent).toString()}
                    />
                    <Typography
                      text="khách so với hôm qua"
                      textType="medium"
                      color={colors.secondary.o500}
                    />
                  </View>
                )}
              </View>
              <View style={style.controlRight}>
                <Image source={bg_customer_visitor} />
              </View>
            </View>
          </View>
        </Layout.Loading>
      </View>
    </View>
  );
};

export default forwardRef(CustomerGoStoreView);
