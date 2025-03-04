const fs = require("fs");
const path = require("path");
// 1. make the upload where i used no of strem file create and upload in one folder
// 2. file manage using crud operation


let noOfFile = 10;
function  fileUploads() {
    let obj = {};
    for(let i = 0; i < noOfFile; i++){
        let filename = `file${i}.txt`;
        let fileocontent = `file${i} has ths content ${i}`
        fs.writeFile(`./upload/${filename}`, fileocontent, function (error) {
            if(error){
                return  error;
            }
        });
        let key = i;
        obj[key] = {
          id: key,
          name: filename,
          store: `./upload/${filename}`,
        };
    }
    return {
        message:"upload succesfully",
        data:obj
    };
}



//manage the file name CRUD


function searchFile(filename) {
  let filepath = path.join(__dirname,'./upload' ,filename);

  return fs.existsSync(filepath);

}

function countTheFileInFolder() {
    let folderPath = path.join(__dirname, "./upload");
    let files = fs.readdirSync(folderPath);
    return files;
}

function removeFile(filename) {
    fs.unlink(`./upload/${filename}`, function(error){
        if(error){
            return error;
        }
    })
    return {
      message: `${filename} deleted succesfully !`,
    };
}

function removeAllFileFromFolder(allfiles) {
        if (allfiles.length === 0){
            return {
                message:'your file is empty !!'
            }
        }
      for (let i = 0; i < allfiles.length; i++) {
        let filepath = path.join(__dirname, "./upload", allfiles[i]);
        fs.unlinkSync(filepath);
      }
    return{
        message:"All file deleted !!",
    }
}

function updateFile(oldfilename, newfilename) {
   let oldfile = path.join(__dirname, `./upload/${oldfilename}`);
   let newfile = path.join(__dirname, `./upload/${newfilename.name}`);
    fs.rename(oldfile, newfile, function(error){
      return error;
    });
    fs.writeFile(newfile, newfilename.content, function(error){
    if(error){
        return error;
    }
    });

    return {
     message: `file update from ${oldfilename} to ${newfilename.name}  successfully !!`,
     data: newfilename,
    };

}

function readAllFileFromFolder() {
    let obj =[];
    let folderPath = path.join(__dirname, "./upload");
    let files = fs.readdirSync(folderPath);
    for(let i = 0; i < files.length; i++){
        let filePath = path.join(folderPath, files[i]);
        let content = fs.readFileSync(filePath, "utf8");
        obj.push({
          id:i,
          name:files[i],
          content:content,
        })
    }
    return {
        message:"All file read",
        data: obj
    }
}

function appendFile(filename, content){
   let filePath = path.join(__dirname, "./upload", filename);

   try {
     fs.appendFileSync(filePath, "\n" + content + "\n", "utf8"); 
     return { message: "Content appended successfully" };
   } catch (error) {
     console.error("Error appending file:", error.message);
     return { message: "Error appending file", error: error.message };
   }
}

function readFile(filename) {
  let filePath = path.join(__dirname, "./upload", filename);

  try {
    let data = fs.readFileSync(filePath, "utf8"); 
    return {
      message: "success",
      data: data,
    };
  } catch (error) {
    return {
      message: "error",
      error: error.message,
    };
  }
}



let filename ="file3.txt";
let result = null;
// let content = "hello apped file";
//  newfilename = {
//     name:'file40.txt',
//     content:"hello i am the best in the world 40"
// }
//  oldfilename = "file30.txt";


//  result = fileUploads();
//  result = removeFile(filename);
//  result = updateFile(oldfilename, newfilename);
//  result = readAllFileFromFolder();
 result = readFile(filename);
//  result = appendFile(filename);
// result = searchFile(filename);

//get folder list of files length
// let files = countTheFileInFolder();
// result = removeAllFileFromFolder(files);

// result = appendFile(filename, content);

console.log(result);





