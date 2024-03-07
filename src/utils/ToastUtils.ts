import {colors} from 'assets/v2';
import {Position, showMessage} from 'react-native-flash-message';

const showError = (msg: string, position?: Position) => {
  showMessage({
    icon: 'warning',
    message: msg,
    type: 'danger',
    position: position,
  });
};

const showSuccess = (msg: string, position?: Position) => {
  showMessage({
    icon: 'success',
    message: msg,
    type: 'success',
    position: position,
  });
};

const showWarning = (msg: string, position?: Position) => {
  showMessage({
    icon: 'warning',
    message: msg,
    type: 'warning',
    position: position,
  });
};

const showInfo = (msg: string, position?: Position) => {
  showMessage({
    icon: 'info',
    message: msg,
    type: 'info',
    position: position,
    backgroundColor: colors.primary.o500,
  });
};

export {showError, showSuccess, showWarning, showInfo};
