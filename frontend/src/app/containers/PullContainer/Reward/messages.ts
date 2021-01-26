/**
 * This file is only need if you want to extract messages into JSON files in locales folder
 * AND if you are also using the object syntax instead of string syntax. \
 * Check the documentation section i18n for details
 */
import { translations } from 'locales/translations';
import { _t } from 'utils/messages';
import * as React from "react";

export const messages = {
   rewardDistribution: _t(translations.rewardDistribution,'Reward distribution'),
   stakingReturns: _t(translations.stakingReturns,'Staking returns'),
   totalDistributionToCommunity: _t(translations.totalDistributionToCommunity,'Total Distribution to Community'),
};
