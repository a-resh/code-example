/**
 *
 * Asynchronously loads the component for PullContainer
 *
 */

import { lazyLoad } from 'utils/loadable';
import {CircularProgress} from "@material-ui/core";
import React from "react";

export const PullContainer = lazyLoad(
  () => import('./index'),
    module => module.PullContainer, {fallback: <CircularProgress size={100}/>}

);

