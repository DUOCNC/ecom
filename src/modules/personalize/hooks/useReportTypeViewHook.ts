import {useConfig} from 'hook';
import {useAuth} from 'providers/contexts/AuthContext';

export function useReportTypeViewHook() {
  const {profile} = useAuth();
  let {reportTypeView} = useConfig();
  let [viewGeneral, viewPersonal] = [false, false];

  if (reportTypeView) {
    let reportTypeViewConfig = JSON.parse(reportTypeView);
    if (reportTypeViewConfig) {
      let {general, personal} = reportTypeViewConfig;
      general = general.split(',');
      personal = personal.split(',');
      if (
        personal &&
        personal.findIndex(
          (e: string) => e === profile?.positionId.toString(),
        ) !== -1
      ) {
        viewPersonal = true;
      }
      if (
        general &&
        general.findIndex(
          (e: string) => e === profile?.positionId.toString(),
        ) !== -1
      ) {
        viewGeneral = true;
      }
    }
  }

  return {viewGeneral, viewPersonal};
}
