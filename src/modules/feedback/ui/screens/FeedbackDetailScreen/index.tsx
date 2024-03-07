import {ic_rp_calendar} from 'assets/images';
import {colors} from 'assets/v2';
import {StringUtils} from 'common';
import {ErrorType, Layout, Typography} from 'common-ui';
import {MainRouteConfig} from 'config/RouteConfig';
import {FEEDBACK_PERMISSIONS} from 'modules/feedback/config';
import {FeedbackStatus} from 'modules/feedback/enums';
import {FeedbackEntity} from 'modules/feedback/models/entities';
import {BehaviorEntity} from 'modules/feedback/models/entities/BehaviorEntity';
import {feedbackService} from 'modules/feedback/services';
import {useAuth} from 'providers/contexts/AuthContext';
import React, {useEffect, useMemo, useState} from 'react';
import {Image, ScrollView, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {MainStackScreenProps} from 'ui/screens/MainStack';
import {StatusTagView} from '../../views';
import style from './style';
import {useConfig} from 'hook';

type Props = MainStackScreenProps<'FeedbackDetail'>;

const FeedbackDetailScreen: React.FC<Props> = ({route, navigation}) => {
  const config = useConfig();
  const {profile, locationSelected} = useAuth();
  const {feedbackId, firstDate, secondDate} = route.params;
  const [error, setError] = useState<ErrorType | false>(false);
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [feedbackEntity, setFeedbackEntity] = useState<FeedbackEntity>(
    FeedbackEntity.createEmpty(),
  );
  const [behaviors, setBehaviors] = useState<BehaviorEntity[]>([]);

  const handleSuccess = (fbEntity: FeedbackEntity) => {
    setError(false);
    setMessage('');
    setFeedbackEntity(fbEntity);
    setBehaviors(fbEntity.getBehaviors() || []);
  };
  const handleError = (err: ErrorType | false, msg: string) => {
    setMessage(msg);
    setError(err);
  };

  useEffect(() => {
    setError(false);
    feedbackService.getFeedbackDetail(
      feedbackId,
      handleSuccess,
      handleError,
      () => setLoading(true),
      () => setLoading(false),
    );
  }, [feedbackId]);

  const onPressEdit = () => {
    navigation.navigate(MainRouteConfig.FeedbackEdit, {
      feedbackId: feedbackEntity.getId(),
      firstDate,
      secondDate,
    });
  };

  const isViewEdit = useMemo(() => {
    if (error || !profile?.checkPermissionByKey(FEEDBACK_PERMISSIONS.EDITOR)) {
      return false;
    }
    return true;
  }, [error, profile]);

  const storeFeedbackPilot = useMemo(() => {
    let storeId: number | undefined;
    if (!locationSelected.supported && locationSelected.locationId !== -1) {
      storeId = locationSelected.locationId;
    }
    if (config.storeUseFeedback && config.storeUseFeedback !== '') {
      const storeConfig = config.storeUseFeedback.split(',');

      if (!storeId) {
        return false;
      }
      if (storeConfig.findIndex(e => e === storeId?.toString()) !== -1) {
        return true;
      } else {
        return false;
      }
    }
    return true;
  }, [config, locationSelected]);

  return (
    <Layout.Screen barStyle="dark-content">
      <Layout.ScreenHeaderBack
        title={feedbackEntity.getCode()}
        right={
          isViewEdit && (
            <TouchableOpacity
              style={style.rightTitleContainer}
              onPress={onPressEdit}>
              <Typography
                style={style.rightTitle}
                text="Sửa"
                textType="medium"
                type="h3"
                color={colors.primary.o500}
              />
            </TouchableOpacity>
          )
        }
      />
      <Layout.SafeAreaContainer edges={['bottom', 'left', 'right']}>
        <Layout.Loading loading={loading}>
          <Layout.Error error={error} subTitle={message}>
            <ScrollView style={style.body} showsVerticalScrollIndicator={false}>
              <View style={style.createDate}>
                <Image source={ic_rp_calendar} />
                <Typography
                  color={colors.secondary.o400}
                  textType="medium"
                  text={feedbackEntity.getCreatedDate()}
                  style={style.titleDate}
                />
              </View>
              <Typography
                style={style.titleContainer}
                type="h3"
                textType="medium"
                text="SỐ KHÁCH TRONG LỐT"
              />
              <View style={[style.rowBox, style.numberCustomer]}>
                <View>
                  <Typography text="Người lớn" />
                  <Typography
                    style={style.itemBox}
                    type="h5"
                    color={colors.secondary.o500}
                    text="Từ 18 tuổi đổ lên"
                  />
                </View>
                <View style={style.numberValue}>
                  <Typography
                    text={feedbackEntity.getNumberOfAdults()}
                    type="h2"
                    textType="medium"
                  />
                </View>
              </View>
              <View style={[style.rowBox, style.numberCustomer]}>
                <View>
                  <Typography text="Trẻ em" />
                  <Typography
                    style={style.itemBox}
                    type="h5"
                    color={colors.secondary.o500}
                    text="Độ tuổi từ 2 - 18"
                  />
                </View>
                <View style={style.numberValue}>
                  <Typography
                    text={feedbackEntity.getNumberOfChildren()}
                    type="h2"
                    textType="medium"
                  />
                </View>
              </View>
              {feedbackEntity.getAdvisorCode() !== '' && (
                <View>
                  <Typography
                    style={style.titleContainer}
                    type="h3"
                    textType="medium"
                    text="Chuyên gia tư vấn"
                  />
                  <Typography
                    style={style.assignee}
                    text={StringUtils.format(
                      '{0} - {1}',
                      feedbackEntity.getAdvisorCode(),
                      feedbackEntity.getAdvisorName(),
                    )}
                  />
                </View>
              )}

              <View>
                <Typography
                  style={style.titleContainer}
                  type="h3"
                  textType="medium"
                  text="Trạng thái mua hàng"
                />
                <StatusTagView status={feedbackEntity.getStatusValue()} />
                {storeFeedbackPilot && behaviors.length > 0 && (
                  <>
                    <View>
                      <Typography
                        style={[style.titleContainer, style.mb24]}
                        type="h3"
                        textType="medium"
                        text="KH đến cửa hàng thông qua nguồn"
                      />
                      {behaviors.map(e => {
                        return (
                          <View style={[style.row, style.spaceBetween]}>
                            <Typography
                              key={e.getId()}
                              style={style.reasonItem}
                              text={e.keyBehavior.value}
                            />
                          </View>
                        );
                      })}
                    </View>
                  </>
                )}
              </View>
              {feedbackEntity.getStatusValue() === FeedbackStatus.NOT_BUY && (
                <>
                  <View>
                    {feedbackEntity.getReasons().length > 0 && (
                      <>
                        <Typography
                          style={[style.titleContainer, style.mb24]}
                          type="h3"
                          textType="medium"
                          text="Lý do khách hàng không mua hàng?"
                        />
                        {feedbackEntity.getReasons().map(e => {
                          return (
                            <Typography
                              key={e}
                              style={style.reasonItem}
                              text={e}
                            />
                          );
                        })}
                      </>
                    )}
                  </View>
                  <View>
                    <Typography
                      style={[style.titleContainer]}
                      type="h3"
                      textType="medium"
                      text="Lý do cụ thể"
                    />
                    <Typography
                      style={style.reasonItem}
                      text={feedbackEntity.getReasonDetail()}
                    />
                  </View>
                </>
              )}
              <SafeAreaView edges={['bottom']} />
            </ScrollView>
          </Layout.Error>
        </Layout.Loading>
      </Layout.SafeAreaContainer>
    </Layout.Screen>
  );
};

export default FeedbackDetailScreen;
