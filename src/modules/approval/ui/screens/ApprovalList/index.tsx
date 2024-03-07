import {View} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {MainStackScreenProps} from 'ui/screens/MainStack';
import {ErrorType, Layout, Typography} from 'common-ui';
import ApprovalTabView from '../../views/TabView';
import {style} from './style';
import {ThemeStyle} from 'assets/theme';
import {AssignEnum} from './assignEnum';
import AssignTabView from './AssignTabView';
import {ApplicationItemView, SelectApplicationView} from '../../views';
import {
  EnumTxtTypeHrm,
  EnumTypeHrm,
  getRequestType,
  tabs,
} from 'modules/approval/config';
import {CTButton} from 'components/Button';
import {Font} from 'components/Base/Text';
import CTFLastList from 'components/CTFlatList';
import {
  bg_empty_application,
  bg_search_empty_application,
  ic_application_approval,
  ic_application_remove,
} from 'assets/images';
import {useApplicationData} from 'modules/approval/hooks/useApplicationData';
import {HrmList, ParamHrmList} from 'modules/approval/models/response';
import EmptyState from '../../views/EmptyState';
import {useAuth} from 'providers/contexts/AuthContext';
import {Metadata, StringUtils} from 'common';
import {SearchInput} from 'ui/view/Common';
import {MainRouteConfig} from 'config/RouteConfig';
import CTCheckbox from 'components/Form/CTCheckbox';
import ModalConfirmApplicationView, {
  ModalConfirmApplicationRef,
} from '../../views/ModalConfirmApplicationView';
import {showError} from 'utils/ToastUtils';

const optionsRequestType = Object.keys(EnumTxtTypeHrm).map(key => ({
  value: key,
  label: EnumTxtTypeHrm[key as EnumTypeHrm],
}));

type Props = MainStackScreenProps<'Approval'>;
const ApprovalScreen: React.FC<Props> = ({navigation, route}) => {
  const {
    loading,
    isLoadMore,
    applicationData,
    pagination,
    setPagination,
    searchApplication,
    searchApplicationMore,
    approveAll,
    rejectAll,
  } = useApplicationData();

  const [error, setError] = useState<ErrorType | false>(false);
  const [activeTab, setActiveTab] = useState<string>('all');
  const [assign, setAssign] = useState<AssignEnum>(AssignEnum.mySelf);
  const [requestType, setRequestType] = useState<EnumTypeHrm | null>(null);
  const {profile} = useAuth();
  const [firstLoading, setFirstLoading] = useState<boolean>(true);
  const [searchKey, setSearchKey] = useState<string>('');
  const [selectedRequests, setSelectedRequests] = useState<BulkSelection>({});
  const [selectedCount, setSelectedCount] = useState(0);
  const [isApproval, setIsApproval] = useState<boolean>(false);
  const modalRef = React.createRef<ModalConfirmApplicationRef>();

  type BulkSelection = Record<
    string,
    {
      appSubObjectId: number;
      appSubObject: string;
      appSubObjectCode: string;
    }
  >;

  function mapBy(item: HrmList): string {
    const appSubObjectCode = item.appSubObjectCode || 'resigns';
    if (item.appSubObjectId) {
      return StringUtils.format(
        '{0}_{1}',
        appSubObjectCode,
        item.appSubObjectId,
      );
    }
    return StringUtils.format('{0}_{1}', appSubObjectCode, item.id);
  }

  function getBulkActionPayload(data: BulkSelection): Record<string, number[]> {
    return Object.values(data).reduce((acc, item) => {
      const type = getRequestType(item.appSubObject);
      if (!acc[type]) acc[type] = [];
      acc[type].push(item.appSubObjectId);
      return acc;
    }, {} as Record<string, number[]>);
  }

  const handleSelectItem = (item: HrmList, checked: boolean) => {
    // setSelectApplication(selectApplicatioin)
    const newSelection = {...selectedRequests};
    if (!checked) {
      delete newSelection[mapBy(item)];
      setSelectedCount(prevCount => prevCount - 1);
    } else {
      const appSubObjectCode = item.appSubObjectCode || 'resigns';
      const appSubObjectId = mapBy(item).replace(
        StringUtils.format('{0}_', appSubObjectCode),
        '',
      );
      newSelection[mapBy(item)] = {
        appSubObject: item.appSubObject,
        appSubObjectCode: appSubObjectCode,
        appSubObjectId: parseInt(appSubObjectId, 10),
      };
      setSelectedCount(prevCount => prevCount + 1);
    }

    setSelectedRequests(newSelection);
  };

  const deselectAll = () => {
    setSelectedRequests({});
    setSelectedCount(0);
  };

  const selectAll = () => {
    if (selectedCount < applicationData.length) {
      setSelectedCount(applicationData.length);
      setSelectedRequests(
        applicationData.reduce((acc: BulkSelection, item) => {
          acc[mapBy(item)] = {
            appSubObject: item.appSubObject,
            appSubObjectCode: item.appSubObjectCode,
            appSubObjectId: mapBy(item),
          };

          return acc;
        }, {}),
      );
    } else {
      deselectAll();
    }
  };

  const fetchApplicationData = () => {
    const queryParams: ParamHrmList = {
      limit: pagination.limit,
      page: pagination.page,
    };

    if (activeTab !== 'all') {
      queryParams.appApprovalStatus = tabs.find(
        e => e.key === activeTab,
      )?.title;
    }

    if (assign === AssignEnum.assignToMe) {
      queryParams.appApprovalIds = profile?.fullName;
    } else {
      queryParams.personnelCode = profile?.code;
    }

    if (searchKey) {
      queryParams.s = searchKey;
      queryParams.page = 1;
    }

    if (requestType) {
      queryParams.type = requestType;
      queryParams.page = 1;
    }

    searchApplication(queryParams);
    deselectAll();
  };

  const handleApproveOrReject = async (action: 'approve' | 'reject') => {
    if (!selectedCount) {
      return showError('Thất bại');
    }
    modalRef.current?.close();

    try {
      const payload = getBulkActionPayload(selectedRequests);
      if (action === 'approve') {
        await approveAll(payload);
      } else {
        await rejectAll(payload);
      }

      setSelectedCount(0);
      setSelectedRequests({});

      fetchApplicationData();
    } catch (err) {
      modalRef.current?.close();
    }
  };

  const onLoadMore = (page: number) => {
    setPagination({limit: pagination.limit, page: page});
    const queryParams: ParamHrmList = {
      limit: pagination.limit,
      page: page,
    };

    if (activeTab !== 'all') {
      queryParams.appApprovalStatus = tabs.find(
        e => e.key === activeTab,
      )?.title;
    }

    if (assign === AssignEnum.assignToMe) {
      queryParams.appApprovalIds = profile?.fullName;
    } else {
      queryParams.personnelCode = profile?.code.toLocaleUpperCase();
    }

    if (searchKey) {
      queryParams.s = searchKey;
    }

    if (requestType) {
      queryParams.type = requestType;
    }

    searchApplicationMore(applicationData, queryParams);
  };

  const onRefresh = () => {
    setPagination({limit: pagination.limit, page: 1});
    const queryParams: ParamHrmList = {
      limit: pagination.limit,
      page: 1,
    };

    if (activeTab !== 'all') {
      queryParams.appApprovalStatus = tabs.find(
        e => e.key === activeTab,
      )?.title;
    }

    if (assign === AssignEnum.assignToMe) {
      queryParams.appApprovalIds = profile?.fullName;
    } else {
      queryParams.personnelCode = profile?.code.toLocaleUpperCase();
    }

    if (searchKey) {
      queryParams.s = searchKey;
    }

    if (requestType) {
      queryParams.type = requestType;
    }

    searchApplicationMore(applicationData, queryParams);
  };

  useEffect(() => {
    if (!profile?.code) return;

    fetchApplicationData();
    setFirstLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile, activeTab, assign, requestType, searchKey]);

  const buttonContent = () => {
    if (selectedCount === 0) {
      return (
        <Layout.ScreenBottom>
          <View style={style.viewBottom}>
            <CTButton
              style={{flex: 1}}
              onPress={() => {
                navigation.navigate(MainRouteConfig.ApprovalUpdate);
              }}
              text="Tạo mới đơn từ"
              font={Font.Medium}
            />
          </View>
        </Layout.ScreenBottom>
      );
    }
    return (
      <Layout.ScreenBottom>
        <View style={style.viewBottom}>
          <CTButton
            type="grey"
            style={style.reject}
            onPress={() => {
              setIsApproval(false);
              modalRef.current?.open();
            }}
            text={StringUtils.format('Không duyệt ({0})', selectedCount)}
            font={Font.Medium}
          />
          <CTButton
            style={{flex: 1}}
            onPress={() => {
              setIsApproval(true);
              modalRef.current?.open();
            }}
            text={StringUtils.format('Duyệt ({0})', selectedCount)}
            font={Font.Medium}
          />
        </View>
      </Layout.ScreenBottom>
    );
  };

  const modalView = useMemo(() => {
    if (isApproval) {
      return (
        <ModalConfirmApplicationView
          ref={modalRef}
          title="Duyệt đơn"
          subTitle={StringUtils.format(
            'Bạn xác nhận duyệt {0} đơn này?',
            selectedCount,
          )}
          icon={ic_application_approval}
          onConfirm={() => {
            handleApproveOrReject('approve');
          }}
        />
      );
    }
    return (
      <ModalConfirmApplicationView
        title="Không duyệt"
        subTitle={StringUtils.format(
          'Bạn không duyệt {0} đơn này?',
          selectedCount,
        )}
        icon={ic_application_remove}
        ref={modalRef}
        onConfirm={() => {
          handleApproveOrReject('reject');
        }}
      />
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isApproval, modalRef]);

  const EmptyView =
    searchKey && searchKey !== '' ? (
      <EmptyState icon={bg_empty_application} title="Không tìm thấy kết quả" />
    ) : (
      <EmptyState icon={bg_search_empty_application} title="Không có đơn nào" />
    );

  return (
    <Layout.Screen barStyle="dark-content">
      <Layout.ScreenHeaderBack
        title="Đơn từ"
        children={
          <View style={[ThemeStyle.headerSearch]}>
            <SearchInput
              placeholder="Tìm theo YD, tên nhân sự"
              value={searchKey}
              onChangeText={value => setSearchKey(value)}
            />
          </View>
        }
      />
      <Layout.SafeAreaContainer edges={['bottom']}>
        <View style={style.header}>
          <ApprovalTabView
            active={activeTab}
            onPress={v => {
              setActiveTab(v);
              if (v === 'all') {
                setAssign(AssignEnum.mySelf);
              }
            }}
          />
        </View>
        <View style={ThemeStyle.separator} />
        <View style={style.container}>
          {activeTab !== 'all' && (
            <AssignTabView assign={assign} onPress={setAssign} />
          )}
          <View style={style.row2}>
            <View style={style.row2.type}>
              <SelectApplicationView
                title="Chọn loại đơn"
                value={requestType}
                dataSource={optionsRequestType}
                onChangeValue={setRequestType}
              />
            </View>
            {assign === AssignEnum.assignToMe &&
              activeTab === 'pendingApproval' && (
                <View style={style.checkAll}>
                  <CTCheckbox
                    disabled={false}
                    value={
                      selectedCount !== 0 &&
                      selectedCount === applicationData.length
                    }
                    onValueChange={() => {
                      selectAll();
                    }}
                    label={<Typography text="Chọn tất cả" />}
                  />
                </View>
              )}
          </View>
          <Layout.Loading loading={loading}>
            <Layout.Error error={error}>
              <CTFLastList
                onRefresh={onRefresh}
                firstLoading={firstLoading}
                paging={pagination as Metadata}
                isLoadMore={isLoadMore}
                onLoadMore={onLoadMore}
                style={ThemeStyle.flatList}
                data={applicationData}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                keyboardShouldPersistTaps="handled"
                isRefreshing={false}
                emptyView={EmptyView}
                renderItem={({item}) => (
                  <ApplicationItemView
                    showStatus={assign !== AssignEnum.assignToMe}
                    showReason={
                      item.appSubObjectCode !== EnumTypeHrm.OVERTIME &&
                      item.appSubObjectCode !== EnumTypeHrm.SHIFTCHANGE
                    }
                    onClick={data => {
                      if (
                        !data.appSubObjectCode ||
                        data.appSubObjectCode === ''
                      )
                        data.appSubObjectCode = 'resigns';

                      navigation.navigate(MainRouteConfig.ApprovalDetail, {
                        id: data.appSubObjectId || data.id,
                        type: data.appSubObjectCode,
                      });
                    }}
                    key={item.id}
                    data={item}
                    type={requestType as EnumTypeHrm}
                    isChecked={Boolean(selectedRequests[mapBy(item)])}
                    onSelect={handleSelectItem}
                  />
                )}
              />
            </Layout.Error>
          </Layout.Loading>
        </View>
        {buttonContent()}
        {modalView}
      </Layout.SafeAreaContainer>
    </Layout.Screen>
  );
};
export default ApprovalScreen;
