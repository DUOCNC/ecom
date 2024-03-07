import {Theme, ThemeProperty} from './Theme';
import colors from '../colors';

const Dark: ThemeProperty = {
  primary: colors.primary.o500,
  background: colors.base.black,
  border: colors.secondary.o25,
  card: colors.base.black,
  text: colors.secondary.o25,
  notification: colors.base.black,
};

const Light: ThemeProperty = {
  primary: colors.primary.o500,
  background: colors.base.white,
  border: colors.secondary.o200,
  card: colors.base.white,
  text: colors.primary.o900,
  notification: colors.base.white,
};

const theme: Theme = {
  dark: Dark,
  light: Light,
};

export default theme;
