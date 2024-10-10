const express = require('express')
const router = express.Router()
const transactionService = require('./transaction.service')

router.post('/borrow', async (req, res) => {
    try {
        const { userId, itemId, quantityBorrowed } = req.body
        const newTransaction = await transactionService.borrowItem(userId, itemId, quantityBorrowed)
        res.status(201).json(newTransaction)
    } catch (e) {
        res.status(400).json({ message: e.message })
    }
})

router.get('/', async (req, res) => {
    try {
        const transaction = await transactionService.getAllTransaction();
        res.send(transaction)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.get('/user', async (req, res) => {
    const { userId } = req.body
    try {
        const transaction = await transactionService.getAllTransactionByUserId(userId)
        res.status(200).send(transaction)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.patch('/verify/:transactionId', async (req, res) => {
    try {
        const { transactionId } = req.params
        const { status } = req.body
        await transactionService.verifyTransaction(transactionId, status)
        res.status(200).json({ message: 'transaction verif sucess' })
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.post('/return/:transactionId', async (req, res) => {
    try {
        const { transactionId } = req.params
        const { userId } = req.body

        const transaction = await transactionService.getAllTransactionById(transactionId)

        if (transaction.userId !== userId) {
            return res.status(403).json({ message: "unauthorized" })
        }
        await transactionService.returnItem(transactionId)
        res.status(200).json({ message: 'item returned' })
    } catch (error) {
        console.log(error)
        res.status(400).send(error.message)
    }
})

module.exports = router