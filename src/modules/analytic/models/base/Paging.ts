import {Metadata} from './Metadata';

export interface Paging<T> {
  meta: Metadata;
  data: Array<T>;
}
