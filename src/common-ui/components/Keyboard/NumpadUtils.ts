export default class NumpadUtils {
  private static number = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
  private static ignoreValue = ['0', '000', 'del'];
  private static MAX = 12;
  private static pressWhenStateZero(value: string) {
    if (this.ignoreValue.includes(value)) {
      return 0;
    }
    if (!this.number.includes(value)) {
      return 0;
    }
    return parseInt(value, 10);
  }

  private static pressState(currentState: string, value: string, max?: number) {
    if (this.ignoreValue.includes(value)) {
      return this.pressIgnoreValue(currentState, value, max);
    }
    return this.pressNumberState(currentState, value, max);
  }

  private static pressNumberState(
    currentState: string,
    value: string,
    max?: number,
  ) {
    if (!this.number.includes(value)) {
      return parseInt(value, 10);
    }
    return this.concatValue(currentState, value, max);
  }

  private static concatValue(
    currentState: string,
    value: string,
    max?: number,
  ) {
    let maxValue = max ? max : this.MAX;
    let newState = currentState + value;
    if (newState.length > maxValue) {
      newState = newState.substring(0, maxValue);
    }
    return parseInt(newState, 10);
  }

  private static pressIgnoreValue(
    currentState: string,
    value: string,
    max?: number,
  ) {
    if (!this.ignoreValue.includes(value)) {
      return parseInt(value, 10);
    }
    if (value === '0' || value === '000') {
      return this.concatValue(currentState, value, max);
    }
    let newState = currentState.slice(0, -1);
    if (newState === '') {
      return 0;
    }
    return parseInt(newState, 10);
  }

  static press(state: number, value: string, max?: number) {
    if (state === 0) {
      return this.pressWhenStateZero(value);
    }
    let currentState = state.toString();
    return this.pressState(currentState, value, max);
  }
}
