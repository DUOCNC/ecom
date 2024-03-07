import {useEffect, useState} from 'react';
import {HrmApplications} from '../models/response';
import {EnumTypeHrm} from '../config';
import {
  approveApplication,
  deleteHrmApplicationsById,
  getHrmApplicationsById,
  rejectApplication,
} from '../services';
import {showError, showSuccess} from 'utils/ToastUtils';

export function useHrmData(id: string, type: EnumTypeHrm) {
  const [hrmData, setHrmData] = useState<HrmApplications | null>(null);
  const [loading, setLoading] = useState<boolean>();
  const [submitting, setSubmitting] = useState(false);

  const approveOrReject = async (
    action: 'approveRequest' | 'rejectRequest',
  ) => {
    try {
      setSubmitting(true);

      if (action === 'approveRequest') {
        await approveApplication(id, type);
      } else {
        await rejectApplication(id, type);
      }

      showSuccess('Thành công');
      fetchData();
    } catch (err: any) {
      showError(err.response.data.errors.base[0] ?? 'Thất bại');
    } finally {
      setSubmitting(false);
    }
  };

  const removeRequest = async () => {
    try {
      setSubmitting(true);
      await deleteHrmApplicationsById(id, type);

      showSuccess('Xóa đơn thành công');
    } catch (err: any) {
      showError(err.response.data.errors.base[0] ?? 'Thất bại');
    } finally {
      setSubmitting(false);
    }
  };

  const approveRequest = () => approveOrReject('approveRequest');
  const rejectRequest = () => approveOrReject('rejectRequest');

  const fetchData = () => {
    setLoading(true);
    getHrmApplicationsById(id, type)
      .then(resp => {
        if (resp.data && resp.data.data) {
          setHrmData(resp.data.data);
        }
      })
      .catch(err => console.error('Fetch request detail error', err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (!id || !type) return;

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, type]);

  return {
    loading,
    submitting,
    hrmData,
    removeRequest,
    approveRequest,
    rejectRequest,
  };
}
