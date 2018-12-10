var express = require('express');
var router = express.Router();
let Order = require('../models/orderModel');
let Data = require('../models/dataModel');
const priceCalculator = require('../PriceCalculator');

// Create Order
router.get('/create', function (req, res) {
	Data.find({}, function (err, data) {
		res.render(
			'order',
			{
				dataSize: [

					{
						"description": "Small",
						"price": 10
					},
					{
						"description": "Mediun",
						"price": 15
					},
					{
						"description": "Big",
						"price": 19
					},
					{
						"description": "Family",
						"price": 22
					}

				],

				dataToppings: [
					{
						"description": "Pepperoni",
						"price": 1
					},
					{
						"description": "Bacon",
						"price": 2
					},
					{
						"description": "Cheese",
						"price": 2
					},
					{
						"description": "Chicken",
						"price": 2
					},
					{
						"description": "Salsage",
						"price": 1
					},
					{
						"description": "Beef",
						"price": 2
					},
					{
						"description": "Ham",
						"price": 1
					},
					{
						"description": "Pepper",
						"price": 1
					},
					{
						"description": "Mushroom",
						"price": 1
					},
					{
						"description": "Onions",
						"price": 1
					},
					{
						"description": "Tomatoes",
						"price": 1
					},
					{
						"description": "Olives",
						"price": 1
					}
				],
				dataCrust: [
					{
						"description": "Stuffed Crust",
						"price": 4
					},
					{
						"description": "Thin & Crispy",
						"price": 2
					},
					{
						"description": "Homestyle Crust",
						"price": 3
					}

				]
			});
	});
});

// Confirm order
router.post('/confirm', function (req, res) {
	// Receiving data in the format

	top = req.body.toppings
	if (top instanceof Array == false) {
		top = [top]
	}
	// Remove price from the string
	toppingString = '';
	top.forEach(function (topping) {
		toppingString = toppingString + ' ' + topping.split(':')[0];
	})

	res.render(
		'confirmation',
		{
			address: req.body.address,
			phone: req.body.phone,
			qty: req.body.qty,
			size: req.body.size.split(':')[0],
			toppings: toppingString,
			crust: req.body.crust.split(':')[0],
			total: priceCalculator.getTotal(
				req.body.qty,
				req.body.size.split(':')[1],
				req.body.toppings,
				req.body.crust.split(':')[1]
			)
		}
	);
});

// Save orders
router.post('/', function (req, res) {
	data = {
		address: req.body.address,
		phone: req.body.phone,
		qty: 1,
		size: req.body.size,
		toppings: req.body.toppings,
		crust: req.body.crust,
		total: req.body.total,
	}

	var order = new Order(data);
	var error = order.validateSync();
	if (error) {
		res.status(500).json({ error: error.errors['phone'].message });

	} else {
		order.save(function (err) {
			if (err) {
				console.log('Error : ', err);
				res.status(500).json({ status: 'Failed to save the order' });
				return;
			}
			res.json({ status: 'Successfully added an order' });
		});
	}

});

// List orders
router.get('/', function (req, res, next) {
	search = {}

	// look for query parameter: orders?search=someThing
	if (req.query.search) {
		search = {

			$or: [{ address: { $regex: '.*' + req.query.search + '.*' } }, { phone: { $regex: '.*' + req.query.search + '.*' } }]
		}
	}


	Order.find(search, function (err, orders) {
		res.render('listOrders', { dataOrders: orders });
	}).limit(100);
});

module.exports = router;
