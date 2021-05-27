const Cart = require("../models/cart");
const user = require("../models/user");

exports.addItemToCart = (req, res) => {
    // console.log(req.user._id)
    Cart.findOne({ user: req.user._id })
        .exec((error, cart) => {
            if (error) {
                return res.status(400).json({ error });
            }
            if (cart) {
                //The code is wriiten two times can be avoided using the variable 
                //which will reduce the code.

                //If cart already exists then update the cart by quantity
                const product = req.body.cartItems.product;
                const isItemAdded = cart.cartItems.find(c => c.product == product);
                // console.log(product);

                if (isItemAdded) {
                    //No errors
                    // .$ will add the item to the respective obect only
                    // console.log(product);

                    Cart.findOneAndUpdate({ "user": req.user._id, "cartItems.product": product }, {
                        "$set": {
                            "cartItems.$": {
                                ...req.body.cartItems,
                                quantity: isItemAdded.quantity + req.body.cartItems.quantity
                            }
                        }
                    })
                        .exec((error, cart1) => {
                            // console.log(product);

                            if (error) {
                                // console.log(product);

                                return res.status(400).json({ error });

                            }
                            if (cart1) {
                                // console.log(product);
                                return res.status(201).json({ cart: cart1 });
                            }
                        })
                }


                else {

                    Cart.findOneAndUpdate({ user: req.user._id }, {
                        "$push": {
                            "cartItems": req.body.cartItems
                        }
                    })
                        .exec((error, cart1) => {
                            // console.log(product);

                            if (error) {
                                // console.log(product);

                                return res.status(400).json({ error });

                            }
                            if (cart1) {
                                // console.log(product);
                                return res.status(201).json({ cart: cart1 });
                            }
                        })
                };


            }

            else {
                //if cart not exists then create the new cart

                const cart = new Cart({
                    user: req.user._id,
                    cartItems: [req.body.cartItems]
                });

                // console.log(req.body.cartItems)

                cart.save((error, cart) => {
                    if (error) {
                        return res.status(400).json({ error });
                    }
                    if (cart) {
                        return res.status(201).json({ cart });
                    }
                })
            }
        })


};