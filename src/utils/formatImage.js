import multer from 'multer';
import DataParser from 'datauri/parser.js';
import path from 'path';

const storage = multer.memoryStorage();

const upload = multer({ storage });

const parser = new DataParser();

export const formatImage = (file) => {
  console.log(file,'fffffff');
  const fileExtension = path.extname(file.originalname).toString();
  const fielparser = parser.format(fileExtension, file.buffer).content;
  return fielparser
};

export default upload;