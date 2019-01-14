const html: Array<mixed> = ({
  app,
  initialState,
  markup,
  stylesheet,
  title,
  vendor
}) => `
<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8" />
  <script>window.initialState = ${JSON.stringify(initialState)}</script>
  <title>${title}</title>
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <link type="text/css" rel="stylesheet" href="${stylesheet}" />
</head>

<body>
  <div id="root">${markup}</div>
  <script src="/app/${vendor}.bundle.js"></script>
  <script src="/app/${app}.bundle.js"></script>
  <script type="text/javascript"  src="https://openpay.s3.amazonaws.com/openpay.v1.min.js"></script>
  <script type='text/javascript' Access-Control-Allow-Origin: * src="https://openpay.s3.amazonaws.com/openpay-data.v1.min.js"></script>
</body>

</html>
`
export default html
