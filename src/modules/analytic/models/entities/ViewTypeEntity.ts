import {ReportViewType} from 'modules/analytic/enums';

export default class ViewTypeEntity {
  private readonly value: string;
  private readonly display: string;
  private readonly subDisplay: string;
  private readonly key: string;

  constructor(value: string, display: string, subDisplay: string, key: string) {
    this.value = value;
    this.display = display;
    this.subDisplay = subDisplay;
    this.key = key;
  }

  getValue() {
    return this.value;
  }
  getDisplay() {
    return this.display;
  }
  getSubDisplay() {
    return this.subDisplay;
  }
  getSubDisplayUpper() {
    return this.subDisplay.charAt(0).toUpperCase() + this.subDisplay.slice(1);
  }
  getKey() {
    return this.key;
  }
}
