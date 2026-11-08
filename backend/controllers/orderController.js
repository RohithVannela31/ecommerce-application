import Order from "../models/Order.js";
import Product from "../models/Product.js";

export const createOrder = async (req, res) => {
  try {
    const { products } = req.body;

    if (!products || products.length === 0)
      return res.status(400).json({ message: "No products provided" });

    let totalPrice = 0;
    let orderProducts = [];

    for (const item of products) {
      const product = await Product.findById(item.product);

      if (!product)
        return res.status(404).json({ message: "Product not found" });

      if (product.stock < item.quantity)
        return res.status(400).json({
          message: `Not enough stock for ${product.name}`,
        });

      totalPrice += product.price * item.quantity;

      product.stock -= item.quantity;
      await product.save();

      orderProducts.push({
        product: product._id,
        quantity: item.quantity,
      });
    }

    const order = await Order.create({
      user: req.user._id,
      products: orderProducts,
      totalPrice,
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id })
    .populate("products.product", "name price image")
    .sort({ createdAt: -1 });

  res.json(orders);
};

export const getAllOrders = async (req, res) => {
  const orders = await Order.find()
    .populate("user", "name email")
    .populate("products.product", "name price")
    .sort({ createdAt: -1 });

  res.json(orders);
};

export const updateOrderStatus = async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) return res.status(404).json({ message: "Order not found" });

  order.status = req.body.status || order.status;

  await order.save();

  res.json(order);
};
