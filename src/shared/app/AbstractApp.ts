import { IDontKnow, Logger, IDontKnowObject } from '@shared/core';

export interface AppDependencies {
  logger: Logger;
}

export interface AppPayload extends IDontKnowObject {}
export interface AppResponse extends IDontKnowObject {}

export abstract class App {
  private _logger: Logger;

  constructor(dep: AppDependencies) {
    this._logger = dep.logger;
  }

  abstract execute(payload?: AppPayload): Promise<AppResponse>;

  protected get logger(): Logger {
    return this._logger;
  }
}
