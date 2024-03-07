import {useRef, useState} from 'react';
import {HrmList, ParamHrmList} from '../models/response';
import {
  bulkApproval,
  bulkRejection,
  getAllHrmApplication,
} from '../services/index';
import {debounce} from 'lodash';
import {showError, showSuccess} from 'utils/ToastUtils';
import {PageResponse} from 'model/base/base-metadata.response';
import {EnumTypeHrm} from '../config';

type PaginationType = {
  page: number;
  limit?: number;
  total?: number;
};

export function useApplicationData() {
  const [applicationData, setApplicationData] = useState<HrmList[]>([]);
  const [pagination, setPagination] = useState<PaginationType>({
    limit: 10,
    page: 1,
    total: 0,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [isLoadMore, setLoadMore] = useState<boolean>(false);

  const fetchApplicationData = async (queryParams: ParamHrmList) => {
    setLoading(true);
    try {
      let res: {data: PageResponse<HrmList>};

      if ('type' in queryParams && typeof queryParams.type === 'string') {
        res = await getAllHrmApplication(
          queryParams.type as EnumTypeHrm,
          queryParams,
        );
      } else {
        res = await getAllHrmApplication('', queryParams);
      }
      const data = res.data.data;
      setApplicationData(data.items as unknown as HrmList[]);
      setPagination(prevPag => ({
        ...prevPag,
        total: data.metadata.total,
      }));
    } catch (err) {
      console.error('Fetch application data error', err);
    } finally {
      setLoading(false);
      setLoadMore(false);
    }
  };

  const fetchApplicationDataMore = async (
    preData: HrmList[],
    queryParams: ParamHrmList,
  ) => {
    setLoadMore(true);
    try {
      let res: {data: PageResponse<HrmList>};

      if ('type' in queryParams && typeof queryParams.type === 'string') {
        res = await getAllHrmApplication(
          queryParams.type as EnumTypeHrm,
          queryParams,
        );
      } else {
        res = await getAllHrmApplication('', queryParams);
      }
      const data = res.data.data;
      setApplicationData([...preData, ...(data.items as unknown as HrmList[])]);
      setPagination(prevPag => ({
        ...prevPag,
        total: data.metadata.total,
      }));
    } catch (err) {
      console.error('Fetch application data error', err);
    } finally {
      setLoading(false);
      setLoadMore(false);
    }
  };

  const searchApplication = useRef(
    debounce((params: Record<string, unknown>) => {
      fetchApplicationData(params);
    }, 500),
  );

  const searchApplicationMore = useRef(
    debounce((precData: HrmList[], params: Record<string, unknown>) => {
      fetchApplicationDataMore(precData, params);
    }, 500),
  );

  const approveOrReject = async (
    action: 'approve' | 'reject',
    payload: Record<EnumTypeHrm, number[]>,
  ) => {
    setLoading(true);
    try {
      if (action === 'approve') {
        await bulkApproval(payload);
      } else {
        await bulkRejection(payload);
      }
      showSuccess('Thành công');
    } catch (err: any) {
      showError(err.response.data.errors.base[0] ?? 'Thất bại');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const approveAll = (payload: Record<EnumTypeHrm, number[]>) =>
    approveOrReject('approve', payload);

  const rejectAll = (payload: Record<EnumTypeHrm, number[]>) =>
    approveOrReject('reject', payload);

  return {
    isLoadMore,
    setLoadMore,
    loading,
    setLoading,
    pagination,
    setPagination,
    applicationData,
    searchApplication: searchApplication.current,
    searchApplicationMore: searchApplicationMore.current,
    approveAll,
    rejectAll,
  };
}
