import {
  AccountProvider,
  Location,
  LocationSelectedProvider,
} from 'model/providers';
import React from 'react';

export interface AuthType {
  signIn: (token: string, refreshToken: string) => void;
  signOut: () => void;
  loadProfile: () => void;
  profile: AccountProvider | null;
  locationSelected: LocationSelectedProvider;
  setLocationSelected: (location: LocationSelectedProvider) => void;
  isAuthenticated: () => boolean;
  isInitialed: boolean;
  isReady: boolean;
  locations: Array<Location>;
  locationSupported: Array<Location>;
  allLocations: Array<Location>;
}

const AuthContext = React.createContext<AuthType>({
  signIn: () => {},
  signOut: () => {},
  loadProfile: () => {},
  profile: null,
  locationSelected: LocationSelectedProvider.createdUnSelect(),
  setLocationSelected: () => {},
  isAuthenticated: () => false,
  isInitialed: false,
  isReady: false,
  locations: [],
  locationSupported: [],
  allLocations: [],
});

const useAuth = () => React.useContext(AuthContext);

export {useAuth, AuthContext};
