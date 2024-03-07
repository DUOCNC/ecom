export default class ReportChartDetailEntity {
  private readonly tab: string;
  private readonly title: string;

  constructor(tab: string, display: string) {
    this.tab = tab;
    this.title = display;
  }

  getTab() {
    return this.tab;
  }
  getTitle() {
    return this.title;
  }
}
