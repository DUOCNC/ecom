import {
  ic_loyalty_diamond,
  ic_loyalty_gold,
  ic_loyalty_member,
  ic_loyalty_ruby,
  ic_loyalty_silver,
} from 'assets/images';

interface Loyalty {
  id: number;
  name: string;
  icon: any;
}

const LoyaltySource: Array<Loyalty> = [
  {
    id: 0,
    name: 'Member',
    icon: ic_loyalty_member,
  },
  {
    id: 1,
    name: 'VIP S',
    icon: ic_loyalty_silver,
  },
  {
    id: 2,
    name: 'VIP G',
    icon: ic_loyalty_gold,
  },
  {
    id: 3,
    name: 'VIP R',
    icon: ic_loyalty_ruby,
  },
  {
    id: 4,
    name: 'VIP D',
    icon: ic_loyalty_diamond,
  },
];

export {LoyaltySource};
