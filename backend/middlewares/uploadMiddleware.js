import multer from 'multer';

// Multer Setup (File ko memory mein save karenge)
const storage = multer.memoryStorage();
export const upload = multer({ storage: storage });