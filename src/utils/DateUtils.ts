import moment from 'moment';

export const FormatDatePattern = {
  'DD/MM/YYYY': 'DD/MM/YYYY',
  'YYYY/MM/DD': 'YYYY/MM/DD',
  'DD/MM/YYYY - HH:mm': 'DD/MM/YYYY - HH:mm',
  'HH:mm - DD/MM/YYYY': 'HH:mm - DD/MM/YYYY',
  'YYYY-MM-DD': 'YYYY-MM-DD',
  'HH:mm': 'HH:mm',
  'HH:mm:ss': 'HH:mm:ss',
  'MM/YY': 'MM/YY',
  'DD/MM': 'DD/MM',
  'MM/YYYY': 'MM/YYYY',
};

const DateUtils = {
  format: (a: string | null, format: string, defaultTextIfNull?: string) => {
    if (a === null || a === '') {
      return defaultTextIfNull ? defaultTextIfNull : '';
    }
    let date = new Date(a);
    return moment(date).format(format);
  },
};

export const getStartDateEndDatByDate = (date: Date) => {
  return [
    moment(date).startOf('isoWeek').format(FormatDatePattern['YYYY-MM-DD']),
    moment(date).endOf('isoWeek').format(FormatDatePattern['YYYY-MM-DD']),
  ];
};

export const getLastStartDateEndDateByDate = (date: Date) => {
  return {
    fromDate: moment(date)
      .subtract(1, 'weeks')
      .startOf('isoWeek')
      .format(FormatDatePattern['YYYY-MM-DD']),
    toDate: moment(date)
      .subtract(1, 'weeks')
      .endOf('isoWeek')
      .format(FormatDatePattern['YYYY-MM-DD']),
  };
};

export const getStartEndDateByMonth = (date: Date) => {
  return [
    moment(date).startOf('month').format('YYYY-MM-DD'),
    moment(date).endOf('month').format('YYYY-MM-DD'),
  ];
};

export const getBeforeStartEndDateByMonth = (date: Date) => {
  return [
    moment(date).subtract(1, 'month').startOf('month').format('YYYY-MM-DD'),
    moment(date).subtract(1, 'month').endOf('month').format('YYYY-MM-DD'),
  ];
};

export const getDaysInYearByDate = (date: Date) => {
  const curr = date.getFullYear();
  return [`${curr}-01-01`, `${curr}-12-31`];
};

export const diffWeeksDate = (dateObj: Date, numberOfWeeks: number) => {
  dateObj.setDate(dateObj.getDate() - numberOfWeeks * 7);
  return dateObj;
};

export const countDown = () => {
  let countDownDate = new Date('Jan 5, 2024 15:37:25').getTime();

  // Update the count down every 1 second
  let x = setInterval(function () {
    // Get today's date and time
    let now = new Date().getTime();

    // Find the distance between now and the count down date
    let distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    let hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Output the result in an element with id="demo"
    if (distance >= 0) {
      return `${hours} + "h "
      + ${minutes} + "m " + ${seconds} + "s "`;
    } else {
      clearInterval(x);
      return 'Hết hạn';
    }
  }, 1000);
};

export default DateUtils;
