import {Gender} from '../enums';
import {GenderEntity} from '../models';

const GenderConfig: Array<GenderEntity> = [
  new GenderEntity(Gender.Male, 'Nam'),
  new GenderEntity(Gender.Female, 'Nữ'),
  new GenderEntity(Gender.Other, 'Khác'),
];

export default GenderConfig;
