/**
*
* Asynchronously loads the component for UserData
*
*/

import { lazyLoad } from 'utils/loadable';

export const UserData = lazyLoad(() => import('./index'), module => module.UserData);