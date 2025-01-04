const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_STRING, {
        // useNewUrlParser: true,  // Both Url & Unified are both deprecated
        // useUnifiedTopology: true,
        tls: true, // Enable TLS
        tlsAllowInvalidCertificates: true, // Use with caution in production
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;