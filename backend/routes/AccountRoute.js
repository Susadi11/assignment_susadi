import express from 'express';
import { Account } from '../models/AccountModel.js';

const router = express.Router();

// Save new account
router.post('/', async (request, response) => {
    try {
        if (!request.body.accountNumber || request.body.balance === undefined) {
            return response.status(400).send({
                message: 'Send all required fields',
            });
        }

        const newAccount = {
            accountNumber: request.body.accountNumber,
            balance: request.body.balance,
        };

        const result = await Account.create(newAccount);

        return response.status(201).send(result);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Get all accounts
router.get('/', async (request, response) => {
    try {
        const result = await Account.find({});

        return response.status(200).json({
            count: result.length,
            data: result,
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Get account by id
router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const result = await Account.findById(id);

        return response.status(200).json(result);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Update account
router.put('/:id', async (request, response) => {
    try {
        if (!request.body.accountNumber || request.body.balance === undefined) {
            return response.status(400).send({
                message: 'Send all required fields',
            });
        }

        const { id } = request.params;

        const result = await Account.findByIdAndUpdate(id, request.body, {
            new: true,
        });

        if (!result) {
            return response.status(404).json({ message: 'Account not found' });
        }

        return response.status(200).send({ message: 'Account updated successfully' });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Delete account
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const result = await Account.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).json({ message: 'Account not found' });
        }

        return response.status(200).send({ message: 'Account deleted successfully' });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

export default router;
