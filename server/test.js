const express = require('express')
const cors = require('cors')
const pool = require('./db')
const app = express()


app.use(cors())
app.use(express.json())

// ROUTES

// get all product
app.get('/products', async(req, res)=>{
    try {
      const allProduct = await pool.query("SELECT * FROM products")  
      res.json(allProduct.rows)
    } catch (err) {
        console.error(err.message)
    }
})

// create new product
app.post('/products', async(req, res)=>{
    try {
        const {productName, productDesc, productPrice, productRating} = req.body
        const newProduct = await pool.query("INSERT INTO products (productName, productDesc, productPrice, productRating) VALUES($1, $2, $3, $4) RETURNING *", [productName, productDesc, productPrice, productRating])
        res.json(newProduct.rows[0])
    } catch (err) {
        console.error(err.message)
    }
})
// select a single product
app.get('product/:id', (req, res)=>{
    try {
        const {id} = req.params
        const product = await pool.query("SELECT * FROM products WHERE id=$1", [id])
        res.json(product.rows[0])
    } catch (err) {
        console.error(err.message)
    }

})
// update a product
app.put('product/:id', async(req, res)=>{
    try {
     const {id} = req.params
     const {productName, productDesc, productPrice, productRating} = req.body
     const updatedProduct = await pool.query("UPDATE products SET productName = $1, productDesc = $2, productPrice = $3, productRating = $4 WHERE id = $5", [productName, productDesc, productPrice, productRating, id])
     res.json("Product was Updated successfully")
    } catch (err) {
        console.error(err.message)
    }

})
// delete a product
app.delete('product/:id', async(req, res)=>{
    try {
        const {id} = req.params
        const deleteProduct = await pool.query("DELETE FROM products WHERE id = $id", [id])
        res.json("Product deleted successfully")
    } catch (err) {
     console.error(err.message)
    }

})
