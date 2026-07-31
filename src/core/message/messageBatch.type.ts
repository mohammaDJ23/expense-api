import type { IMessageHeader } from './messageHeader.type';
import type { IMessagePayload } from './messagePayload.type';

export interface IMessageBatch<T = object> extends IMessageHeader, IMessagePayload<T> {}
