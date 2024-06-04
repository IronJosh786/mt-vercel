import multer from "multer";

const storagePath =
  process.env.NODE_ENV === "production" ? "/tmp" : "./public/temp";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, storagePath);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

export const upload = multer({ storage: storage });
