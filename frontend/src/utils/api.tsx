const apiUrl = 'http://localhost:5000';
export const api = {
  getLastBtcPrice: () => {
    return fetch(`${apiUrl}/lastPriceBTC`)
      .then(res => res.json())
      .then(res => res.price || 0)
      .catch(e => console.log(e));
  },
  auth: (publicAddress: string) => {
    return fetch(`${apiUrl}/auth?publicAddress=${publicAddress}`)
      .then(res => res.json())
      .then(res => res.nonce)
      .catch(e => console.log(e));
  },
  authGetToken: (publicAddress: string, signature: string) => {
    const nonce = '0xA0e57194EE7694883b20Ecb0C5aD9A52151D88ac1614056421361';
    return fetch(`${apiUrl}/auth`, {
      method: 'POST',
      body: JSON.stringify({ publicAddress, signature, nonce }),
    })
      .then(res => res.json())
      .then(res => (!res.error ? res.token : res.error))
      .catch(e => console.log(e));
  },
  getUserData: publicAddress => {
    return fetch(`${apiUrl}/user/${publicAddress}`)
      .then(res => res.json())
      .catch(e => console.log(e));
  },
  getDrawsData: () => {
    return fetch(`${apiUrl}/draws`)
      .then(res => res.json())
      .catch(e => console.log(e));
  },
  getAllPayouts: () => {
    return fetch(`${apiUrl}/allPayouts`)
      .then(res => res.json())
      .then(res => res.payouts.summaryAmount)
      .catch(e => console.log(e));
  },
  getBtcPrices: () => {
    return fetch(
      'http://ec2-13-58-248-197.us-east-2.compute.amazonaws.com/api/btcData',
    ).then(res => res.json());
  },
};
