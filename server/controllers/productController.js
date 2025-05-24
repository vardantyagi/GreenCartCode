import { v2 as cloudinary } from 'cloudinary';
import Product from '../models/Product.js';

// add product: api/product/add
export const addProducts = async (req, res) => {
  try {
    let productData = JSON.parse(req.body.productData);

    const images = req.files;

    let imagesURL = await Promise.all(
      images.map(async (image) => {
        let result = await cloudinary.uploader.upload(image.path, { resource_type: 'image' });
        return result.secure_url;
      })
    )
    let product = await Product.create({ ...productData, image: imagesURL });
    console.log(product);
    res.json({ success: true, message: "Product Added" });
  } catch (e) {
    console.log('addProduct error:', e.message);
    res.json({ success: false, message: e.message });
  }
}

// get product: api/product/list
export const productList = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json({ success: true, products });
  } catch (e) {
    console.log('productList error:', e.message);
    res.json({ success: false, message: e.message });
  }
}

// get single product: api/product/id
export const productById = async (req, res) => {
  try {
    const { id } = req.body;
    const product = await Product.findById(id);
    res.json({ success: true, product });
  } catch (e) {
    console.log('productById error:', e.message);
    res.json({ success: false, message: e.message });
  }
}

// change product inStock: api/product/stock
export const changeStock = async (req, res) => {
  try {
    const { id, inStock } = req.body;
    const product = await Product.findByIdAndUpdate(id, { inStock: inStock },{new: true});
    console.log(product);
    res.json({ success: true, message: "Stock Updated" });
  } catch (e) {
    console.log('changeStock error:', e.message);
    res.json({ success: false, message: e.message });
  }
}

// edit product: api/product/edit

// edit listing

// module.exports.updateListing = async (req, res) => {
//     let { id } = req.params;
//     const { title, description, image, price, country, location } = req.body;

//     const ListingToBeUpdated = {
//       title,
//       description,
//       image,
//       price,
//       country,
//       location,
//     };
//     let listing = await Listing.findByIdAndUpdate(id, ListingToBeUpdated, {
//       runValidators: true,
//       new: true,
//     });

//     if(typeof req.file !== 'undefined'){
//       let url = req.file.path;
//       let filename = req.file.filename;
//       listing.image = {url,filename};
//       await listing.save();
//     }

//     req.flash("success", "Listing Updated Successfully!");
//     res.redirect(`/listings/${id}`);
//   }


// add new listing 

// let url = req.file.path;
//     let filename = req.file.filename;
    
//     const { title, description, image, price, country, location } = req.body;

//     const newListing = new Listing({
//       title,
//       description,
//       image,
//       price,
//       country,
//       location,
//     });

//     newListing.owner = req.user._id;
//     newListing.image = {url,filename};