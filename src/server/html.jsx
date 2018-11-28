export default function html(options: any): any {
  const {
    app = 'main',
    vendor = 'vendors',
    title = 'Mi monte',
    stylesheet = '/app/main.css',
    markup
  } = options

  return `
<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8" />
  <title>${title}</title>
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <link rel="stylesheet" href="${stylesheet}" />
</head>

<body>
  <div id="root">${markup}</div>
  <script src="/app/${vendor}.bundle.js"></script>
  <script src="/app/${app}.bundle.js"></script>
  <script type="text/javascript" src="https://openpay.s3.amazonaws.com/openpay.v1.min.js"></script>
</body>

</html>
`
}
