const express = require('express');
const cors = require('cors');
const PDFdocument = require('pdfkit');
const exls = require('xlsx');
const fs = require('fs');
const { log } = require('console');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 5000;

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

app.post('/api/v1/generate-pdf', (req, res)  => {

    const {title, content} = req.body;
   // check directory present or not if not create it au
   //    console.log(req.body);
   

   const dir = './documents';
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
    // check inside documents file present or not if not create it dynamically

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=${title}.pdf`);
    
    const doc = new PDFdocument();
    const filename =  `${title}.pdf`;
    const filePath = `${dir}/${filename}`;

    const stream = fs.createWriteStream(filePath);
    
    // console.log(`File path: ${filePath}`);
    

    doc.pipe(stream);
    doc.fontSize(25).text(content, 100, 100);
    doc.end();

    stream.on('finish', () => {
        res.download(filePath, filename, (err) => {
            if (err) {
                console.error('Download error:', err);
                res.status(500).send('Download failed.');
            }

            // fs.unlink(filePath, (unlinkErr) => {
            //     if (unlinkErr) console.error('Cleanup error:', unlinkErr);
            // });
        });
    });
});

//data input like this
// const data = [
//   { title: "abc", content: "hello world" },
//   { title: "def", content: "lorem ipsum" },
// ];

app.post('/api/v1/generate-excel', (req, res) => {
    const { title, content } = req.body;

    // Validate input
    if (!title || !content) {
        return res.status(400).json({ error: 'Title and content are required.' });
    }

    const data = [{ title, content }];

    // Create worksheet
    const ws = exls.utils.json_to_sheet(data);

    // Apply header styles (only works in Excel)
    const headerStyle = {
        fill: { fgColor: { rgb: "FFFF00" } },  // Yellow background
        font: {
            bold: true,
            color: { rgb: "FF0000" },  // Red text
            sz: 12,
            name: 'Arial'
        },
        alignment: { horizontal: "center" }
    };

    // Apply styles to headers
    ws['A1'].s = headerStyle;
    ws['B1'].s = headerStyle;

    // Create workbook
    const wb = exls.utils.book_new();
    exls.utils.book_append_sheet(wb, ws, 'Sheet1');

    // Ensure directory exists
    const dir = './documents';
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }

    // Sanitize file name to avoid illegal characters
    const safeFilename = `${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.xlsx`;
    const filePath = `${dir}/${safeFilename}`;

    // Write Excel file
    exls.writeFile(wb, filePath);

    // Send file for download
    res.download(filePath, safeFilename, (err) => {
        if (err) {
            console.error('Download error:', err);
            res.status(500).send('Failed to download file');
        }

        // Optionally delete file after download
        // fs.unlink(filePath, (unlinkErr) => {
        //     if (unlinkErr) console.error('File delete error:', unlinkErr);
        // });
    });
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});



