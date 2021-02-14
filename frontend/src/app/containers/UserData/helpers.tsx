import moment from 'moment';

export const convertDate = (date: Date) => {
  const now = moment();
  const stakeDate = moment(date);
  const days = stakeDate.diff(now, 'days');
  const hours = stakeDate.diff(now.add(days, 'days'), 'hours');
  const minutes = stakeDate.diff(now.add(hours, 'hours'), 'm');
  return `${days}d, ${hours}h, ${minutes}m`;
};
