import {introduce_one, introduce_three, introduce_two} from 'assets/images';

export interface DataIntro {
  id: number;
  image: any;
  text: string;
  subText: string;
}

const dataIntro: Array<DataIntro> = [
  {
    id: 1,
    image: introduce_one,
    text: 'title 1',
    subText: 'text 1',
  },
  {
    id: 2,
    image: introduce_two,
    text: 'title 2',
    subText: 'text 2',
  },
  {
    id: 3,
    image: introduce_three,
    text: 'title 3',
    subText: 'text 3',
  },
];

export {dataIntro};
