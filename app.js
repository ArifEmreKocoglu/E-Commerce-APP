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
const adminRoutes = require('./routes/admin.js');
const userRoutes = require('./routes/shop.js');
const path = require('path');
const errorController = require('./controllers/errors')
app.use(bodyParser.urlencoded({extended: false})); // body-parser post datasının obje olarak yakalamamızı sağlar.
app.use(express.static(path.join(__dirname, 'public'))); // dosyaları dışarı açmak için ÖNEMLİ FOTO VE CSS İN WEBE AÇILMASINI SAĞLAR
//ROUTES
app.use('/admin', adminRoutes);
app.use(userRoutes);

app.use(errorController.get404Page);
// app.get('/add-product', (req, res, next)=>{ // sadece get için çalışır. ADİMN SAYFASINA ATTIK.
//     res.send(`
//         <html>
//             <head><title> add a new product</title></head>
//             <body>
//                 <form action="/product" method="POST">
//                     <input type="text" name="productName">
//                     <input type="submit" name="Save Product">
//                 </form>
//             </body>
//         </html>
//     `); // res hem sonlanır hemde içerik yazılabilir.
// });

// app.post('/product', (req, res, next)=>{ //app.post yapmamızın sebebi içine bişey geldiğinde çalışmasını sağlamak.
//     //data base kayıt.
//     console.log(req.body);
    
//     res.redirect('/'); // anasayfaya yönlendir.
// });

// app.get('/', (req, res, next)=>{ // USER SAYFASINA ATTIM
//     res.send('<h1> Hello from express.js </h1>'); // res hem sonlanır hemde içerik yazılabilir.
// });

app.listen(3000, ()=>{
    console.log('Listening on port 3000');
});
