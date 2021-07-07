const Category = require('../../models/category');
const Product = require('../../models/product');

function createCategories(categories, parentID = null) {

    const categoryList = [];
    let category;

    if (parentID == null) {
        category = categories.filter(cat => cat.parentID == undefined);
    } else {
        category = categories.filter(cat => cat.parentID == parentID);
    }

    for (let cat of categories) {
        categoryList.push({
            _id: cat._id,
            name: cat.name,
            slug: cat.slug,
            parentID: cat.parentID,
            children: createCategories(categories, cat._id)
        });
    }

    return categoryList;
}

exports.initialData = async (req, res) => {

    const categories = await Category.find({}).exec();

    const products = await Product.find({})
        .select(('_id name slug price quantity description productPictures category'))
        .populate('category')
        .exec();

    res.status(200).json({
        categories: createCategories(categories),
        products
    });

}