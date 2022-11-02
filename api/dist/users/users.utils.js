"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveImageToStorage = void 0;
const path_1 = require("path");
const multer_1 = require("multer");
const fs = require('fs');
const validFileExtensions = ['png', 'jpg', 'jpeg'];
const validMimTypes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
];
exports.saveImageToStorage = {
    storage: (0, multer_1.diskStorage)({
        destination: "./upload", filename: (req, file, callback) => {
            let fileName = (Math.random() + 1).toString(36).substring(7);
            callback(null, fileName + (0, path_1.extname)(file.originalname));
        }
    }),
    filefilter: (req, file, callback) => {
    },
};
//# sourceMappingURL=users.utils.js.map