import express from 'express';
import { Transaction } from '../models/TransactionModel.js';

const router = express.Router();

// Save new transaction
router.post('/', async (request, response) => {
    try {
        if (
            !request.body.sourceAccountNumber ||
            !request.body.destinationAccountNumber ||
            request.body.amount === undefined
        ) {
            return response.status(400).send({
                message: 'Send all required fields',
            });
        }

        const newTransaction = {
            sourceAccountNumber: request.body.sourceAccountNumber,
            destinationAccountNumber: request.body.destinationAccountNumber,
            amount: request.body.amount,
        };

        const result = await Transaction.create(newTransaction);

        return response.status(201).send(result);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Get all transactions
router.get('/', async (request, response) => {
    try {
        const result = await Transaction.find({});

        return response.status(200).json({
            count: result.length,
            data: result,
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Get transaction by id
router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const result = await Transaction.findById(id);

        return response.status(200).json(result);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Update transaction
router.put('/:id', async (request, response) => {
    try {
        if (
            !request.body.sourceAccountNumber ||
            !request.body.destinationAccountNumber ||
            request.body.amount === undefined
        ) {
            return response.status(400).send({
                message: 'Send all required fields',
            });
        }

        const { id } = request.params;

        const result = await Transaction.findByIdAndUpdate(id, request.body, {
            new: true,
        });

        if (!result) {
            return response.status(404).json({ message: 'Transaction not found' });
        }

        return response.status(200).send({ message: 'Transaction updated successfully' });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Delete transaction
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const result = await Transaction.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).json({ message: 'Transaction not found' });
        }

        return response.status(200).send({ message: 'Transaction deleted successfully' });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

export default router;
