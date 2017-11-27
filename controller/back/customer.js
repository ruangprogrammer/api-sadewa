const express = require('express');

const router = express.Router();

const query_customer = require('../../model/back/customer');

router.get('/', function (req, res) {
    //return 'tetd';//\
    res.send({ error: true, message: 'Login Sadewa Internasional customer saller' })
});


router.get('/login', function (req, res) {
    //return 'tetd';//\
    res.send({ error: true, message: 'Login Sadewa Internasional customer saller' })
});

router.get('/list', (req, res) => {

  query_customer.getAll().then(customer => {

    res.send({ status: true, text: 'Login Berhasil',data_customer: customer })


  });

});

/*
router.get('/:id', isValidId, (req, res, next) => {
  queries.getOne(req.params.id).then(sticker => {
    if(sticker) {
      res.json(sticker);
    } else {
      next();
    }
  });
});

router.post('/', (req, res, next) => {
  if(validSticker(req.body)) {
    queries.create(req.body).then(stickers => {
      res.json(stickers[0]);
    });
  } else {
    next(new Error('Invalid sticker'));
  }
});

router.put('/:id', isValidId, (req, res, next) => {
  if(validSticker(req.body)) {
    queries.update(req.params.id, req.body).then(stickers => {
      res.json(stickers[0]);
    });
  } else {
    next(new Error('Invalid sticker'));
  }
});

router.delete('/:id', isValidId, (req, res) => {
  queries.delete(req.params.id).then(() => {
    res.json({
      deleted: true
    });
  });
});
*/
module.exports = router;
