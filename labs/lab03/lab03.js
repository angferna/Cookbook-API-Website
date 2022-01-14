import fs from 'fs';
import zlib from 'zlib';

class lab03 {

  syncFileRead(filename) {
    var data = fs.readFileSync(filename);
    return data.toString();
  }

  asyncFileRead(filename, callback) {
    fs.readFile(filename, function(err, data){
      if (err) console.error(err);
      callback(data.toString());
    });
  }

  compressFileStream(inputFile, outputFile) {
    var writeStream = fs.createWriteStream(outputFile);
    fs.createReadStream(inputFile)
        .pipe(zlib.createGzip())
        .pipe(writeStream);
    return writeStream;
  }

  decompressFileStream(inputFile, outputFile) {
    var writeStream = fs.createWriteStream(outputFile);
    fs.createReadStream(inputFile)
        .pipe(zlib.createGunzip())
        .pipe(writeStream);
    return writeStream;
  }

  listDirectoryContents(dir, callback) {
    var stringsArr = [];
    fs.readdir(dir, function(data, err){
      if(err) console.error(err);
      stringsArr.push(data);
    });
    return callback(stringsArr);
  }

}

export {lab03};
