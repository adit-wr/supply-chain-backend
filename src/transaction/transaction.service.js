const transactionRepository = require('./transaction.repository')
const itemRepository = require('../item/item.repository')

async function borrowItem(userId, itemId, quantityBorrowed) {
    const newTransaction = await transactionRepository.createTransaction(userId, itemId, quantityBorrowed)
    return newTransaction
}

async function getAllTransaction() {
    const transaction = await transactionRepository.findTransaction()
    return transaction
}
async function getAllTransactionByUserId(userId) {
    const transaction = await transactionRepository.findTransactionByUserId(userId)
    return transaction
}
async function getAllTransactionById(transactionId) {
    const transaction = await transactionRepository.findTransactionById(transactionId)
    return transaction
}
async function verifyTransaction(transactionId, status) {
    const transaction = await transactionRepository.findTransactionById(transactionId)
    if (!transaction) {
        throw new Error('transaction not fuond')
    }
    await transactionRepository.updateTransactionStatus(transactionId, status, status === 'BORROWED' ? 'borrowedAt' : null)

    if (status === 'BORROWED') {
        const item = await itemRepository.findItemById(transaction.itemId)
        if (!item) {
            throw new Error('item not found')
        }

        const newQuantity = item.quantity - transaction.quantityBorrowed
        if (newQuantity < 0) {
            throw new Error('insufficent quantity')
        }
        await itemRepository.updateItemQuantity(item.id, newQuantity)
    }
}

async function returnItem(transactionId) {
    const transaction = await transactionRepository.findTransactionById(transactionId)
    if (!transaction) {
        throw new Error('transaction not found')
    }
    if (transaction.status !== 'BORROWED') {
        throw new Error('cannot return item, transaction status is borrowed')
    }
    await transactionRepository.updateTransactionStatus(transactionId, "RETURNED", "returnedAt")
    const item = await itemRepository.findItemById(transaction.itemId)
    const newQuantity = item.quantity + transaction.quantityBorrowed
    await itemRepository.updateItemQuantity(item.id, newQuantity)
}

module.exports = {
    borrowItem,
    getAllTransaction,
    getAllTransactionById,
    getAllTransactionByUserId,
    verifyTransaction,
    returnItem
}