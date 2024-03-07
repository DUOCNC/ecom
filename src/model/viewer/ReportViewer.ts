import {ImageSourcePropType} from 'react-native';

export interface ReportMenuViewer {
  icon: ImageSourcePropType;
  id: number;
  title: string;
  screen: string;
  lastIndex?: boolean;
  showFeature?: boolean;
}

export interface ReportItemViewer {
  icon: ImageSourcePropType;
  id: number;
  title: string;
  subTitle: string;
  screen: string;
  lastIndex?: boolean;
  type?: string;
}

export interface ReportRetailKeyDriverViewer {
  rate?: string;
  growthRate?: number;
}

export interface ReportRetailDetailChartViewer {
  rate?: number;
  value?: string;
}

export interface BarChartView {
  value: number;
  label: string;
}

export interface ReportRetailSalaryItemViewer {
  value: number;
  label: string;
}
