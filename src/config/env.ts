enum NodeEnv {
  TEST        = 'test',
  DEVELOPMENT = 'development',
  PRODUCTION  = 'production'
}

export function getEnv(): NodeEnv {
  return <NodeEnv>process.env.NODE_ENV || NodeEnv.DEVELOPMENT
}

export function isTest() {
  return getEnv() === NodeEnv.TEST
}

export function isProd() {
  return getEnv() === NodeEnv.PRODUCTION
}
