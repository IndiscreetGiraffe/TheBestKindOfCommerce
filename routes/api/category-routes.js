const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  Category.findAll({
    attributes: [
      'id',
      'category_name'
    ],
    include: [{
// be sure to include its associated Products
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
    }]
  })
  .then(categoryData => {
    if (!categoryData) {
      res.status(400).json({ message: "We didn't find anything" });
      return;
    }
    res.json(categoryData);
  })
  .catch(err => {
    res.status(500).json({ message: "Whoopsie Daisy, something went wrong"})
  });
  
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  Category.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'category_name'
    ],
// be sure to include its associated Products
    include: [{
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
    }]
  })
  .then(categoryData => {
    if (!categoryData) {
      res.status(404).json({ message: "Sorry, nothing found with this ID"});
      return;
    }
    res.json(categoryData);
  })
  .catch(err => {
    res.status(500).json({ message: "So sorry, nothing here"})
  });
  
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name
  })
  .then(categoryData => res.json(categoryData))
  .catch(err => {
    res.status(500).json({ message: "ERROR ERROR ERROR"});
  });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update({
    category_name: req.body.category_name
  },
  {
    where: {
      id: req.params.id
    }
  }
  )
  .then(categoryData => res.json({ message: "This category had been updated! Go you!"}));
  .catch(err => {
    res.status(404).json({ message: "No category found with this ID, please try again."});
  });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
