import {EnumTypeHrm} from 'modules/approval/config';
import {
  HrmApplications,
  IDetailCreateHrm,
  Surcharge,
} from 'modules/approval/models/response';

import {Moment} from 'moment';

export type RequestProps = {
  isEditting?: boolean;
  hrmData?: HrmApplications | null;
  requestType: EnumTypeHrm;
  dateFormat?: string;
  timeFormat?: string;
  disabledDate?: (current: Moment) => boolean;
  detail: IDetailCreateHrm[];
  onSetDetailItem: (
    itemKey: React.Key,
    field: keyof IDetailCreateHrm,
    value: unknown,
  ) => void;
  onRemoveDetailItem: (itemIndex: number) => void;
  onAddDetailItem: () => void;
  surcharges: Surcharge[];
  onSetSurcharges: React.Dispatch<React.SetStateAction<Surcharge[]>>;
  setDetail?: React.Dispatch<React.SetStateAction<IDetailCreateHrm[]>>;
  Controller: any;
  control: any;
};
