const Product = require('../models/product');
const Category = require('../models/category');
exports.getIndex =  (req, res, next)=>{
    // res.sendFile(path.join(__dirname, '../', 'views', 'index.html')); // res hem sonlanır hemde içerik yazılabilir.  
    // const products = Product.getAll(); // BÜTÜN ÜRÜNLERİ GÖNDERİR
    Product.findAll(
        {
            attributes: ['id', 'name', 'price', 'imageUrl']
        }
    )
    .then(products => {
        Category.findAll()
            .then(categories =>{
                res.render('shop/index', {title: 'Shopping', products: products,categories: categories, path : '/'}); // PUG DOSYASI EKLEME BÖYLE ÜSTEKİ HTML
            })
            .catch((err) => {

                console.log(err);
            })
            
    })
    .catch((err) => {

        console.log(err);
    })
    
}

exports.getProducts =  (req, res, next)=>{
    // res.sendFile(path.join(__dirname, '../', 'views', 'index.html')); // res hem sonlanır hemde içerik yazılabilir.  
    // const products = Product.getAll(); // BÜTÜN ÜRÜNLERİ GÖNDERİR


    Product.findAll( {
        attributes: ['id', 'name', 'price', 'imageUrl']
    })
    .then(products => {
        Category.findAll()
            .then(categories =>{
                res.render('shop/products', {title: 'Products', products: products,categories: categories, path : '/'}); // PUG DOSYASI EKLEME BÖYLE ÜSTEKİ HTML
            })
            .catch((err) => {

                console.log(err);
            })
            
    })
    .catch((err) => {

        console.log(err);
    })
}
exports.getProductsByCategoryId =  (req, res, next)=>{
    // res.sendFile(path.join(__dirname, '../', 'views', 'index.html')); // res hem sonlanır hemde içerik yazılabilir.
    const categoryid = req.params.categoryid;
    const model = [];
    
    Category.findAll()
        .then(categories =>{
            model.categories = categories;
            const category = categories.find(i=> i.id==categoryid); // bütün categori id lerinde dolaşarak gelen ile eşit olunca atama yapar.
            return category.getProducts();
        })
        .then(products =>{
            res.render('shop/products', {
                title: 'Products', 
                products: products, 
                categories: model.categories,
                selectedCategory: categoryid, 
                path : '/products'
            }); // PUG DOSYASI EKLEME BÖYLE ÜSTEKİ HTML
        })
        .catch((err) =>{
            console.log(err);
        })

    
}

exports.getProduct =  (req, res, next)=>{
    Product.findByPk(req.params.productid) // id bilgisine göre seçme yapar.
        .then((product)=>{
            res.render('shop/product-detail', {
                title: product.name,
                product: product,
                path: '/products' 
            });
        })
        .catch((err) =>{
            console.log(err);
        });

    
}


exports.getCart =  (req, res, next)=>{
    // res.sendFile(path.join(__dirname, '../', 'views', 'index.html')); // res hem sonlanır hemde içerik yazılabilir.  
    req.user
        .getCart()
        .then(cart =>{
            return cart.getProducts()
                        .then(products => {
                            console.log(products);
                            res.render('shop/cart', {title: 'Cart',products: products ,path : '/cart'}); // PUG DOSYASI EKLEME BÖYLE ÜSTEKİ HTMLL
                        })
                        .catch(err =>{
                            console.log(err);
                        })

        })
        .catch(err =>{
            console.log(err);
        })
}


exports.postCart =  (req, res, next)=>{
    // res.sendFile(path.join(__dirname, '../', 'views', 'index.html')); // res hem sonlanır hemde içerik yazılabilir.  
    
    const productId = req.body.productId;
    let quantity = 1;
    let userCart;
    req.user
        .getCart()
        .then(cart =>{
            userCart = cart;
            return cart.getProducts({where: {id: productId}})


        })
        .then(products=>{
            let product;

            if(products.length > 0){
                product = products[0];
            }

            if(product) {
                quantity += product.cartItem.quantity;
                return product;
            }
            return Product.findByPk(productId);

        })
        .then(product =>{
            userCart.addProduct(product, {
                through: {
                    quantity: quantity
                }
            });
        })
        .then(() =>{
            res.redirect('/cart');
        })
        .catch(err =>{
            console.log(err);
        })
}

exports.postCartItemDelete =  (req, res, next)=>{
    // res.sendFile(path.join(__dirname, '../', 'views', 'index.html')); // res hem sonlanır hemde içerik yazılabilir.  
    const productid = req.body.productid;

    req.user
        .getCart()
        .then(cart => {
            return cart.getProducts({where: {id: productid}});
        })
        .then(products => {
            const product = products[0];

            return product.cartItem.destroy();
        })
        .then(result =>{
            res.redirect('/cart');
        });
}


exports.getOrders =  (req, res, next)=>{
    // res.sendFile(path.join(__dirname, '../', 'views', 'index.html')); // res hem sonlanır hemde içerik yazılabilir.  
    req.user
        .getOrders({ include: ['products'] })
        .then(orders => {
            console.log(orders);
            res.render('shop/orders', {title: 'Orders', orders: orders, path : '/orders'}); // PUG DOSYASI EKLEME BÖYLE ÜSTEKİ HTML
        })
        .catch(err =>{
            console.log(err);
        })
}

exports.postOrders =  (req, res, next)=>{
    // res.sendFile(path.join(__dirname, '../', 'views', 'index.html')); // res hem sonlanır hemde içerik yazılabilir.  
    let userCart;
    req.user
        .getCart()
            .then(cart => {
                userCart = cart;
                return cart.getProducts();
            })
            .then(products => {
                return req.user.createOrder()
                    .then(order =>{
                        order.addProducts(products.map(product=> {
                            product.orderItem = {
                                quantity: product.cartItem.quantity,
                                price: product.price
                            }
                            return product;
                        }));
                    })
                    .catch(err => {
                        console.log(err);
                    })
            })
            .then(() =>{
                userCart.setProducts(null);
            })
            .then(() =>{
                res.redirect('/orders');
            })
            .catch(err =>{
                console.log(err);
            })    
}

