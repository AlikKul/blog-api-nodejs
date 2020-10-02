const mongoose = require('mongoose');

(async function () {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
  } catch {
    console.log('DB connection failed');
  }
})();