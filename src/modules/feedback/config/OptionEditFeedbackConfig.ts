import {FeedbackStatus} from 'modules/feedback/enums';

export const OptionEditFeedbackConfig = [
  {
    id: 0,
    name: 'Mua hàng',
    status: FeedbackStatus.BOUGHT,
  },
  {
    id: 1,
    name: 'Không mua',
    status: FeedbackStatus.NOT_BUY,
  },
  {
    id: 2,
    name: 'Đang tiếp',
    status: FeedbackStatus.IN_PROGRESS,
  },
  {
    id: 3,
    name: 'Đợi tiếp nhận',
    status: FeedbackStatus.PENDING,
  },
  {
    id: 3,
    name: 'Chưa có CGTV',
    status: FeedbackStatus.EMPTY_ADVISOR,
  },
];
