//export const QuestionsConfig = [13, 14, 15, 16];

import {FeedbackQuestion} from '../enums';
import {QuestionConfigEntity} from '../models/entities';

export const QuestionsConfig = [
  new QuestionConfigEntity(FeedbackQuestion.ADULT, 'Người lớn'),
  new QuestionConfigEntity(FeedbackQuestion.CHILDREN, 'Trẻ em'),
  new QuestionConfigEntity(
    FeedbackQuestion.REASON,
    'Lý do khách hàng không mua hàng?',
  ),
  new QuestionConfigEntity(FeedbackQuestion.REASON_DETAIL, 'Lý do cụ thể'),
];
