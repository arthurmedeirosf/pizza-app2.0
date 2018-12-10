const tax = 1.05
module.exports = {
	getTotal: function (qty, sizePrice, toppings, crustPrice) {
		toppingPrice = 0;

		if (toppings instanceof Array == false) {
			toppings = [toppings]
		}
		toppings.forEach(function (topping) {
			toppingPrice = toppingPrice + topping.split(':')[1] * 1;
		})

		total = ((qty * sizePrice) + toppingPrice * 1 + crustPrice * 1) * tax
		return total.toFixed(2);
	},

};