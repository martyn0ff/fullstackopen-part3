function getConnectionString() {
  return process.env.DATABASE_URI;
}

function toJSON() {
  return {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString();
      delete returnedObject._id;
      delete returnedObject.__v;
    },
  };
}

function configureMongoose(mongoose) {
  checkConnectionString();
  mongoose.set("strictQuery", false);
  return mongoose;
}

function checkConnectionString() {
  if (!process.env.DATABASE_URI) {
    throw new Error("Connection string is required");
  }
}

module.exports = { toJSON, configureMongoose, getConnectionString };
