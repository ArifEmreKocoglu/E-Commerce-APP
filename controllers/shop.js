const Product = require('../models/product');
const Category = require('../models/category');
exports.getIndex =  (req, res, next)=>{
    // res.sendFile(path.join(__dirname, '../', 'views', 'index.html')); // res hem sonlanır hemde içerik yazılabilir.  
    const products = Product.getAll(); // BÜTÜN ÜRÜNLERİ GÖNDERİR
    const categories = Category.getAll();
    res.render('shop/index', {title: 'Shopping', products: products,categories: categories, path : '/'}); // PUG DOSYASI EKLEME BÖYLE ÜSTEKİ HTML
}

exports.getProducts =  (req, res, next)=>{
    // res.sendFile(path.join(__dirname, '../', 'views', 'index.html')); // res hem sonlanır hemde içerik yazılabilir.  
    const products = Product.getAll(); // BÜTÜN ÜRÜNLERİ GÖNDERİR
    const categories = Category.getAll();
    res.render('shop/products', {title: 'Products', products: products,categories: categories ,path : '/products'}); // PUG DOSYASI EKLEME BÖYLE ÜSTEKİ HTML
}
exports.getProductsByCategoryId =  (req, res, next)=>{
    // res.sendFile(path.join(__dirname, '../', 'views', 'index.html')); // res hem sonlanır hemde içerik yazılabilir.
    const categoryid = req.params.categoryid;
    const products = Product.getProductsByCategoryId(categoryid); // BÜTÜN ÜRÜNLERİ GÖNDERİR
    const categories = Category.getAll();
    res.render('shop/products', {
        title: 'Products', 
        products: products, 
        categories: categories,
        selectedCategory: categoryid, 
        path : '/products'
    }); // PUG DOSYASI EKLEME BÖYLE ÜSTEKİ HTML
}

exports.getProduct =  (req, res, next)=>{
  const productId = req.params.productid;
  const product = Product.getById(productId);

  res.render('shop/product-detail', {
      title: product.name,
      product: product,
      path: '/products' 
  });
}


exports.getProductsDetails =  (req, res, next)=>{
    // res.sendFile(path.join(__dirname, '../', 'views', 'index.html')); // res hem sonlanır hemde içerik yazılabilir.  
    const products = Product.getAll(); // BÜTÜN ÜRÜNLERİ GÖNDERİR
    res.render('shop/details', {title: 'Details', products: products, path : '/details'}); // PUG DOSYASI EKLEME BÖYLE ÜSTEKİ HTML
}

exports.getCart =  (req, res, next)=>{
    // res.sendFile(path.join(__dirname, '../', 'views', 'index.html')); // res hem sonlanır hemde içerik yazılabilir.  
    const products = Product.getAll(); // BÜTÜN ÜRÜNLERİ GÖNDERİR
    res.render('shop/cart', {title: 'Cart', products: products, path : '/cart'}); // PUG DOSYASI EKLEME BÖYLE ÜSTEKİ HTML
}

exports.getOrders =  (req, res, next)=>{
    // res.sendFile(path.join(__dirname, '../', 'views', 'index.html')); // res hem sonlanır hemde içerik yazılabilir.  
    const products = Product.getAll(); // BÜTÜN ÜRÜNLERİ GÖNDERİR
    res.render('shop/orders', {title: 'Orders', products: products, path : '/orders'}); // PUG DOSYASI EKLEME BÖYLE ÜSTEKİ HTML
}
