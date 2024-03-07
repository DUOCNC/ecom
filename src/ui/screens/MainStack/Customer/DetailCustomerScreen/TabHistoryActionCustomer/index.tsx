import {MaterialTopTabScreenProps} from '@react-navigation/material-top-tabs';
import {bg_search_error} from 'assets/images';
import {ThemeStyle} from 'assets/theme';
import CTFLastList from 'components/CTFlatList';
import CTLayout from 'components/CTLayout';
import EmptyState from 'components/CTScreen/EmptyState';
import {Metadata} from 'model/base/Metadata';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {View} from 'react-native';
import {ReactionHistoryItem} from 'ui/view/CustomerComponent';
import {TabDetailCustomerParams} from '..';
import {TabHistoryStyle} from './style';
import {
  getCustomerApi,
  getUserInteractionApi,
} from 'services/CustomerService/CustomerApi';
import {DetailCustomerDto} from 'model/dto/CustomerService/DetailCustomerDto';
import {IUserInteraction} from 'modules/customer/models/responses/ReactionHistoryRespon';

type Props = MaterialTopTabScreenProps<
  TabDetailCustomerParams,
  'HistoryAction'
>;

const TabHistoryActionCustomer: React.FC<Props> = ({route}: Props) => {
  const id = route.params?.id;
  const firstLoad = useRef<boolean>(true);
  const [firstLoading, setFirstLoading] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [firstError, setFirstError] = useState<false | string>(false);
  const [isRefreshing, setRefreshing] = useState<boolean>(false);
  const [isLoadMore, setLoadMore] = useState<boolean>(false);
  const [reactionHistory, setReactionHistory] = useState<
    Array<IUserInteraction>
  >([]);
  const [metadata, setMetadata] = useState<Metadata | false>(false);
  const [customer, setCustomer] = useState<DetailCustomerDto | null>(null);

  const onReload = () => {
    setFirstLoading(true);
  };

  useEffect(() => {
    if (id && firstLoading) {
      getCustomerApi(
        id,
        detail => {
          setCustomer(detail);
        },
        () => {},
        () => {
          setFirstLoading(false);
        },
      );
    }
    return () => {};
  }, [id, firstLoading]);
  const phones = useMemo(() => {
    return customer?.phone ? [customer?.phone] : [];
  }, [customer]);

  const onRefresh = useCallback(() => {
    if (phones) {
      setRefreshing(true);
      getUserInteractionApi(
        {limit: 10, page: 1, phones: phones},
        result => {
          setReactionHistory(result.items);
          setMetadata(result.metadata);
        },
        errors => {
          setFirstError(errors[0]);
        },
        () => {
          setRefreshing(false);
          firstLoad.current = false;
        },
      );
    }
  }, [phones]);
  const onLoadMore = useCallback(
    (nextPage: number) => {
      if (phones) {
        setLoadMore(true);
        getUserInteractionApi(
          {limit: 10, page: nextPage, phones: phones},
          result => {
            setReactionHistory([...reactionHistory, ...result.items]);
            setMetadata(result.metadata);
          },
          errors => {
            setFirstError(errors[0]);
          },
          () => {
            setLoadMore(false);
          },
        );
      }
    },
    [phones, reactionHistory],
  );

  useEffect(() => {
    if (phones && firstLoading) {
      getUserInteractionApi(
        {limit: 10, page: 1, phones: phones},
        result => {
          if (result.items.length === 0) {
            return;
          }
          setReactionHistory(result.items);
          setMetadata(result.metadata);
        },
        errors => {
          setFirstError(errors[0]);
        },
        () => {
          setFirstLoading(false);
          firstLoad.current = false;
        },
      );
    }
  }, [firstLoading, phones]);
  useEffect(() => {
    let timeout: NodeJS.Timeout | null = null;
    if (!firstLoad.current) {
      timeout = setTimeout(() => {
        if (phones && !firstLoad.current) {
          setLoading(true);
          getUserInteractionApi(
            {limit: 10, page: 1, phones: phones},
            result => {
              setReactionHistory(result.items);
              setMetadata(result.metadata);
            },
            errors => {
              setFirstError(errors[0]);
            },
            () => {
              setLoading(false);
            },
          );
        }
      }, 500);
    }
    return () => {
      timeout && clearTimeout(timeout);
    };
  }, [phones]);
  return (
    <CTLayout.Body>
      <View style={TabHistoryStyle.body}>
        <CTFLastList
          firstLoading={firstLoading}
          onRefresh={onRefresh}
          paging={metadata}
          data={reactionHistory}
          isRefreshing={isRefreshing}
          onLoadMore={onLoadMore}
          onReLoad={onReload}
          error={firstError}
          searching={loading}
          emptyView={
            <EmptyState
              icon={bg_search_error}
              title="Không có lịch sử tương tác"
              subTitle=""
            />
          }
          isLoadMore={isLoadMore}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <ReactionHistoryItem key={item.id} data={item} />
          )}
          ItemSeparatorComponent={() => <View style={ThemeStyle.separator24} />}
        />
      </View>
    </CTLayout.Body>
  );
};

export default TabHistoryActionCustomer;
