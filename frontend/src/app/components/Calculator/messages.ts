/**
 * This file is only need if you want to extract messages into JSON files in locales folder
 * AND if you are also using the object syntax instead of string syntax. \
 * Check the documentation section i18n for details
 */
import { translations } from 'locales/translations';
import { _t } from 'utils/messages';

export const messages = {
   ifYouStake: _t(translations.ifYouStake,'If you stake'),
   place: _t(translations.place,'place'),
   andComeIn: _t(translations.andComeIn,'and come in'),
   collaborativeRewards: _t(translations.collaborativeRewards,'Collaborative rewards?'),
   enhancedRewards: _t(translations.enhancedRewards,'Enhanced rewards'),
   youStandToWin: _t(translations.youStandToWin,'you stand to win'),
   totalReward: _t(translations.totalReward,'Total reward'),
};
