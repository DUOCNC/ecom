import {ReactNativeKeycloakProvider} from '@react-keycloak/native';
import {Authentication, AuthenticationUtils} from 'common/authentication';
import {AppConfig} from 'config/AppConfig';
import keycloak from 'config/KeycloakConfig';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {AuthContext, AuthType} from 'providers/contexts/AuthContext';
import {showError} from 'utils/ToastUtils';
import {
  AccountProvider,
  LocationSelectedProvider,
  LocationProvider,
} from 'model/providers';
import authServiceV1 from 'services/AuthServiceV1';

const AuthProvider: React.FC = ({children}) => {
  const versionApp = AppConfig.appVersion;

  const [authentication, setAuthentication] = useState<Authentication | null>(
    null,
  );

  const [initialed, setInitialed] = useState<boolean>(false);

  /**
   * Thông tin cá nhân
   */
  const [profile, setProfile] = useState<AccountProvider | null>(null);

  /**
   * Danh sách cửa hàng
   */
  const [locationProvider, setLocationProvider] = useState<LocationProvider>(
    LocationProvider.unauthorized(),
  );

  /**
   * LocationSelected
   */
  const [locationSelected, setLocationSelected] =
    useState<LocationSelectedProvider>(
      LocationSelectedProvider.createdUnSelect(),
    );

  const [isReady, setReady] = useState<boolean>(false);

  const [authenticated, setAuthenticated] = useState<boolean>(false);

  const signOut = useCallback(() => {
    AuthenticationUtils.remove().then(() => {
      setLocationProvider(LocationProvider.unauthorized());
      setProfile(null);
      setAuthenticated(false);
      setAuthentication(null);
    });
  }, []);

  const loadProfile = useCallback(
    (onLoadProfile?: () => void, onError?: () => void) => {
      authServiceV1.getProfile(
        acc => {
          setProfile(acc);
          setAuthenticated(true);
          onLoadProfile && onLoadProfile();
        },
        () => {
          onError && onError();
        },
      );
    },
    [],
  );

  /**
   * Lấy thông tin cá nhân
   */
  const loadStore = useCallback(() => {
    authServiceV1.getStores(
      locations =>
        setLocationProvider(LocationProvider.createWithLocation(locations)),
      msg => {
        showError(msg);
      },
    );
  }, []);

  const verifyToken = useCallback(() => {
    loadProfile(
      () => setInitialed(true),
      () => setInitialed(true),
    );
  }, [loadProfile]);

  const saveToken = useCallback(
    (
      token: string,
      refreshToken: string,
      idToken?: string,
      then?: () => void,
    ) => {
      let auth: Authentication = {
        token: token,
        refreshToken: refreshToken,
        idToken: idToken,
      };
      AuthenticationUtils.save(auth).then(then);
    },
    [],
  );

  const setLocationAndSaveStorage = useCallback(
    (location: LocationSelectedProvider, isSaveStorage: boolean) => {
      if (!profile) {
        return;
      }
      setLocationSelected(location);
      if (isSaveStorage) {
        authServiceV1.setSelectedInfo(profile.code, location);
      }
    },
    [profile],
  );

  const allLocationIds = useMemo(() => {
    return locationProvider.locations.map(l => l.id);
  }, [locationProvider.locations]);

  const grantedLocationIds = useMemo(() => {
    let grantedIds = allLocationIds;
    if (profile && profile.locationIds.length > 0) {
      grantedIds = profile.locationIds;
    }
    return grantedIds.concat(-1);
  }, [allLocationIds, profile]);

  const loadSelectedInfo = useCallback(() => {
    if (profile && locationProvider.isLoadStore) {
      authServiceV1.getSelectedInfo(profile.code, location => {
        if (!location.selected) {
          setLocationAndSaveStorage(location, false);
          setReady(true);
          return;
        }
        if (location.supported) {
          if (grantedLocationIds.includes(location.locationId)) {
            location.supported = false;
            setLocationAndSaveStorage(location, true);
            setReady(true);
            return;
          }
          if (!allLocationIds.includes(location.locationId)) {
            setLocationAndSaveStorage(
              LocationSelectedProvider.createdUnSelect(),
              true,
            );
            setReady(true);
            return;
          }
          setLocationAndSaveStorage(location, false);
          setReady(true);
          return;
        }
        if (!grantedLocationIds.includes(location.locationId)) {
          setLocationAndSaveStorage(
            LocationSelectedProvider.createdUnSelect(),
            true,
          );
          setReady(true);
          return;
        }
        setLocationAndSaveStorage(location, false);
        setReady(true);
      });
    }
  }, [
    allLocationIds,
    grantedLocationIds,
    locationProvider.isLoadStore,
    profile,
    setLocationAndSaveStorage,
  ]);

  const signIn = useCallback(
    (token: string, refreshToken: string) => {
      saveToken(token, refreshToken, undefined, () => {
        loadProfile();
      });
    },
    [loadProfile, saveToken],
  );

  /**
   * Get token from storage
   */
  const loadToken = useCallback((afterLoad?: () => void) => {
    AuthenticationUtils.get()
      .then(value => {
        setAuthentication(value);
      })
      .then(afterLoad);
  }, []);

  const isAuthenticated = useCallback(() => {
    return authenticated;
  }, [authenticated]);

  const onSetLocationSelected = useCallback(
    (newLocationSelectedProvider: LocationSelectedProvider) => {
      const location = locationProvider.locations.find(
        s => s.id === newLocationSelectedProvider.locationId,
      );
      if (!location && newLocationSelectedProvider.locationId !== -1) {
        showError('Không tìm thấy cửa hàng');
        return;
      }
      setLocationAndSaveStorage(newLocationSelectedProvider, true);
    },
    [locationProvider.locations, setLocationAndSaveStorage],
  );

  const getLocations = useMemo(() => {
    return locationProvider.locations.filter(value =>
      grantedLocationIds.includes(value.id),
    );
  }, [grantedLocationIds, locationProvider.locations]);

  const getLocationSupported = useMemo(() => {
    return locationProvider.locations.filter(
      value => !grantedLocationIds.includes(value.id),
    );
  }, [grantedLocationIds, locationProvider.locations]);

  const authContext = useMemo(
    () =>
      ({
        signIn: signIn,
        signOut: signOut,
        loadProfile: loadProfile,
        profile: profile,
        isAuthenticated: isAuthenticated,
        locationSelected: locationSelected,
        setLocationSelected: onSetLocationSelected,
        isInitialed: initialed,
        isReady: isReady,
        locations: getLocations,
        locationSupported: getLocationSupported,
        allLocations: locationProvider.locations,
      } as AuthType),
    [
      signIn,
      signOut,
      loadProfile,
      profile,
      isAuthenticated,
      locationSelected,
      onSetLocationSelected,
      initialed,
      isReady,
      getLocations,
      getLocationSupported,
      locationProvider.locations,
    ],
  );

  /**
   * Get token in first
   */
  useEffect(() => {
    loadToken(() => {
      if (versionApp !== 'v1') {
        setInitialed(true);
        return;
      }
      verifyToken();
    });
  }, [loadToken, verifyToken, versionApp]);

  useEffect(() => {
    if (profile != null) {
      loadStore();
    }
  }, [loadStore, profile]);

  useEffect(() => {
    if (locationProvider.isLoadStore) {
      loadSelectedInfo();
    }
  }, [loadSelectedInfo, locationProvider.isLoadStore]);
  return (
    <AuthContext.Provider value={authContext}>
      {versionApp === 'v1' ? (
        children
      ) : (
        <ReactNativeKeycloakProvider
          authClient={keycloak}
          initOptions={{
            onLoad: 'check-sso',
            redirectUri: AppConfig.redirectUrl,
            inAppBrowserOptions: {},
            clientSecret: AppConfig.clientSecret,
            token: authentication?.token,
            refreshToken: authentication?.refreshToken,
          }}
          autoRefreshToken
          onEvent={(event, error) => {
            switch (event) {
              case 'onAuthError':
                showError(
                  error?.error_description ?? 'Có lỗi vui lòng thử lại sau',
                );
                break;
              case 'onAuthSuccess':
                setAuthenticated(true);
                break;
              case 'onAuthLogout':
                break;
            }
          }}
          onTokens={tokens => {
            if (tokens.idToken && tokens.refreshToken && tokens.token) {
              saveToken(
                tokens.token,
                tokens.refreshToken,
                tokens.idToken,
                () => {
                  loadProfile();
                },
              );
              return;
            }
            AuthenticationUtils.remove();
            signOut();
          }}>
          {children}
        </ReactNativeKeycloakProvider>
      )}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
