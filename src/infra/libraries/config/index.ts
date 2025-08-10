import config from 'config';

export interface ConfigServer {
  port: number;
  key: string;
}

// TODOS: validations config
class ConfigManager {
  env(): string {
    return config.get('env');
  }

  server(): ConfigServer {
    return config.get('server');
  }
}

const i: ConfigManager = new ConfigManager();
export { i as ConfigManager };
