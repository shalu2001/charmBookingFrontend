import createStore from 'react-auth-kit/createStore';
import { Customer } from './types/customer';

const store = createStore<Customer>({
    authName:'_auth',
    authType:'cookie',
    cookieDomain: window.location.hostname,
    cookieSecure: window.location.protocol === 'https:',
  });

export default store;