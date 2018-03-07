var Config = {}
export const getConfig = (key = null) => {
  Config = __SERVER__ ? global.INIT_CONFIG : window.INIT_CONFIG
  return key ? Config[key] : Config
}

export const get = key => {
  return getConfig(key)
}
