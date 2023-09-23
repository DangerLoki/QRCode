let qrcode;
let canvasElement;

window.gerarQRCode = function() {
    if (!qrcode) {
        let divElement = document.getElementById("qrcode");
        qrcode = new QRCode(divElement, {
            text: "https://www.youtube.com/",
            width: 128,
            height: 128
        });
        canvasElement = document.querySelector('#qrcode canvas');
    } else {
        qrcode.makeCode("https://www.youtube.com/");
    }
}

window.compartilharQRCode = function() {
    if (!qrcode) {
        alert('Por favor, gere o QR Code primeiro.');
        return;
    }

    let img = canvasElement.toDataURL("image/png");
    let link = document.createElement('a');
    link.download = 'qrcode.png';
    link.href = img;
    link.click();
}

window.abrirCamera = function() {
  let video = document.getElementById('preview');
  let statusElement = document.getElementById('status');

  if (!qrcode) {
      alert('Por favor, gere o QR Code primeiro.');
      return;
  }

  if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
          .then(function (stream) {
              video.srcObject = stream;
              video.setAttribute("playsinline", true);
              video.play();
              setInterval(function(){
                  let canvas = document.createElement('canvas');
                  canvas.width = video.videoWidth;
                  canvas.height = video.videoHeight;
                  let ctx = canvas.getContext('2d');
                  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                  let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                  let code = jsQR(imageData.data, imageData.width, imageData.height);
                  if (code) {
                      // Aqui você pode adicionar uma verificação para determinar se o código é válido
                      if (code.data === 'dados esperados') {
                          statusElement.textContent = 'APROVADO';
                      } else {
                          statusElement.textContent = 'Inválido';
                      }
                  } else {
                      statusElement.textContent = 'Não lido';
                  }
              }, 500);
          })
          .catch(function (error) {
              console.log("Something went wrong!");
              statusElement.textContent = 'Erro';
          });
  }
}

