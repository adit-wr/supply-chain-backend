const prisma = require('../db')

const insertUser = async (userData) => {
    const newUser = await prisma.user.create({
        data: {
            username: userData.username,
            email: userData.email,
            password: userData.password
        }
    })
    return newUser
}

const getAllUser = async () => {
    const allUser = await prisma.user.findMany({
        select: {
            id: true,
            username: true,
            email: true,
            role: true,
            createdAt: true
        }
    })
    return allUser
}

const getUserById = async (id) => {
    const user = await prisma.user.findUnique({
        where: {
            id: parseInt(id)
        }
    })
    return user
}

const editUser = async (id, userData) => {
    const user = await prisma.user.update({
        where: {
            id: parseInt(id)
        },
        data: {
            username: userData.username,
            email: userData.email,
            password: userData.password,
            role: userData.role
        }
    })
    return user
}

const deleteUser = async (id) => {
    const user = await prisma.user.delete({
        where: {
            id: parseInt(id)
        }
    })
    return user
}

module.exports = {
    insertUser,
    getAllUser,
    getUserById,
    editUser,
    deleteUser
}