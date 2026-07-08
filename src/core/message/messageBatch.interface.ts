import type { IMessageHeader } from './messageHeader.interface';
import type { IMessagePayload } from './messagePayload.interface';

export interface IMessageBatch<T = object> extends IMessageHeader, IMessagePayload<T> {}
