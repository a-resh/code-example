/**
 *
 * Asynchronously loads the component for PullContainer
 *
 */

import { lazyLoad } from 'utils/loadable';

export const PullContainer = lazyLoad(
  () => import('./index'),
  module => module.PullContainer,
);
