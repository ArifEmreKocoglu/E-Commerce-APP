const products = [
    {id: "13213", name: 'Samsung', price: '2000', imageUrl: 'yeni.jpeg', description: 'iyi telefon', categoryid: "1"},
    {id: "13214", name: 'Samsung s9', price: '2000', imageUrl: 'yeni.jpeg', description: 'iyi telefon', categoryid: "1"},
    {id: "13215", name: 'Samsung s8', price: '2000', imageUrl: 'yeni.jpeg', description: 'iyi telefon', categoryid: "1"},
    {id: "13216", name: 'Laptop', price: '2000', imageUrl: 'yeni.jpeg', description: 'iyi telefon', categoryid: "2"},
    {id: "13217", name: 'Mikrodalga', price: '2000', imageUrl: 'yeni.jpeg', description: 'iyi telefon', categoryid: "3"}
];

module.exports = class Product {
    constructor(name, price, imageUrl, description, categoryid){
        this.id = (Math.floor(Math.random()*99999)+1).toString();
        this.name = name;
        this.price = price;
        this.imageUrl = imageUrl;
        this.description = description;
        this.categoryid = categoryid;
    }
    saveProduct() {
        products.push(this);
    }
    static getAll() {
        return products;
    }

    static getById(id) {
        const product = products.find(i=>i.id === id); // find eşleşen ilk ürünü geriye döndürür
        return product;
    }
    static getProductsByCategoryId(categoryid){
        const product = products.filter(i=>i.categoryid === categoryid); // filter eşleşen bütün ürünleri geriye döndürür.
        return product;
    }

    static Update(product) {
        const index = products.findIndex(i=> i.id===product.id);

        products[index].name = product.name;
        products[index].price = product.price;
        products[index].imageUrl = product.imageUrl;
        products[index].description = product.description;
        products[index].categoryid = product.categoryid;
    }

    static DeleteById(id) {
        const index = products.findIndex(i=>i.id === id);
        products.splice(index,1);
    }
}