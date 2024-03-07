import {configureStore} from '@reduxjs/toolkit';
import countryReducer from './CountryReducer';
import ThemeReducer from './Devices/ThemeReducer';
import ModalReducer from './Modals/ModalReducer';
import versionReducer from './VersionReducer';
import configReducer from './ConfigReducer';
import infoReducer from './InfoReducer';
import networkReducer from './NetworkReducer';

export const MainStore = configureStore({
  reducer: {
    info: infoReducer,
    network: networkReducer,
    theme: ThemeReducer,
    modal: ModalReducer,
    countries: countryReducer,
    version: versionReducer,
    config: configReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({serializableCheck: false}),
});

export type RootState = ReturnType<typeof MainStore.getState>;

export type AppDispatch = typeof MainStore.dispatch;
