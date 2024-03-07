import {RNKeycloak} from '@react-keycloak/native';
import {AppConfig} from './AppConfig';

// Setup Keycloak instance as needed
// Pass initialization options as required
const keycloak = new RNKeycloak({
  url: AppConfig.keyCloakUrl,
  realm: AppConfig.realm,
  clientId: AppConfig.clientId,
});

export default keycloak;
