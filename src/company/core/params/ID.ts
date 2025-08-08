import { v4 } from 'uuid';
import { StringValue } from '@shared/core';

export class ID extends StringValue {
  static new(): ID {
    return new ID(v4());
  }
}
