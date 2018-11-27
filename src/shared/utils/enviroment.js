// Available environments
const environments = ['development', 'stage', 'qa', 'production']

export function isEnvironment(env: any): number {
  return environments.indexOf(env) !== -1
}

export function getEnvironment(env: any = false): string {
  const environment = env || process.env.NODE_ENV

  return isEnvironment(environment) ? environment : 'production'
}

export function isDevelopment(): string {
  return getEnvironment() === 'development'
}

export function isProduction(): string {
  return getEnvironment() === 'production'
}

export function isQA(): string {
  return getEnvironment() === 'qa'
}

export function isStage(): string {
  return getEnvironment() === 'stage'
}
