const products = [
    {
        id: '1',
        name: 'Remera Negra',
        price: 1000,
        category: 'ropa',
        // Foto real de una remera negra
        img: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
        stock: 25,
        description: 'Remera básica de algodón, ideal para todo uso.'
    },
    {
        id: '2',
        name: 'Zapatillas Deportivas',
        price: 2000,
        category: 'ropa',
        // Foto real de zapatillas rojas
        img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
        stock: 10,
        description: 'Zapatillas cómodas para correr o entrenamiento.'
    },
    {
        id: '3',
        name: 'Auriculares Bluetooth',
        price: 500,
        category: 'electronica',
        // Foto real de auriculares
        img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
        stock: 5,
        description: 'Auriculares inalámbricos con cancelación de ruido.'
    }
]

export const getProducts = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(products)
        }, 500)
    })
}

export const getProductsByCategory = (categoryId) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(products.filter(prod => prod.category === categoryId))
        }, 500)
    })
}

export const getProductById = (productId) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(products.find(prod => prod.id === productId))
        }, 500)
    })
}