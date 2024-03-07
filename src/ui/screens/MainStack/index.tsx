import React, {FC} from 'react';
import {ParamListBase} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {MainRouteConfig} from 'config/RouteConfig';
import VersionInformation from './VersionInformationScreen';
import BarcodeScreen from './BarcodeScreen';
import {
  PosListScreen,
  PosReturnListScreen,
  OrderReturnDetailScreen,
  OrderDetailScreen,
  O2OListScreen,
} from './Order';
import {ReportTopStoreDto} from 'model/dto/ReportService/ReportTopStoreDto';
import {
  CustomListScreen,
  DetailCustomerScreen,
  SearchCustomerScreen,
} from './Customer';
import FeatureScreen from './FeatureScreen';
import {VariantInventoryQuery} from 'model/query/VariantInventoryQuery';
import {ReportQuery} from 'model/query/ReportQuery';
import {OrderQuery} from 'model/query/OrderQuery';
import HelpScreen from './HelpScreen';
import AccountDeleteRequestScreen from './AccountDeleteRequestScreen';
import ReportTopSaleScreen from './Report/ReportRetailScreen/ReportTopSaleScreen';
import {
  ReportRetailScreen,
  ReportCustomerScreen,
  ConversionEachAssigneeScreen,
  ConvertRateAssigneeScreen,
  NotBuyAssigneeScreen,
  ReportCustomerDetailScreen,
  ReportCustomerReceivedScreen,
  ReportCustomerNotBuyDetailScreen,
  ReportCustomerRateDetailScreen,
  ReportCustomerVisitorScreen,
  ReportEmulationRSMScreen,
  ReportEmulationASMScreen,
  ReportEmulationPOSScreen,
  ReportConversionScreen,
  ReportConversionDetailScreen,
} from 'modules/analytic/ui/screens';
import {FeedbackDetailScreen, FeedbackRecordScreen} from 'modules/feedback/ui';
import {
  AccountJobScreen,
  AccountStoreScreen,
  ExpectedSalaryScreen,
  ProfileScreen,
  SupportStoreScreen,
} from 'modules/personalize/ui';
import {IReportCustomerDetailParam} from 'modules/analytic/models/interface';
import {VariantListScreen, VariantDetailScreen} from 'modules/product/ui';
import ReportGeneralScreen from './Report/ReportGeneralScreen';
import MainScreen from './MainScreen';
import {VariantSearchScreen} from 'modules/product/ui/';
import InventoryDetailVariant from 'modules/product/ui/screens/InventoryDetailVariant';
import {ProductContactScreen} from 'modules/product/ui/screens';
import CountryScreen from './CountryScreen';
import CityScreen from './CityScreen';
import FeedbackScreen from 'ui/screens/MainStack/FeedbackScreen';
import MaterialStoryScreen from 'ui/screens/MainStack/MaterialStoryScreen';
import {
  AddCustomerOrderScreen,
  CreateCustomerScreen,
  OrderBarcodeScanScreen,
} from 'modules/order/ui';
import {
  AddProductOrderScreen,
  GenerateBarCodeScreen,
  OrderLineItemScreen,
  PickGiftScreen,
  PickPromotionScreen,
  PosCreateScreen,
  ProductPositioningBarCodeScreen,
} from 'modules/order/ui/screens';
import PickPromotionOrderScreen from 'modules/order/ui/screens/PickPromotionOrderScreen';
import {
  TimekeepingScreen,
  TimeSheetDetailScreen,
  TimeSheetScreen,
} from 'modules/timekeeping/ui/screens';
import {WorkdayDateEntity} from 'modules/timekeeping/models/entities';

import AssigneeScreen from './AssigneeScreen';
import GenderScreen from './GenderScreen';
import WardScreen from './WardScreen';
import AreaScreen from './AreaScreen';
import {DistrictEntity} from 'model';
import GenderEntity from 'model/entities/GenderEntity';
import WardEntity from 'model/entities/WardEntity';
import AssigneeEntity from 'model/entities/AssigneeEntity';
import {OrderEntity, OrderLineEntity} from 'modules/order/models';
import {DataSelectCreateCustomer} from 'components/Form/CTSelectNavigate';
import {ReportPerformanceScreen, AwardScreen} from 'modules/performance/ui';
import AssigneeFeedbackScreen from 'ui/screens/MainStack/AssigneeFeedbackScreen';
import FeedbackEditScreen from 'modules/feedback/ui/screens/FeedbackEditScreen';
import CreateSlotScreen from 'modules/feedback/ui/screens/CreateSlotScreen';
import ChangePasswordScreen from './ChangePasswordScreen';
import {ReportQueryRequest} from 'modules/analytic/models/requests';
import WallFeedbackScreen from 'ui/screens/MainStack/WallFeedbackScreen';
import ProductPositioningScreen from 'ui/screens/MainStack/ProductPositioningScreen';
import ProductPositioningSearchScreen from './Order/ProductPositioningSearchScreen';
import OrderO2ODetailScreen from './Order/O2OListScreen/OrderDetailScreen';
import RenewScreen from 'ui/screens/MainStack/RenewScreen';
import QuizScreen from 'modules/personalize/ui/screens/QuizScreen';
import TrainingScreen from 'modules/personalize/ui/screens/TrainingScreen';
import BinLocationEntity from 'modules/product/models/entities/BinLocationEntity';
import YoscanListScreen from 'modules/order/ui/screens/YoscanListScreen';
import YoscanDetailScreen from 'modules/order/ui/screens/YoscanDetailScreen';
import FileScreen from 'modules/personalize/ui/screens/FileScreen';
import NewProductScreen from 'ui/screens/MainStack/NewProductScreen';
import {CustomerScreen} from 'modules/customer/ui/screens';
import UserSupportScreen from 'ui/screens/MainStack/UserSupportScreen';
import {
  NewsScreen,
  NewsDetailScreen,
  AllNewsScreen,
} from 'modules/news/ui/screen';
import {
  TransferDetailScreen,
  TransferScreen,
} from 'modules/transfer/ui/screens';
import QRScreen from './QRScreen';
import {
  ApprovalDetailScreen,
  ApprovalScreen,
  ApprovalUpdateScreen,
} from 'modules/approval/ui/screens';
export interface RootStackParamList extends ParamListBase {
  Main: {
    itemAssignee: AssigneeEntity;
    backScreen?: 'Training' | 'Home';
  };
  Profile: undefined;
  AccountJob: undefined;
  ChangePassword: undefined;
  AccountStore:
    | {link?: string; requireStoreId?: boolean; screenFrom?: string}
    | undefined;
  BarcodeScanner: undefined;
  ProductPositioningBarCode: undefined;
  SearchCustomer: undefined;
  DetailCustomer: {
    id: number;
    name: string;
    action: 'create' | 'edit' | undefined;
  };
  PosCreate:
    | undefined
    | {
        customerId: number;
        lineItem:
          | {item: OrderLineEntity; index: number; isNew: boolean}
          | undefined;
        barcode: {type: string; value: string};
        order: OrderEntity;
        itemClick: DistrictEntity;
        itemWard: WardEntity;
      };
  AddCustomer: {
    sourceId: number;
    storeId: number;
    barcode: string;
    phone: string;
  };
  VariantDetail: {variantId: number; sku: string; productId: number};
  DetailVariantInventory: {id: number} | undefined;
  AllTopStores: {stores: ReportTopStoreDto[]};
  BarcodeScan: {
    type: 'variant' | 'customer';
    link: string;
    returnLink?: string;
    data?: DataSelectCreateCustomer;
  };
  OrderDetail: {
    id: number;
    code: string;
  };
  OrderReturnDetail: {
    id: number;
    code: string;
  };
  CreateCustomer: {
    itemClick: DistrictEntity;
    itemGender: GenderEntity;
    itemWard: WardEntity;
    itemAssignee: AssigneeEntity;
    barcode: {
      type: string;
      value: string;
    };
    phoneAutofill: string;
  };
  VariantProduct: {
    id: number;
    code: string;
  };
  FilterVariant: {
    query?: VariantInventoryQuery;
    store_id?: number;
  };
  CustomerList: undefined;
  Feature: undefined;
  AdvFilterVariant: {
    query: VariantInventoryQuery;
  };
  ReportRetail: {query: ReportQuery};
  PosReturnList: undefined;
  AdvReportRetailFilter: {
    query: ReportQuery;
  };
  ReportSaleAssignee: {
    params: ReportQuery;
    type: string;
  };
  PosFilter: {
    query: OrderQuery;
  };
  ReportGeneral: undefined;
  Help: undefined;
  AccountDeleteRequest: undefined;
  ExpectedSalary: undefined;
  VariantList: {keyword: string};
  ProductPositioning: {
    keyword: string;
    items: BinLocationEntity[];
  };
  ReportTopSale: {params: ReportQuery; type: string};
  ConversionDetail: IReportCustomerDetailParam;
  ConvertRateAssignee: IReportCustomerDetailParam;
  NotBuyAssignee: IReportCustomerDetailParam;
  ReportCustomer: IReportCustomerDetailParam;
  ConversionEachAssignee: IReportCustomerDetailParam;
  ReportCustomerDetail: IReportCustomerDetailParam;
  ReportCustomerReceived: IReportCustomerDetailParam;
  ReportCustomerVisitor: IReportCustomerDetailParam;
  ReportCustomerNotBuy: IReportCustomerDetailParam;
  ReportCustomerRate: IReportCustomerDetailParam;
  ProductContact: {storeId: number};
  InventoryDetailVariant: {variantId: number; cityId?: number; city?: string};
  Countries: {countryId: number} | undefined;
  Cities: {
    returnLink: string;
    countryId: number;
    cityId?: number;
  };
  Area: {
    countryId: number;
    returnLink: string;
    data: any;
  };
  Unicorn: undefined;
  Timekeeping: undefined;
  TimeSheet: undefined;
  TimeSheetDetail: {viewDate: string; workdayDateEntity: WorkdayDateEntity};
  ReportPerformance: undefined;
  Award: undefined;
  ReportEmulation: {params: ReportQuery};
  ReportEmulationRSM: {params: ReportQuery};
  ReportEmulationASM: {params: ReportQuery};
  ReportEmulationPOS: {params: ReportQuery};
  FeedbackDetail: {feedbackId: number; firstDate: Date; secondDate: Date};
  FeedbackEdit: {
    feedbackId: number;
    itemAssignee: AssigneeEntity;
    status: string;
    firstDate: Date;
    secondDate: Date;
  };
  FeedbackRecord: {
    firstDate: Date;
    secondDate: Date;
  };
  CreateSlot: {itemAssignee: AssigneeEntity};
  AddCustomerOrder: {
    link: string;
    barcode: {
      type: string;
      value: string;
    };
  };
  ReportConversion: undefined;
  ReportConversionDetail: ReportQueryRequest;
  OrderO2ODetail: {
    id: number;
    code: string;
  };
  PickGift: {
    order: OrderEntity;
    lineItem: OrderLineEntity;
    isNew: boolean;
    lineIndex: number;
  };
  OrderLineItem: {
    order: OrderEntity;
    lineItem: OrderLineEntity;
    isNew: boolean;
    index: number;
    barcode: {
      type: string;
      value: string;
    };
  };
  Quiz: {quizId: number; backScreen?: 'Training' | 'Home'};
  Training: undefined;
  File: {fileType: string; fileUrl: string; unAuth?: boolean};
  NewProduct: undefined;
  YoscanDetail: {
    code: string;
    createdDate: string;
  };
  GenerateBarCode: {
    orderCode: string;
    totalPrice: string;
  };
  OrderBarcodeScan: {};
  CustomerPortrait: {id: number};
  Customer: undefined;
  News: undefined;
  NewsDetail: {id: number};
  AllNews: {autoFocus: boolean | false | undefined};
  Transfer: undefined;
  QR: undefined;
  TransferDetail: {id: number};
  Approval: undefined;
  ApprovalDetail: {id: string; type: string};
  ApprovalUpdate: {id?: string; type?: string};
}

export type MainStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

const Stack = createNativeStackNavigator<RootStackParamList>();

const MainStack: FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={MainRouteConfig.Main}>
      <Stack.Screen name={'Main'} component={MainScreen} />
      <Stack.Screen name={'Profile'} component={ProfileScreen} />
    </Stack.Navigator>
  );
};

export default MainStack;
