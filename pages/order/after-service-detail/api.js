import { resp } from '../after-service-list/api';
import dayjs from 'dayjs';

export const formatTime = (date, template) => dayjs(date).format(template);

export function getRightsDetail({ rightsNo }) {
  const _resq = {
    data: {}
  };
  _resq.data =
    resp.data.dataList.filter((item) => item.rights.rightsNo === rightsNo) ||
    {};
  return Promise.resolve(_resq);
}

export function cancelRights() {
  const _resq = {
    data: {}
  };
  return Promise.resolve(_resq);
}
