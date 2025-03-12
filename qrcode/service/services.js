const Qrcode = require('qrcode');

async function formatData(data){
     // console.log(data);
     
   const qrcodeData = `name:${data.name}, eamil:${data.email}`;
   return qrcodeData;
}

async function generareQrCode(qrcodeData) {
     const options = {
          errorCorectionLevel:'M',
          type:'image/png',
          margin:1
     };

     const qrcodebuffer = await Qrcode.toBuffer(qrcodeData, options);

     return qrcodebuffer;
}

module.exports = { formatData, generareQrCode };