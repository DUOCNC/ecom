import {BaseAxiosHrm} from 'common/base';
import {EnumTypeHrm} from '../../config';
import {
  HrmApplications,
  HrmList,
  IBodyRequestCreateHrm,
  ParamHrmList,
  ReasonHrm,
  TimekeepingLocations,
} from '../../models/response';
import {PageResponse} from 'model/base/base-metadata.response';

export const getHrmApplicationsById = (
  hrmId: string,
  type: EnumTypeHrm,
): Promise<{
  data: HrmApplications;
}> => {
  return BaseAxiosHrm.get(`hrm-applications/${type}/${hrmId}.json`);
};

export const deleteHrmApplicationsById = (
  hrmId: string,
  type: EnumTypeHrm,
): Promise<{
  data: HrmApplications;
}> => {
  return BaseAxiosHrm.delete(`hrm-applications/${type}.json?ids=${hrmId}`);
};

export const approveApplication = (
  hrmId: string,
  type: EnumTypeHrm,
): Promise<{
  data: HrmApplications;
}> => {
  return BaseAxiosHrm.put(`hrm-applications/${type}/approval/${hrmId}.json`);
};

export const rejectApplication = (
  hrmId: string,
  type: EnumTypeHrm,
): Promise<{
  data: HrmApplications;
}> => {
  return BaseAxiosHrm.put(`hrm-applications/${type}/reject/${hrmId}.json`);
};

export function bulkApproval(payload: Record<EnumTypeHrm, number[]>) {
  return BaseAxiosHrm.put('hrm-applications/approvals.json', payload);
}

export function bulkRejection(payload: Record<EnumTypeHrm, number[]>) {
  return BaseAxiosHrm.put('hrm-applications/rejects.json', payload);
}

export const getAllHrmApplication = (
  type: EnumTypeHrm | '',
  params?: ParamHrmList,
): Promise<{
  data: PageResponse<HrmList>;
}> => {
  const url =
    'hrm-applications' + (type ? '/' + type : '/applications') + '.json';
  return BaseAxiosHrm.get(url, {params});
};

export const getTimekeepingLocations = (): Promise<
  Array<TimekeepingLocations>
> => {
  const url = 'timekeeping_locations.json?size=500';
  return BaseAxiosHrm.get(url).then(resp => resp.data);
};

export const getReasonHrm = (
  typeName: string,
): Promise<{
  data: Array<ReasonHrm>;
}> => {
  const url = 'hrm-applications/reasons.json';
  return BaseAxiosHrm.get(url, {
    params: {
      typeName,
    },
  });
};
export const createSingleWordHrm = (
  type: EnumTypeHrm = EnumTypeHrm.LEAVES,
  data: Omit<IBodyRequestCreateHrm, 'id'>,
) => {
  const url = `hrm-applications/${type}.json`;
  return BaseAxiosHrm.post(url, data);
};

export const updateSingleWordHrm = (
  id: string,
  type: EnumTypeHrm = EnumTypeHrm.LEAVES,
  data: Omit<IBodyRequestCreateHrm, 'id'>,
) => {
  const url = `hrm-applications/${type}/${id}.json`;
  return BaseAxiosHrm.put(url, data);
};

export function getListEmployeeShifts(
  personnel_code: string,
  date_change: string,
) {
  return BaseAxiosHrm.get(
    `hrm-applications/day-shifts.json?personnel_code=${personnel_code}&date_change=${date_change}`,
  ).then(resp => resp.data);
}

export function getListSystemShifts() {
  return BaseAxiosHrm.get(`hrm-applications/setting/shifts.json`).then(
    resp => resp.data,
  );
}

export function searchEmployeeByQuery(query?: string) {
  let url = `hrm-applications/employees.json`;
  if (query) url += `?s=${query}`;

  return BaseAxiosHrm.get(url).then(resp => resp.data);
}

export function getReasons<T>(requestType: EnumTypeHrm) {
  return BaseAxiosHrm.get(
    `hrm-applications/${requestType}/reasons.json?page=1&limit=50`,
  ).then(resp => resp.data.data.items as T[]);
}

export function getFurlough() {
  return BaseAxiosHrm.get(`hrm-applications/furloughs.json`).then(
    resp => resp.data.data,
  );
}
