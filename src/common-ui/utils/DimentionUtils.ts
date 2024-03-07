import {Dimensions, PixelRatio, Platform} from 'react-native';

export class DimentionUtils {
  private static Width = Dimensions.get('screen').width;

  private static DefaultWidth = 375;

  private constructor() {}

  private static ratio() {
    return this.Width / this.DefaultWidth;
  }

  private static getFont(size: number) {
    return Math.round(PixelRatio.roundToNearestPixel(size));
  }

  private static newSize(size: number) {
    return size * this.ratio();
  }

  static scaleFont(size: number) {
    let newSize = this.newSize(size);
    return Platform.OS === 'ios'
      ? this.getFont(newSize)
      : this.getFont(newSize);
  }

  static scale(size: number) {
    let newSize = this.newSize(size);
    return this.getFont(newSize);
  }
}
