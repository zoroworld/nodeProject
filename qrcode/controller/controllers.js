const service = require('../service/services');

async function generateQrBar(req, res){
   try {
     const data = req.body;
     const qrcodeText = await service.formatData(data);
     const qrcodebuffer = await service.generareQrCode(qrcodeText);

     res.setHeader('Content-Disposition', 'attachment; filename="qrcodeText.png"');
     res.type('image/png').send(qrcodebuffer);

   } catch (error) {
      console.error('Error generating QR code:', err);
	 res.status(500).send({ error: 'Internal Server Error' });
   }
}

module.exports = {generateQrBar};