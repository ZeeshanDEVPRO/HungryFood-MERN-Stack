const express = require('express');
const cors = require('cors');
require('./db/config');
const bcrypt = require('bcrypt');
const PORT = process.env.PORT || 5000;
const User = require('./db/User');
const Product = require('./db/Product');
const DummyProduct = require('./db/DummyProduct');
const Partner = require('./db/Partner');
const app = express();
const fileUpload = require('express-fileupload');
const cloudinary = require('cloudinary').v2;
require('dotenv').config()

cloudinary.config({
    cloud_name: "dlknzbptz",
    api_key:"258333159144375" ,
    api_secret:"k_t1t5GRkaWupsI50EYc4I7RLOw" 
});

const Jwt = require('jsonwebtoken');
const jwtkey = 'yummyfood';
app.use(express.json());
const corsOptions = {
    origin: 'https://hungry-food-mern-stack-g4mp.vercel.app',
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));


app.use(fileUpload({
    useTempFiles: true
}));



//signup api
app.post('/register', async (req, resp) => {
    try {
        let NewUser;
        if (req.body.type === "user") {
            NewUser = User;
        }
        else if (req.body.type === "partner") {
            NewUser = Partner;
        }
        else {
            return resp.status(400).send({ error: "Invalid user type" });
        }

        const user = new NewUser(req.body);

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(user.password, saltRounds);
        user.password = hashedPassword;

        let result = await user.save();
        result = result.toObject();
        delete result.password;
        Jwt.sign({ result }, jwtkey, { expiresIn: "2h" }, (err, token) => {
            if (err) {
                resp.send({ result: "something went wrong" })
            }
            resp.send({ result, auth: token });
        })
    }
    catch (error) {
        console.error(error);
        resp.status(500).send({ error: "Something went wrong" });
    }
});

//login api
app.post("/login", async (req, resp) => {
    try {
        if (!req.body.email || !req.body.password) {
            return resp.status(400).send({ error: "User and password are required" });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let fieldName;

        if (emailRegex.test(req.body.email)) {
            fieldName = 'email';
        }
        else {
            resp.status(401).send({ error: "Invalid email format" });
        }

        const [result1, result2] = await Promise.all([
            User.findOne({ [fieldName]: req.body.email }),
            Partner.findOne({ [fieldName]: req.body.email }),
        ]);

        let user;
        let NewUser;

        if (result1) {
            NewUser = User;
            user = result1;
        }
        else if (result2) {
            NewUser = Partner;
            user = result2;
        }
        else {
            return resp.status(401).send({ error: "Invalid user or password" });
        }

        const passwordMatch = await bcrypt.compare(req.body.password, user.password);
        if (!passwordMatch) {
            return resp.status(401).send({ error: "Invalid user or password" });
        }

        const token = Jwt.sign({ user }, jwtkey, { expiresIn: "2h" });

        resp.send({ user, auth: token });
    }
    catch (error) {
        console.error(error); 
        resp.status(500).send({ error: "Something went wrong" });
    }
});


//upload image along with product details
app.post('/upload', async (req, res) => {
    const file = req.files.photo;
    try {
        const result = await cloudinary.uploader.upload(file.tempFilePath);
        let Item;
        if (req.body.type === "product") {
            Item = Product;
        }
        else {
            Item = DummyProduct;
        }
        const newProduct = new Item({
            name: req.body.name,
            price: req.body.price,
            category: req.body.category,
            restaurant: req.body.restaurant,
            ratings: req.body.ratings,
            discount: req.body.discount,
            photo: result.url,
            type: req.body.type
        });
        await newProduct.save();
        res.status(200).send({ message: "Image uploaded and product created successfully" });
    } catch (error) {
        console.error("Error uploading image and creating product:", error);
        res.status(500).send({ message: "something went wrong" });
    }
});

//product listing api
app.get("/allproducts", async (req, resp) => {
    try {
        let Item;
        if (req.query.type === "product") {
            Item = Product;
        }
        else {
            Item = DummyProduct;
        }
        let products = await Item.find();     //finds all product
        if (products.length > 0) {
            resp.send(products);
        }
        else {
            resp.send({ result: "no products found" });
        }
    } catch (error) {
        console.error("Error fetching products:", error);
        resp.status(500).send({ error: "Something went wrong" });
    }
});

//search api
app.get("/search/:key", async (req, resp) => {
    let Item;
    if (req.query.type === "product") {
        Item = Product;
    }
    else {
        Item = DummyProduct;
    }
    let result = await Item.find({
        "$or": [
            { name: { $regex: req.params.key } },
            { ratings: { $regex: req.params.key } },         //can search in all listed fields
            { category: { $regex: req.params.key } },
            { price: { $regex: req.params.key } },
            { restaurant: { $regex: req.params.key } }
        ]
    });
    resp.send(result);
})


//delete api
app.delete("/delete/:id", async (req, resp) => {
    try {
        const product = await DummyProduct.findById(req.params.id);

        if (!product) {
            return resp.status(404).json({ message: "Product not found" });
        }

        const result = await DummyProduct.deleteOne({ _id: req.params.id });

        if (result.deletedCount > 0) {

            const imageUrl = product.photo;
            await cloudinary.uploader.destroy(imageUrl);

            resp.status(200).json({ message: "Product deleted successfully" });
        } else {
            resp.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        console.error(error);
        resp.status(500).json({ message: "Error deleting product" });
    }
});

//update api
app.put("/update/:id", async (req, res) => {
    try {
        const productId = req.params.id;
        const updateFields = req.body;

        const product = await DummyProduct.findById(productId);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        if (req.files && req.files.photo) {

            const result = await cloudinary.uploader.upload(req.files.photo.tempFilePath);
            await cloudinary.uploader.destroy(product.photo);

            updateFields.photo = result.url;         // Update the product with the new image URL
        }

        const updatedProduct = await DummyProduct.findByIdAndUpdate(productId, updateFields, { new: true });       // Update the product in the database

        if (updatedProduct) {
            res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    }
    catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ message: "Error updating product" });
    }
});

app.listen(PORT);