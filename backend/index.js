import express from 'express';
import mongoose from 'mongoose';
import { PORT, mongoDBURL } from "./config.js";
import AccountRoute from './routes/AccountRoute.js';
import TransactionRoute from './routes/TransactionRoute.js';

const app = express();
// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
mongoose.connect(mongoDBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(error => console.error('Could not connect to MongoDB:', error.message));

// Use the routes
app.use('/accounts', AccountRoute);
app.use('/transactions', TransactionRoute);

// Default route
app.get('/', (req, res) => {
    res.send('Welcome to the TransferService API');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ message: 'Something broke!' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
