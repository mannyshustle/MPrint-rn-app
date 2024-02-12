import {ParseFunctions} from 'lib_cloud/parse/class/parseFunctions';
import CookieManager from '@react-native-cookies/cookies';

import axios from 'axios';

// Passing configuration object to axios
export const printifyAPI = axios.create({
  baseURL: 'https://api.printify.com/v1', // Change to api-fxtrade for live trading
  headers: {
    'Content-Type': 'application/json',
  },
});
const getPrintifyAccessToken = async () => {
  const response =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzN2Q0YmQzMDM1ZmUxMWU5YTgwM2FiN2VlYjNjY2M5NyIsImp0aSI6IjIyNGZiMTAyOWZiZTMwZDljNzBhYmU3MGRiOGI0YTQwMTQ4OGJhNjNhNGQ2YzU0YjgwYzgwOGE5MzIxY2E2ZDdhMzVkMWY0YmY0ZTZlMTk3IiwiaWF0IjoxNzA3MzA3MjY0LjUxNTYyNCwibmJmIjoxNzA3MzA3MjY0LjUxNTYyNiwiZXhwIjoxNzM4OTI5NjY0LjUwNDczMywic3ViIjoiMTcwMDUyMDMiLCJzY29wZXMiOlsic2hvcHMubWFuYWdlIiwic2hvcHMucmVhZCIsImNhdGFsb2cucmVhZCIsIm9yZGVycy5yZWFkIiwib3JkZXJzLndyaXRlIiwicHJvZHVjdHMucmVhZCIsInByb2R1Y3RzLndyaXRlIiwid2ViaG9va3MucmVhZCIsIndlYmhvb2tzLndyaXRlIiwidXBsb2Fkcy5yZWFkIiwidXBsb2Fkcy53cml0ZSIsInByaW50X3Byb3ZpZGVycy5yZWFkIl19.ATgZwq7WxmLBJFuGy0IO0rO7GkUndJsQHC45aW4_20O68o4rQUmUnR5B5WHI_vAaJHdBgLWq_P20OqeoyHU'; //   ParseFunctions.performAction(
  //     await Parse.Cloud.run('getPrintifyAccessToken'),
  //   );

  return response;
};

export const getPrintifyCookie = async () => {
  const accessToken = await getPrintifyAccessToken();
  printifyAPI.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  await printifyAPI.get('/shops.json');
};
