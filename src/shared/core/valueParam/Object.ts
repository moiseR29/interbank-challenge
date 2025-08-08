import { Value } from './Value';
import { IDontKnowObject } from '../Types';

export class ObjectValue<T extends IDontKnowObject> extends Value<T> {}
