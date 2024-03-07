import {NumberUtils} from 'common';
import {ReportTabButton} from 'modules/analytic/enums';

export default class ReportRankEntity {
  private name: string;
  private value: number;

  constructor(name: string, value: number) {
    this.name = name;
    this.value = value;
  }

  setReportRank(name: string, value: number) {
    this.name = name;
    this.value = value;
  }
  setName(name: string) {
    this.name = name;
  }

  setValue(value: number) {
    this.value = value;
  }

  getValueName() {
    return this.value.toString();
  }
  getValue() {
    return this.value;
  }
  getName() {
    return this.name;
  }

  getValueByActiveTab(activeTab: string) {
    if (activeTab === ReportTabButton.customer) {
      return NumberUtils.formatNumber(this.value);
    }
    if (activeTab === ReportTabButton.crv) {
      return `${this.value ?? 0}%`;
    }
    return NumberUtils.formatCurrency(this.value);
  }

  getAmountRankSymbol(activeTab: string) {
    if (activeTab === ReportTabButton.customer) {
      return NumberUtils.formatNumber(this.value);
    }
    if (activeTab === ReportTabButton.crv) {
      return `${this.value ?? 0}%`;
    }
    return NumberUtils.getAmountSymbol(this.value).toString();
  }
}
