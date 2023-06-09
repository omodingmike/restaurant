// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

// MongoDB connection setup
mongoose.connect('mongodb://localhost:27017/restaurantDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const restaurantSchema = new mongoose.Schema({
    name: String,
    address: String,
    rating: Number,
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

// CRUD endpoints
app.get('/restaurants', async (req, res) => {
    try {
        let restaurants = await Restaurant.find();
        if (restaurants) {
            res.json(restaurants);
        } else {
            res.json("No data found");
        }
    } catch (error) {
        res.json(error);
    }

});

app.post('/restaurants/add', (req, res) => {
    const newRestaurant = new Restaurant(req.body);

    newRestaurant.save()
        .then(() => res.json('Restaurant added!'))
        .catch((err) => res.status(400).json(`Error: ${err}`));
});

app.get('/restaurants/:id', (req, res) => {
    Restaurant.findById(req.params.id, (err, restaurant) => {
        if (err) {
            console.log(err);
        } else {
            res.json(restaurant);
        }
    });
});

app.post('/restaurants/update/:id', (req, res) => {
    Restaurant.findById(req.params.id, (err, restaurant) => {
        if (!restaurant) {
            res.status(404).send('Data is not found');
        } else {
            restaurant.name = req.body.name;
            restaurant.address = req.body.address;
            restaurant.rating = req.body.rating;

            restaurant.save()
                .then(() => res.json('Restaurant updated!'))
                .catch((err) => res.status(400).json(`Error: ${err}`));
        }
    });
});

app.delete('/restaurants/:id', (req, res) => {
    try {
        const deleted = Restaurant.findByIdAndDelete(req.params.id);
        res.json('Restaurant deleted!');
        console.log(deleted);
    } catch (error) {
        console.log(error);
        res.json(error);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
