import { getConfigForClient } from '../config'

export const getTemplateData = req => {
  const data = {}
  data.init_config = getConfigForClient()
  data.title = 'React APP'
  data.originalUrl = req.originalUrl
  return data
}

export default function generateTemplate(context) {
  return new Promise((resolve, reject) => {
    const data = getTemplateData(context.req)
    context.res.render('index', data, (err, html) => {
      if (err) reject(err)

      const [before_css, after_css] = html.split('__inject_critical_css__')
      const [before_app, after_app] = after_css.split('__inject_html__')

      context.templateHTML = html
      context.templateBeforeCSS = before_css
      context.templateBeforeApp = before_app
      context.templateAfterApp = after_app
      resolve(context)
    })
  })
}
