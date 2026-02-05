import { AuthProvider as Provider } from '@/components/AltaAuth';
import { ProviderChildren } from './ProviderChildren';

const config = {
  // client_id: process.env.ALTA_CLIENT_ID,
  client_id: 'client_30dd429d-6d00-4d83-98c1-c159f5ec2b92',
  scope: 'openid',
  redirect_uri: 'att-voodoo://auth-callback'
};

export const AuthProvider = ({ children }: ProviderChildren) => <Provider config={config}>{children}</Provider>;
