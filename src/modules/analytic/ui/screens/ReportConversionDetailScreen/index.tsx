import React, {useEffect} from 'react';
import {ErrorType, FlatListItemControl, Layout, SearchInput} from 'common-ui';
import {useState} from 'react';
import {FlatList, RefreshControl, View} from 'react-native';
import {MainStackScreenProps} from 'ui/screens/MainStack';
import {style} from './style';
import {ReportConversionIndicatorView} from '../../views';
import {ReportConversionStaffEntity} from 'modules/analytic/models/entities';
import {ReportQuery} from 'model/query/ReportQuery';
import {reportConversionService} from 'modules/analytic/services';
import {ReportViewType} from 'modules/analytic/enums';
import {ReportQueryRequest} from 'modules/analytic/models/requests';
import {AppConfig} from 'config/AppConfig';
import {Metadata} from 'modules/analytic/models/base/Metadata';
import {useDebounce} from 'hook';
import {useAuth} from 'providers/contexts/AuthContext';

type Props = MainStackScreenProps<'ReportConversionDetail'>;
const ReportConversionDetailScreen: React.FC<Props> = ({route}) => {
  const {locationSelected} = useAuth();
  const {from_date, to_date, view_date, view_type} = route.params;
  const [loading, setLoading] = useState<boolean>(false);
  const [errorType, setErrorType] = useState<false | ErrorType>(false);
  const [keyword, setKeyword] = useState<string>('');
  const debouncedKeyWord = useDebounce<string>(keyword, 500);
  const [staff, setStaff] = useState<Array<ReportConversionStaffEntity>>([]);
  const [msg, setMsg] = useState<string>('');
  const [firstLoad, setFirstLoad] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [request] = useState<ReportQueryRequest>({
    from_date: from_date,
    to_date: to_date,
    view_date: view_date,
    view_type: view_type,
    page: 1,
    size: AppConfig.MaxLimit,
    store_id: locationSelected.locationId,
  });
  const [isLoadMore, setLoadMore] = useState<boolean>(false);
  const [canLoadMore, setCanLoadMore] = useState<boolean>(false);
  const [metadata, setMetadata] = useState<Metadata>({
    pageIndex: 1,
    pageSize: AppConfig.MaxLimit,
    total: 0,
  });

  const onRefresh = () => {
    if (refreshing || isLoadMore || loading) {
      return;
    }
    reportConversionService.getStaffService(
      {
        ...request,
        page: metadata.pageIndex + 1,
        assignee_name: debouncedKeyWord,
      },
      view_type ?? ReportViewType.day,
      (
        res: Array<ReportConversionStaffEntity>,
        meta: Metadata,
        rsCanLoadMore: boolean,
      ) => {
        setErrorType(false);
        setStaff([...staff, ...res]);
        setMetadata(meta);
        setCanLoadMore(rsCanLoadMore);
      },
      () => setRefreshing(true),
      () => setRefreshing(false),
    );
  };
  const onLoadMore = () => {
    if (isLoadMore || !canLoadMore || loading) {
      return;
    }
    reportConversionService.getStaffService(
      {
        ...request,
        page: metadata.pageIndex + 1,
        assignee_name: debouncedKeyWord,
      },
      view_type ?? ReportViewType.day,
      (
        res: Array<ReportConversionStaffEntity>,
        meta: Metadata,
        rsCanLoadMore: boolean,
      ) => {
        setErrorType(false);
        setStaff([...staff, ...res]);
        setMetadata(meta);
        setCanLoadMore(rsCanLoadMore);
      },
      () => {},
      () => setLoadMore(true),
      () => setLoadMore(false),
    );
  };

  const handleSuccess = (
    report: Array<ReportConversionStaffEntity>,
    meta: Metadata,
    rsCanLoadMore: boolean,
  ) => {
    setErrorType(false);
    setMetadata(meta);
    setStaff(report);
    setCanLoadMore(rsCanLoadMore);
  };

  const onError = (code: ErrorType, message?: string) => {
    setErrorType(code);
    if (message) {
      setMsg(message);
    }
    setLoading(false);
  };

  const getData = (param: ReportQuery, timeType: string) => {
    reportConversionService.getStaffService(
      param,
      timeType,
      handleSuccess,
      onError,
      () => setLoading(true),
      () => setLoading(false),
    );
  };

  useEffect(() => {
    if (firstLoad) {
      getData({...request}, request.view_type ?? ReportViewType.day);
    }
    setFirstLoad(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstLoad, request]);

  useEffect(() => {
    if (!firstLoad) {
      getData(
        {...request, assignee_name: debouncedKeyWord},
        request.view_type ?? ReportViewType.day,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedKeyWord, request]);

  return (
    <Layout.Screen barStyle="dark-content">
      <Layout.ScreenHeaderBack
        title="Chi tiết nhân viên"
        children={
          <View style={style.search}>
            <SearchInput
              autoFocus={false}
              value={keyword}
              onValueChange={txt => setKeyword(txt)}
              placeholder="Tìm kiếm nhân viên"
            />
          </View>
        }
      />
      <Layout.SafeAreaContainer edges={['bottom']}>
        <Layout.Loading loading={loading}>
          <Layout.Error error={errorType} subTitle={msg}>
            <View style={style.container}>
              {staff && staff.length > 0 && (
                <FlatList
                  keyboardShouldPersistTaps="handled"
                  refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={onRefresh}
                    />
                  }
                  bounces={true}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={(e, i) => i.toString()}
                  data={staff}
                  onEndReached={onLoadMore}
                  ListFooterComponent={
                    <FlatListItemControl.LoadMore isLoadMore={isLoadMore} />
                  }
                  renderItem={({item, index}) => (
                    <View key={index}>
                      <ReportConversionIndicatorView user={item} />
                    </View>
                  )}
                />
              )}
            </View>
          </Layout.Error>
        </Layout.Loading>
      </Layout.SafeAreaContainer>
    </Layout.Screen>
  );
};

export default ReportConversionDetailScreen;
