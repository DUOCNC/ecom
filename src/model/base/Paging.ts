import {Metadata} from './Metadata';

export interface Paging<T> {
  metadata: Metadata;
  items: Array<T>;
}
