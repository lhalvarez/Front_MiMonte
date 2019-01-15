// Environment
const isProduction = process.env.NODE_ENV === 'production'

export default function html(options) {
  const {
    app = 'main',
    title = 'Mi Monte',
    markup,
    initialState,
    vendor = 'vendor'
  } = options
  let path = '/app'
  let link = `<link type="text/css" href="${path}/main.css" />`

  if (isProduction) {
    path = '/app'
    link = `<link rel="stylesheet" href="${path}/main.css" />`
  }

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>${title}</title>
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width,initial-scale=1">
        ${link}
      </head>
      <body>
        <div id="root">${markup}</div>
        <script>
          window.initialState = ${JSON.stringify(initialState)};
        </script>
        <script src="/app/${vendor}.bundle.js"></script>
        <script src="/app/${app}.bundle.js"></script>
      </body>
    </html>
  `
}
