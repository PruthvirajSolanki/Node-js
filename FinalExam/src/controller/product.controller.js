const Product = require('../models/productmodels');
const fs = require("fs");
const path = require("path");

exports.addProduct = async (req, res) => {
    try {

        const existingProduct = await Product.findOne({ name: req.body.name });
        if (existingProduct) {
            return res.json({ status: 400, message: 'Product already exists!' });
        }

        if (!req.body) {
            return res.json({ status: 400, message: 'All fields are required' });
        }

        let imagePath = "";
        if (req.file) {
            imagePath = `/uploads/${req.file.filename}`;
        }

        await Product.create({
            ...req.body,
            image: imagePath,
        });

        return res.json({ statu: 200, message: 'Product added successfully!' });

    } catch (error) {
        console.error(error);
        return res.json({ status: 500, message: "Something went wrong" });
    }
};

exports.EditProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findById(id);
        if (!product) {
            return res.json({ status: 404, message: "Product not found" });
        }

        if (req.file) {
            if (product.image) {
                const oldImagePath = path.join(__dirname, "..", product.image);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }
            image = `/uploads/${req.file.filename}`;
        }

        await Product.findByIdAndUpdate(id, { ...req.body, image }, { new: true });

        return res.json({ status: 200, message: "Product updated successfully!", });
    } catch (error) {
        console.error(error);
        return res.json({ status: 500, message: "Something went wrong" });
    }
};

exports.DeleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findById(id);
        if (!product) {
            return res.json({ status: 404, message: "Product not found" });
        }

        if (product.image) {
            const imagePath = path.join(__dirname, "..", product.image.replace(/^\//, ""));
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        await Product.findByIdAndDelete(id);
        return res.json({ status: 200, message: "Product deleted successfully!" });

    } catch (error) {
        console.error(error);
        return res.json({ status: 500, message: "Something went wrong" });
    }
};

exports.Viewallproduct = async (req, res) => {
    try {
        
        const products = await Product.find();

        if (products.length === 0) {
            return res.json({ status: 404, message: "No products found" });
        }
        return res.json({ status: 200, message: "All products fetched successfully!", products });

    } catch (error) {
        console.error(error);
        return res.json({ status: 500, message: "Something went wrong" });
    }
};