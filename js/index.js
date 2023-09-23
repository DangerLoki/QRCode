const AWS = require('aws-sdk');
const s3 = new AWS.S3();

window.compartilharQRCode = function () {
  if (!qrcode) {
    alert("Por favor, gere o QR Code primeiro.");
    return;
  }

  let img = canvasElement.toDataURL("image/png");
  let base64Data = img.replace(/^data:image\/\w+;base64,/, "");
  base64Data = Buffer.from(base64Data, 'base64');

  const params = {
    Bucket: 'NOME_DO_SEU_BUCKET',
    Key: 'qrcode.png', 
    Body: base64Data,
    ContentEncoding: 'base64',
    ContentType: 'image/png'
  }

  s3.upload(params, function(err, data) {
    if (err) {
      console.log(`Erro ao enviar para o S3: ${err}`);
    } else {
      console.log(`Arquivo enviado com sucesso para o S3: ${data.Location}`);
      // Aqui você pode adicionar o código para salvar os dados do QR Code no DynamoDB
    }
  });
};
