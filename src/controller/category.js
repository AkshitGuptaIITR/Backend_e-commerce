const Category = require("../models/category");
const slugify = require('slugify');

function createCategories(categories, parentID = null) {

    const categoryList = [];
    let category;
    if (parentID == null) {
        category = categories.filter(cat => cat.parentID == undefined);
    }
    else {
        category = categories.filter(cat => cat.parentID == parentID);
    }

    //Syntax of the for loop is
    //for(variable in array){
    //     variable use 
    //     and It will itself work as the loop in the array
    // }

    //First of all the categories is being collected and then being push in the category array

    for (let cate of category) {
        categoryList.push({
            _id: cate._id,
            name: cate.name,
            slug: cate.slug,
            children: createCategories(categories, cate._id)
        });
    }

    return categoryList;
}

exports.addCategory = (req, res) => {

    let categoryURL;

    const categoryObj = {
        name: req.body.name,
        slug: slugify(req.body.name)
    }
    if (req.file) {
        categoryURL = process.env.API + "/public/" + req.file.filename;
        categoryObj.categoryImage = categoryURL;
    }

    if (req.body.parentID) {
        categoryObj.parentID = req.body.parentID;
    }

    const cat = new Category(categoryObj);
    cat.save((error, category) => {
        if (error) {
            return res.status(400).json({ message: error });
        }
        if (category) {
            return res.status(201).json({ category });
        }
    })
}

exports.getCategory = (req, res) => {
    Category.find({})
        .exec((error, categories) => {
            if (error) {
                return res.status(400).json({ error });
            }
            if (categories) {

                // console.log(categories)

                const categoryList = createCategories(categories);

                // console.log(categoryList)

                return res.status(200).json({ categoryList });
            }
        })
}