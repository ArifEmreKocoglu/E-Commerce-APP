/* ******************************EXPRESS BAŞLANGIÇ ********************************* */

// const express = require('express');
// const app = express(); // fonksyondan obje oluşturduk.

// app.get('/', (req,res)=>{
//     res.send('Hello world');
// });

// app.get('/api/products', (req,res)=>{
//     res.send('Ürünler yüklendi');
// });

// app.listen(3000, ()=>{
//     console.log('Listening on port 3000');
// });

/* ******************************MIDDLEWARE********************************* */

// const express = require('express');
// const app = express(); // fonksyondan obje oluşturduk.

// app.use((req, res, next)=>{
//     console.log("middleware 1 çalıştırıldı");
//     next(); //birinci middleware dan 2. ye geçirdik.
// });

// app.use((req, res, next)=>{
//     console.log("middleware 2 çalıştırıldı");
//     res.send('<h1> Hello from express.js </h1>'); // res hem sonlanır hemde içerik yazılabilir.
// });

// app.listen(3000, ()=>{
//     console.log('Listening on port 3000');
// });

/* ******************************Routing********************************* */ // yukarıdan aşağı kontrol eder.

// const express = require('express');
// const app = express(); // fonksyondan obje oluşturduk.

// app.use('/add-product', (req, res, next)=>{
//     res.send('<h1> adding product page </h1>'); // res hem sonlanır hemde içerik yazılabilir.
// });


// app.use('/', (req, res, next)=>{
//     res.send('<h1> Hello from express.js </h1>'); // res hem sonlanır hemde içerik yazılabilir.
// });

// app.listen(3000, ()=>{
//     console.log('Listening on port 3000');
// });

/* ******************************Body parser********************************* */

const express = require('express');
const app = express(); // fonksyondan obje oluşturduk.
const bodyParser = require('body-parser');

app.set('view engine', 'pug');
app.set('views', './views'); // pug dosyalarını views klasörüne atmaya yarar.

// const connection = require('./utility/database');

const adminRoutes = require('./routes/admin.js');
const userRoutes = require('./routes/shop.js');
const path = require('path');
const errorController = require('./controllers/errors');
const sequelize = require('./utility/database');
const Category = require('./models/category');
const Product = require('./models/product');
const User = require('./models/user');
const Cart= require('./models/cart');
const CartItem = require('./models/cartItem');
const Order= require('./models/Order');
const OrderItem = require('./models/OrderItem');


app.use(bodyParser.urlencoded({extended: false})); // body-parser post datasının obje olarak yakalamamızı sağlar.
app.use(express.static(path.join(__dirname, 'public'))); // dosyaları dışarı açmak için ÖNEMLİ FOTO VE CSS İN WEBE AÇILMASINI SAĞLAR
app.use((req,res,next)=>{
    User.findByPk(1)
        .then(user =>{
            req.user = user;
            next(); // uygulama burada kalmasın diye next diyoruz.
        })
        .catch(err =>{
            console.log(err);
        })
})


//ROUTES
app.use('/admin', adminRoutes);
app.use(userRoutes);

// connection.execute('SELECT * FROM products') // data base deki bütün ögeleri bana getir demek
//     .then((result) => {
//         console.log(result[0]);
        
//     }).catch((err) => {
//         console.log(err);
//     });

app.use(errorController.get404Page);


Product.belongsTo(Category, {
    foreignKey: {
        allowNull: false // categoryid ye özellik eklemiş olduk her ürünün categorisi olmak zorunda
    }
}); // etkileşimlerini sağlıyoruz
Category.hasMany(Product);

Product.belongsTo(User); // Product tablosuna user id ilişkisi olacak ve id eklenecek
User.hasMany(Product);


User.hasOne(Cart);
Cart.belongsTo(User);

Cart.belongsToMany(Product, {through: CartItem});
Product.belongsToMany(Cart, {through: CartItem});

Order.belongsTo(User); //bir order bir usera verilmiş olur.
User.hasMany(Order); // Bir usera birden fazla order verilmiş olabilir.

Order.belongsToMany(Product, {through: OrderItem});
Product.belongsToMany(Order, {through: OrderItem});

let _user;
sequelize
    //.sync({force: true})  // Force demek önce eski tabloyu sil sonra yeni yapıya göre tekrar oluştur    // tablo olarak data base aktarım yapar modelleri zaten oluşturmuştuk o modole göre yapar
    .sync()
    .then(()=>{
        
        User.findByPk(1)
            .then(user =>{
                if(!user){
                    User.create({name:'Arif EMRE', email:'arifemre23@hotmail.com' })
                }
                return user;
            }).then(user =>{
                _user = user;
                return user.getCart();
            }).then(cart =>{
                if(!cart) {
                    return _user.createCart(); 
                }
                return cart;
            }).then(() =>{
                Category.count()
                .then(count =>{
                    if(count === 0){  // sadece bir defa kategori eklemiş oluruz.
                        Category.bulkCreate([
                            {name: 'Telefon', description: 'telefon kategorisi'},
                            {name: 'Bilgisayar', description: 'Bilgisayar kategorisi'},
                            {name: 'Elektronik', description: 'Elektronik kategorisi'}
                        ]); // categori ekleme işlmeleri. 
                    }
                });
            }); 
    })
    .catch(err =>{
        console.log(err);
    });

app.listen(3000, ()=>{
    console.log('Listening on port 3000');
});
