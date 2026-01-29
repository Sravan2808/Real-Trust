const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'));
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, 
  fileFilter: fileFilter,
});


const processImage = async (req, res, next) => {
  if (!req.file) {
    return next();
  }

  try {
    const filename = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(req.file.originalname)}`;
    const filepath = path.join(uploadsDir, filename);

    await sharp(req.file.buffer)
      .resize(450, 350, {
        fit: 'cover',
        position: 'center',
      })
      .toFile(filepath);

    req.file.filename = filename;
    req.file.path = filepath;
    
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { upload, processImage };