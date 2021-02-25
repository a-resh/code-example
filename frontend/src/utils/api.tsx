import { Draw, User } from '../types/interfaces';
import { LocalStorageKeys } from '../types/enums';

const apiUrl = process.env.REACT_APP_API_URL;
export const api = {
  getLastBtcPrice: (): Promise<number> => {
    return fetch(`${apiUrl}/lastPrice`)
      .then(res => res.json())
      .then(res => res.lastPriceBTC.price || 0)
      .catch(e => console.log(e));
  },
  auth: (publicAddress: string): Promise<string> => {
    return fetch(`${apiUrl}/auth?publicAddress=${publicAddress}`)
      .then(res => res.json())
      .then(res => res.nonce)
      .catch(e => console.log(e));
  },
  authGetToken: (publicAddress: string, signature: string): Promise<string> => {
    return fetch(`${apiUrl}/auth`, {
      method: 'POST',
      body: JSON.stringify({ publicAddress, signature }),
    })
      .then(res => res.json())
      .then(res => (!res.error ? res.token : res.error))
      .catch(e => console.log(e));
  },
  getUserData: (publicAddress): Promise<User> => {
    return fetch(`${apiUrl}/user/${publicAddress}`)
      .then(res => res.json())
      .catch(e => console.log(e));
  },
  getDrawsData: (): Promise<Draw[]> => {
    return fetch(`${apiUrl}/draws`)
      .then(res => res.json())
      .catch(e => console.log(e));
  },
  getAllPayouts: (): Promise<number> => {
    return fetch(`${apiUrl}/allPayouts`)
      .then(res => res.json())
      .then(res => res.payouts.summaryAmount)
      .catch(e => console.log(e));
  },
  getBtcPrices: (): Promise<any[]> => {
    return fetch(
      'http://ec2-13-58-248-197.us-east-2.compute.amazonaws.com/api/btcData',
    ).then(res => res.json());
  },
  setBtcAddress: (publicAddress: string, btcAddress: string) => {
    return fetch(`${apiUrl}/setBTCaddress`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          LocalStorageKeys.AUTH_TOKEN,
        )}`,
      },
      body: JSON.stringify({
        publicAddress,
        btcAddress,
      }),
    }).then(res => res.ok);
  },
};
