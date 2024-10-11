const prisma = require('../db')

async function createTransaction(userId, itemId, quantityBorrowed) {
    try {
        const newTransaction = await prisma.transaction.create({
            data: {
                userId,
                itemId,
                quantityBorrowed,
                status: "PENDING"
            }
        })
        return newTransaction
    } catch (error) {
        console.log(error)
        throw new Error('failed create transaction')
    }
}

async function findTransaction() {
    try {
        const transaction = await prisma.transaction.findMany({
            include: {
                item: {
                    select: {
                        name: true,
                    }
                }
            }
        })
        return transaction
    } catch (error) {
        throw new Error('failed find transaction')
    }
}

async function findTransactionByUserId(userId) {
    try {
        const transaction = await prisma.transaction.findMany({
            where: {
                userId: parseInt(userId)
            },
            include: {
                item: {
                    select: {
                        name: true,
                    }
                }
            }
        })
        return transaction
    } catch (error) {
        console.log(error)
        throw new Error('failed find transaction by user id')
    }
}

async function findTransactionById(transactionId) {
    try {
        const transaction = await prisma.transaction.findUnique({
            where: {
                id: parseInt(transactionId),
            }
        })
        return transaction
    } catch (error) {
        console.log(transactionId)
        throw new Error('transaction by id not found')
    }
}

async function updateTransactionStatus(transactionId, status, timeStampField) {
    try {
        const updateData = {
            status,
        }

        if (timeStampField) {
            updateData[timeStampField] = new Date()
        }

        await prisma.transaction.update({
            where: {
                id: parseInt(transactionId),
            },
            data: updateData
        })
    } catch (error) {
        console.log(transactionId)
        throw new Error('failed update transaction status')
    }
}

module.exports = {
    createTransaction,
    findTransaction,
    findTransactionById,
    findTransactionByUserId,
    updateTransactionStatus,
}