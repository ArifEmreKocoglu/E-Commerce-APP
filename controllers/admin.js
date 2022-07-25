const Product = require('../models/product');
const Category = require('../models/category');


exports.getProducts =  (req, res, next)=>{
    // res.sendFile(path.join(__dirname, '../', 'views', 'index.html')); // res hem sonlanır hemde içerik yazılabilir.  
    const products = Product.getAll(); // BÜTÜN ÜRÜNLERİ GÖNDERİR
    res.render('admin/products', {
        title: 'Admin Page', 
        products: products, 
        path : '/admin/products', 
        action: req.query.action
    }); // PUG DOSYASI EKLEME BÖYLE ÜSTEKİ HTML
 }

 exports.getAddProduct = (req, res, next)=>{ // sadece get için çalışır.
    // res.sendFile(path.join(__dirname, '../', 'views', 'add-product.html'));
    const categories = Category.getAll();
    res.render('admin/add-product', {title:'New Product',categories: categories ,path : '/admin/add-product'});
}

exports.postAddProduct = (req, res, next)=>{ //app.post yapmamızın sebebi içine bişey geldiğinde çalışmasını sağlamak.
    //data base kayıt.
    const product = new Product();
    product.name = req.body.name;
    product.price = req.body.price;
    product.imageUrl = req.body.imageUrl;
    product.description = req.body.description;
    product.categoryid = req.body.categoryid;
    product.saveProduct();
    res.redirect('/'); // anasayfaya yönlendir.
}

exports.getEditProduct = (req, res, next)=>{ // sadece get için çalışır.
    // res.sendFile(path.join(__dirname, '../', 'views', 'add-product.html'));
    const product = Product.getById(req.params.productid);
    const categories = Category.getAll();
    res.render('admin/edit-product', {title:'Edit Product',categories: categories, path : '/admin/products', product: product});
}

exports.postEditProduct = (req, res, next)=>{ //app.post yapmamızın sebebi içine bişey geldiğinde çalışmasını sağlamak.
    
    const product = Product.getById(req.body.id);

    product.name = req.body.name;
    product.price = req.body.price;
    product.description = req.body.description;
    product.imageUrl = req.body.imageUrl;
    product.categoryid = req.body.categoryid;
    
    Product.Update(product);
    res.redirect('/admin/products?action=edit'); // anasayfaya yönlendir.
}

exports.postDeleteProduct = (req, res, next) => {
    Product.DeleteById(req.body.productid);
    res.redirect('/admin/products?action=delete');
}