import {ImageSourcePropType} from 'react-native';

export default class CareLabelEntity {
  private id: string;
  private image: ImageSourcePropType;
  private name: string;

  constructor(id: string, image: ImageSourcePropType, name: string) {
    this.id = id;
    this.image = image;
    this.name = name;
  }

  getId() {
    return this.id;
  }

  getImage() {
    return this.image;
  }

  getName() {
    return this.name;
  }
}
