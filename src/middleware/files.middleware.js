// import multur to work with multipart data like doc and files
import multer from "multer";

// use multer to create middle to store files and doc
const storageConfig = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, 'public/files/')
    },
    filename : (req, file, cb) => {
        const name = Date.now() + '-' + file.originalname
        cb(null, name)
    }
})

// export middleware
export const uploadFile = multer({
    storage : storageConfig
})