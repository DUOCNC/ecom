import {FeedbackStatus} from 'modules/feedback/enums/FeedbackStatus';
import {colors} from 'assets/v2';

interface ColorTag {
  textColor: string;
  backGroundColor: string;
  borderColor: string;
}

export default class TagFeedbackEntity {
  private status: string;
  constructor(status: string) {
    this.status = status;
  }
  getColorTag(): ColorTag {
    switch (this.status) {
      case FeedbackStatus.NOT_BUY:
        return {
          textColor: colors.error.o500,
          backGroundColor: colors.error.o50,
          borderColor: colors.error.o300,
        };
      case FeedbackStatus.PENDING:
        return {
          textColor: colors.warning.o500,
          borderColor: colors.warning.o200,
          backGroundColor: colors.warning.o50,
        };
      case FeedbackStatus.IN_PROGRESS:
        return {
          textColor: colors.blue.o500,
          borderColor: colors.blue.o200,
          backGroundColor: colors.blue.o50,
        };
      case FeedbackStatus.BOUGHT:
        return {
          textColor: colors.success.o500,
          borderColor: colors.success.o200,
          backGroundColor: colors.success.o50,
        };
      case FeedbackStatus.EMPTY_ADVISOR:
        return {
          textColor: colors.secondary.o500,
          borderColor: colors.secondary.o300,
          backGroundColor: colors.secondary.o50,
        };
      default:
        return {
          textColor: colors.secondary.o500,
          borderColor: colors.secondary.o300,
          backGroundColor: colors.secondary.o50,
        };
    }
  }

  getTextTag() {
    switch (this.status) {
      case FeedbackStatus.NOT_BUY:
        return 'Không mua';
      case FeedbackStatus.PENDING:
        return 'Đợi tiếp nhận';
      case FeedbackStatus.IN_PROGRESS:
        return 'Đang tiếp';
      case FeedbackStatus.BOUGHT:
        return 'Mua hàng';
      case FeedbackStatus.EMPTY_ADVISOR:
        return 'Chưa có CGTV';
      default:
        return 'Chưa có CGTV';
    }
  }
}
