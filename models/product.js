// const connection = require('../utility/database');

// module.exports = class Product {
//     constructor(name, price, imageUrl, description, categoryid){
//         this.name = name;
//         this.price = price;
//         this.imageUrl = imageUrl;
//         this.description = description;
//         this.categoryid = categoryid;
//     }
//     saveProduct() {
//         return connection.execute('INSERT INTO products (name, price, imageUrl, description, categoryid) VALUES (?, ?, ?, ?, ?)', 
//         [this.name, this.price, this.imageUrl, this.description, this.categoryid])
//     }
//     static getAll() {
//         return connection.execute('SELECT * FROM products'); // WHERE FİLİTRELERE YAPAR.
//     }

//     static getById(id) {
//        return connection.execute('SELECT * FROM products WHERE products.id=?', [id]);
//     }
//     static getProductsByCategoryId(categoryid){
       
//     }

//     static Update(product) {
//        return connection.execute('UPDATE products SET products.name=?, products.price=?,products.imageUrl=?, products.description=?, products.categoryid=? WHERE products.id=?', 
//         [product.name, product.price, product.imageUrl, product.description, product.categoryid,product.id])
//     }

//     static DeleteById(id) {
//         return connection.execute('DELETE FROM products WHERE id=?',[id]);
//     }
// }

// **************SEQUELİZE************
const Sequelize= require('sequelize');
const sequelize = require('../utility/database');

const Product = sequelize.define('product',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: Sequelize.STRING,
    price: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    imageUrl: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: true
    }
});

module.exports = Product;