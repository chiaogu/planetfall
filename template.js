export default function ({ bundle }) {
  const { code } = bundle[Object.keys(bundle)[0]];
  console.log(code)
  return `
    <html lang="en">
      <head>
        <title>Planetfall</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1"/>
      </head>
      <body style="margin:0;background:#000">
        <canvas></canvas>
        <script>
          ${code}
        </script>
      </body>
    </html>
  `;
}