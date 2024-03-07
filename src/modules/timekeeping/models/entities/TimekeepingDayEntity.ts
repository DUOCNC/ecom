export default class TimekeepingDayEntity {
  label: string;
  date: string;

  constructor(label: string, date: string) {
    this.label = label;
    this.date = date;
  }

  getLabel() {
    return this.label;
  }

  getDate() {
    return this.date;
  }

  setDate(date: string) {
    this.date = date;
  }
}
