const PORT = 3000;
const DB_URI= "mongodb://pothole-detection-db:DMDorDeN3mTagIA0ZhSqiARvq6ZnhoEG7MWVfmzWYq1F0Lu0OGNXHb8MbVvL89BKbVXMygQqrJgJACDbY4YKzQ==@pothole-detection-db.mongo.cosmos.azure.com:10255/Pothole?ssl=true&retrywrites=false&replicaSet=globaldb&maxIdleTimeMS=120000&appName=@pothole-detection-db@";
const secretKey = "secretKey";

module.exports = {
    PORT,
    DB_URI,
    secretKey
};