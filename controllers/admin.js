const Product = require('../models/product');
const Category = require('../models/category');


exports.getProducts =  (req, res, next)=>{
    // res.sendFile(path.join(__dirname, '../', 'views', 'index.html')); // res hem sonlanır hemde içerik yazılabilir.  
    // const products = Product.getAll(); // BÜTÜN ÜRÜNLERİ GÖNDERİR
   
    Product.findAll()
    .then(products => {
        res.render('admin/products', {title: 'Admin Page', products: products ,action: req.query.action , path :'/admin/products'}); // PUG DOSYASI EKLEME BÖYLE ÜSTEKİ HTML
    })
    .catch((err) => {

        console.log(err);
    })
 }

 exports.getAddProduct = (req, res, next)=>{ // sadece get için çalışır.
    // res.sendFile(path.join(__dirname, '../', 'views', 'add-product.html'));

    Category.findAll()
    .then((categories)=>{
        res.render('admin/add-product', {title:'New Product',categories: categories ,path : '/admin/add-product'});
    })


}

exports.postAddProduct = (req, res, next)=>{ //app.post yapmamızın sebebi içine bişey geldiğinde çalışmasını sağlamak.
    //data base kayıt.
    const name = req.body.name;
    const price = req.body.price;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    const categoryid = req.body.categoryid;
    const user = req.user; // bunu middleware ile yapmıştık id yi almıştık.

    user.createProduct({
        name: name,
        price: price,
        imageUrl: imageUrl,
        description: description,
        categoryId: categoryid,
    })
    .then(result =>{
        res.redirect('/');
    })
    .catch(err =>{
        console.log(err);
    })
}

exports.getEditProduct = (req, res, next)=>{ // sadece get için çalışır.
    // res.sendFile(path.join(__dirname, '../', 'views', 'add-product.html'));
    Product.findByPk(req.params.productid)
        .then((product)=>{
            if(!product) {
                return res.redirect('/');
            }
            Category.findAll()
            .then((categories)=>{
                res.render('admin/edit-product', {title:'Edit Product',categories: categories, path : '/admin/products', product: product});
            })
            .catch((err)=>{
                console.log(err);            
            });
        })
        .catch((err) =>{
            console.log(err);
        });
    
}

exports.postEditProduct = (req, res, next)=>{ //app.post yapmamızın sebebi içine bişey geldiğinde çalışmasını sağlamak.
    const id = req.body.id;
    const name = req.body.name;
    const price = req.body.price;
    const description = req.body.description;
    const imageUrl = req.body.imageUrl;
    const categoryid = req.body.categoryid;
    
    Product.findByPk(id)
        .then(product =>{
            product.name = name;
            product.price = price;
            product.imageUrl = imageUrl;
            product.description = description;
            product.categoryId = categoryid;
            return product.save()// direk güncellenmeyi sağlar

        })
        .then(result =>{
            console.log('update');
            res.redirect('/admin/products?action=edit'); // anasayfaya yönlendir.
        }) // return kullanarak save in promisini burada yapıyoruz ortak
        .catch(err => console.log(err));
}

exports.postDeleteProduct = (req, res, next) => {

    const id = req.body.productid;

    Product.destroy({where: {id : id }}) // gelen ile olan id eşleşirse siler.
        .then(() =>{
            res.redirect('/admin/products?action=delete');

        })
        .catch(err => {
            console.log(err);
        });    
}