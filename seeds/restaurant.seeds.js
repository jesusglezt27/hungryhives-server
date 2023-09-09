const mongoose = require('mongoose');
const Restaurant = require('../models/Restaurant.model');

const MONGO_URI = "mongodb+srv://jesusglezt27:4nm1OiLcYWEztki9@mern-hungryhives.sjsmgoi.mongodb.net/?retryWrites=true&w=majority";

const restaurants = [
    {
        name: "La Moresca",
        owner: "Dylan Torres",
        stars: 8.6,
        reviews: "muy muy bueno",
        images: "https://media-cdn.tripadvisor.com/media/photo-s/12/f2/eb/03/salon.jpg"
    },
    {
        name: "Asador La Vaca Argentina",
        owner: "Felipe Reyes",
        stars: 8.8,
        reviews: "podría mejorar",
        images: "https://resizer.otstatic.com/v2/photos/wide-huge/1/25201504.jpg"
    },
    {
        name: "Loló",
        owner: "Gabriel Gutierrez",
        stars: 7.7,
        reviews: "excelente",
        images: "https://www.lologdl.mx/img/big/LoloGaleria_03.jpg"
    },
    {
        name: "Outback",
        owner: "Luis Gonzalez",
        stars: 7.7,
        reviews: "muy bueno",
        images: "https://media-cdn.tripadvisor.com/media/photo-s/0e/23/e8/dd/los-esperamos-en-centro.jpg",
    },
    {
        name: "Lupes BBQ",
        owner: "Veronica Santos",
        stars: 8.6,
        reviews: "un poco caro",
        images: "https://www.informador.mx/__export/1637346033966/sites/elinformador/img/2021/11/19/lupes_2_crop1637346033280.jpg_69363498.jpg",
    },
    {
        name: "Campomar",
        owner: "Emilio Cervantes",
        stars: 8.4,
        reviews: "Bastante bueno",
        images: "https://www.campomar.mx/assets/img/sucursales/P.1.webp"
    },
    { 
        name: "P.F Chang`s", 
        owner: "Sofia Verduzco", 
        stars: 9.6, 
        reviews: "muy caro",
        images: "https://monchitime.com/www/wp-content/uploads/2021/05/CL3A5557-b.jpg"
    }, 
    { 
        name: "La Pasteriasa", 
        owner: "Roberto Lopez", 
        stars: 8.3,  
        reviews: "Excelente servicio", 
        images: "https://guadalajaramidestino.com/wp-content/uploads/2018/04/85-LA-PASTERIA-PRINCIPAL.jpg"
    }, 
    { 
        name: "La Docena", 
        owner: "Fernando Sanchez", 
        stars: 8.8, 
        reviews: "muy buenos platillos", 
        images: "https://www.theworlds50best.com/discovery/filestore/jpg/LaDocena-MexicoCity-Mexico-01.jpg"
    }, 
    { 
        name: "Talento", 
        owner: "Eduardo Gonzalez", 
        stars: 9.2, 
        reviews: "Excelente lugar!",
        images: "https://resizer.otstatic.com/v2/photos/xlarge/4/42599015.jpg"
    },
];

mongoose
.connect(MONGO_URI)
.then(x => {
    console.log(`Connected to Mongo database: "${x.connections[0].name}"`);

    return Restaurant.insertMany(restaurants);
})
.then(restaurantFromDB => {
    console.log(`Created ${restaurantFromDB.length} restaurants`);

    return mongoose.connection.close();
})
.then(() => {
    console.log('DB connection closed!');
})
.catch(err => {
    console.log(`An error occurred while creating restaurants from the DB: ${err}`);
});
