import {View} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {MainStackScreenProps} from 'ui/screens/MainStack';
import {ErrorType, Layout, SearchInput} from 'common-ui';
import {MainRouteConfig} from 'config/RouteConfig';
import transferService from 'modules/transfer/services/TransferService';
import {TransferEntity} from 'modules/transfer/models/entities';
import style from './style';
import {TransferDetailTabView, TransferLineItemView} from '../../views';
import {TransferTabConfig} from 'modules/transfer/config/TransferTabConfig';
import BoxGeneralView from './BoxGeneralView';
import BoxStoreView from './BoxStoreView';
import {ScrollView} from 'react-native-gesture-handler';
import EmptyState from 'components/CTScreen/EmptyState';
import {bg_empty} from 'assets/images';
import {CTButton} from 'components/Button';
import {Font} from 'components/Base/Text';
import {SafeAreaView} from 'react-native-safe-area-context';
import StringUtils from 'utils/StringUtils';
import {hideModal, showLoading} from 'reduxs/Modals/ModalReducer';
import {useAppDispatch} from 'hook';
import {INVENTORY_PERMISSION} from 'modules/analytic/permission';
import {useAuth} from 'providers/contexts/AuthContext';
import BoxFulfillmentView from './BoxFulfillmentView';

type Props = MainStackScreenProps<'TransferDetail'>;
const TransferDetailScreen: React.FC<Props> = ({navigation, route}) => {
  const {id} = route.params;
  const [loading, setLoading] = useState<boolean>(true);
  const [msg, setMsg] = useState<string>('');
  const [error, setError] = useState<ErrorType | false>(false);
  const [transfer, setTransfer] = useState<TransferEntity>(
    TransferEntity.createEmpty(),
  );
  const [tab, setTab] = useState<string>(TransferTabConfig.INFO);
  const [keySearch, setKeySearch] = useState<string>('');
  const dispatch = useAppDispatch();
  const {profile} = useAuth();

  useEffect(() => {
    //get data
    setLoading(true);
    transferService.getTransferDetail(
      id,
      entity => {
        setTransfer(entity);
      },
      (e, m) => {
        setError(e);
        setMsg(m);
      },
      () => setLoading(true),
      () => setLoading(false),
    );
    setLoading(false);
  }, [id]);

  const onBack = () => {
    navigation.reset({
      index: 0,
      routes: [
        {name: MainRouteConfig.Main},
        {
          name: MainRouteConfig.Transfer,
        },
      ],
    });
  };

  const lineItems = useMemo(() => {
    const list = transfer?.getLineItems().filter(e => {
      return (
        StringUtils.fullTextSearch(keySearch, e.getVariantName()) ||
        StringUtils.fullTextSearch(keySearch, e.getSku())
      );
    });
    if (!list) {
      return [];
    }
    return list;
  }, [keySearch, transfer]);

  const action = {
    confirmArrived: () => {
      dispatch(showLoading());
      transferService.confirmArrived(
        id,
        res => {
          setTransfer(res);
        },
        () => {},
        () => {
          dispatch(showLoading());
        },
        () => {
          dispatch(hideModal());
        },
      );
    },
  };

  const confirmArrivedPermission = useMemo(() => {
    return profile?.checkPermissionByKey(INVENTORY_PERMISSION.WRITE);
  }, [profile]);

  return (
    <Layout.Screen barStyle="light-content">
      <Layout.ScreenHeaderBack title="Chi tiết phiếu hàng" onBackPress={onBack}>
        <View style={style.tab}>
          <TransferDetailTabView
            tab={tab}
            transfer={transfer}
            onPress={t => {
              setTab(t);
            }}
          />
        </View>
      </Layout.ScreenHeaderBack>
      <Layout.Container edges={['bottom']}>
        <Layout.Loading loading={loading}>
          <Layout.Error error={error} subTitle={msg}>
            {tab === TransferTabConfig.INFO ? (
              <ScrollView
                style={style.container}
                showsVerticalScrollIndicator={false}>
                <BoxGeneralView transfer={transfer} />
                <BoxStoreView transfer={transfer} />
                {transfer.getFulfillment() && (
                  <BoxFulfillmentView transfer={transfer} />
                )}
              </ScrollView>
            ) : (
              <ScrollView
                style={style.container}
                showsVerticalScrollIndicator={false}>
                <View style={style.product}>
                  <View style={style.inputSearch}>
                    <SearchInput
                      value={keySearch}
                      onValueChange={v => setKeySearch(v)}
                      placeholder="Tìm kiếm sản phẩm"
                      enablesReturnKeyAutomatically={true}
                    />
                  </View>
                  <View style={style.listProduct}>
                    {lineItems && lineItems.length > 0 ? (
                      lineItems.map((e, i) => {
                        return (
                          <TransferLineItemView
                            key={i}
                            lineItem={e}
                            index={i}
                            max={lineItems.length - 1}
                          />
                        );
                      })
                    ) : (
                      <EmptyState
                        title="Không tìm thấy sản phẩm"
                        icon={bg_empty}
                      />
                    )}
                  </View>
                </View>
              </ScrollView>
            )}
            {transfer.getStatus() === 'transferring' &&
              confirmArrivedPermission && (
                <Layout.ScreenBottom>
                  <View style={style.viewBottom}>
                    <CTButton
                      onPress={action.confirmArrived}
                      text="Xác nhận hàng về"
                      font={Font.Medium}
                    />
                  </View>
                </Layout.ScreenBottom>
              )}
          </Layout.Error>
        </Layout.Loading>
        <SafeAreaView edges={['bottom']} />
      </Layout.Container>
    </Layout.Screen>
  );
};
export default TransferDetailScreen;
