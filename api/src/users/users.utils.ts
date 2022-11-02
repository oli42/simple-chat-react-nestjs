import { v4 as uuidv4 } from 'uuid';
import path, { extname } from "path";
import { diskStorage } from 'multer';
import {fileTypeFromFile} from 'file-type';

const fs = require('fs');
// const FileType = require('file-type');

type validFileExtension = 'png'  | 'jpg' | 'jpeg';
type validMimeType = 'image/png' | 'image/jpg' | 'image/jpeg';

const validFileExtensions: validFileExtension[] = ['png', 'jpg', 'jpeg'];
const validMimTypes: validMimeType[] = [
    'image/jpeg',
    'image/jpg',
    'image/png',
]

export const saveImageToStorage = {

storage: diskStorage({
    destination: "./upload", filename: (req, file, callback) => {
        let fileName = (Math.random() + 1).toString(36).substring(7);
        callback(null, fileName + extname(file.originalname))
}
}),
filefilter: (req, file, callback) => {
// const allowedMimTypes: validMimeType[] = validMimTypes;
// allowedMimTypes.includes(file.mimetype) ? callback(null, true) : callback(null, false);
// const allowedFileExtensions: validFileExtension[] = validFileExtensions;
// allowedFileExtensions.includes(file.fileExtension) ? callback(null, true) : callback(null, false);
},
}