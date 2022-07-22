import mongoose from 'mongoose';

const DB_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017';

const dbconnect = () => {
  mongoose.connect(DB_URL);
};
dbconnect();

const db = mongoose.connection;

db.on('connected', () =>
  console.log('정상적으로 MongoDB 서버에 연결되었습니다.')
);
db.on('error', (error) =>
  console.error('\nMongoDB 연결에 실패하였습니다...\n')
);
export { dbconnect };
