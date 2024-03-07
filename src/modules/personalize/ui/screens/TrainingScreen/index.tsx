import {View} from 'react-native';
import React, {createRef, useCallback, useEffect, useState} from 'react';
import {MainStackScreenProps} from 'ui/screens/MainStack';
import {ErrorType, Layout, Typography} from 'common-ui';
import style from './style';
import {TaskEntity} from 'modules/personalize/models/entities';
import QuizItem from './QuizItem';
import taskService from 'modules/personalize/services/TaskService';
import {useAuth} from 'providers/contexts/AuthContext';
import {TrainingDetailPopupRef, TrainingDetailPopupView} from '../../views';
import {MyTaskRequest} from 'modules/personalize/models/requests/TaskRequest';
import {AppConfig} from 'config/AppConfig';
import {Metadata} from 'common';
import CTFLastList from 'components/CTFlatList';

const initQuery: MyTaskRequest = {
  limit: AppConfig.MaxLimit,
  info: '',
  page: 1,
};

type Props = MainStackScreenProps<'Training'>;
const TrainingScreen: React.FC<Props> = ({navigation, route}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<ErrorType | false>(false);
  const [tasks, setTasks] = useState<Array<TaskEntity>>([]);
  const {profile} = useAuth();
  const [isLoadMore, setLoadMore] = useState<boolean>(false);
  const [metadata, setMetadata] = useState<Metadata>({
    page: 1,
    limit: AppConfig.MaxLimit,
    total: 0,
  });
  const [firstLoad, setFirstLoad] = useState<boolean>(true);

  const trainingDetail = createRef<TrainingDetailPopupRef>();

  const onError = (err: ErrorType) => {
    setError(err);
  };

  const onSuccess = (d: Array<TaskEntity>, meta: Metadata) => {
    setError(false);
    setLoading(false);
    setTasks(d);
    setMetadata(meta);
  };

  useEffect(() => {
    //init
    if (!firstLoad) {
      return;
    }
    taskService.getTasksService(
      {
        ...initQuery,
        page: 1,
        info: profile?.code,
      },
      onSuccess,
      onError,
      () => {
        setLoading(true);
      },
      () => {
        setLoading(false);
      },
    );
    setFirstLoad(false);
  }, [firstLoad, profile]);

  useEffect(() => {
    //search
    if (firstLoad) {
      return;
    }
    taskService.getTasksService(
      {
        ...initQuery,
        page: 1,
        info: profile?.code,
      },
      onSuccess,
      onError,
      () => {
        setLoading(true);
      },
      () => {
        setLoading(false);
      },
    );
    setFirstLoad(false);
  }, [firstLoad, profile]);

  const onLoadMore = useCallback(
    (page: number) => {
      setLoadMore(true);
      taskService.getTasksService(
        {
          ...initQuery,
          page: page,
          info: profile?.code,
        },
        (entities, meta) => {
          setTasks(prev => [...prev, ...entities]);
          setMetadata(meta);
        },
        onError,
        () => {
          setLoadMore(true);
        },
        () => {
          setLoadMore(false);
        },
      );
    },
    [profile],
  );

  const openDetail = (task: TaskEntity) => {
    trainingDetail.current?.setTask(task);
    trainingDetail.current?.open();
  };

  return (
    <Layout.Screen barStyle="dark-content">
      <Layout.ScreenHeaderBack title="Đào tạo" />
      <Layout.Container>
        <Layout.Loading loading={loading}>
          <Layout.Error error={error}>
            <View style={style.container}>
              <CTFLastList
                firstLoading={firstLoad}
                isLoadMore={isLoadMore}
                paging={metadata}
                onLoadMore={onLoadMore}
                showsVerticalScrollIndicator={false}
                data={tasks}
                keyExtractor={item => item.getId().toString()}
                ListEmptyComponent={() => (
                  <Typography text="Không tìm thấy dữ liệu" />
                )}
                renderItem={({item}) => (
                  <View key={item.getId()} style={style.item}>
                    <QuizItem task={item} onPress={openDetail} />
                  </View>
                )}
              />
            </View>
          </Layout.Error>
        </Layout.Loading>
      </Layout.Container>
      <TrainingDetailPopupView ref={trainingDetail} />
    </Layout.Screen>
  );
};
export default TrainingScreen;
