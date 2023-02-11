const mongoose = require('mongoose');
// mongodb + srv://rex28:Password$123@cluster0.s7jvfsp.mongodb.net/?retryWrites=true&w=majority

const connectDB = async () => {
    try {
        mongoose.set('strictQuery', false);
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true
        });
        console.log(`MongoDB connected ${conn.connection.host}`);
    } catch (error) {
        console.error('Error');
        process.exit();
    }
}
module.exports = connectDB;