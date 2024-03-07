import {configureStore} from '@reduxjs/toolkit';
import countryReducer from './CountryReducer';
import ThemeReducer from './Devices/ThemeReducer';
import ModalReducer from './Modals/ModalReducer';
import versionReducer from './VersionReducer';
import configReducer from './ConfigReducer';
import {categoryReducer, productStoreReducer} from 'modules/product/redux';
import storeReducer from './StoreReducer';
import profileReducer from './ProfileReducer';
import infoReducer from './InfoReducer';
import networkReducer from './NetworkReducer';
import {orderConfigReducer} from 'modules/order/redux';
import taskReducer from './TaskReducer';
import employeeReducer from './EmployeeReducer';

export const MainStore = configureStore({
  reducer: {
    info: infoReducer,
    store: storeReducer,
    network: networkReducer,
    theme: ThemeReducer,
    profile: profileReducer,
    modal: ModalReducer,
    countries: countryReducer,
    version: versionReducer,
    config: configReducer,
    category: categoryReducer,
    productStore: productStoreReducer,
    orderConfig: orderConfigReducer,
    task: taskReducer,
    employee: employeeReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({serializableCheck: false}),
});

export type RootState = ReturnType<typeof MainStore.getState>;

export type AppDispatch = typeof MainStore.dispatch;
