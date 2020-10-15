const express = require(`express`);
const router = express.Router();
const { check, validationResult, oneOf } = require('express-validator');
const service = require(`../service/quotations`);
const auth = require(`../middleware/auth`);

// Create a new quotation
// POST method
// input JSON   quotation_id,
//              university_name,
//              number_of_students,
//              number_of_teachers,
//              number_of_employees,contact_number
router.post(
  '/',[auth,
    [
      check('quotation_id', 'Not a valid quotation ID')
        .isInt()
        .isLength({ max: 10 })
        .not()
        .isEmpty(),
      check('university_name', 'Not a valid universty name')
        .isString()
        .isLength({ max: 256 })
        .not()
        .isEmpty(),
      check('number_of_students', 'Not a valid number of students')
        .isInt()
        .isLength({ max: 4 })
        .not()
        .isEmpty(),
      check('number_of_teachers', 'Not a valid number of teachers')
        .isInt()
        .isLength({ max: 4 })
        .not()
        .isEmpty(),
      check('number_of_employees', 'Not a valid number of employees')
        .isInt()
        .isLength({ max: 4 })
        .not()
        .isEmpty(),
      check('contact_number', 'Not a valid contact number')
        .isInt()
        .isLength({ max: 4 })
        .not()
        .isEmpty(),
    ],
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: errors.array(),
      });
    }
    const {
      quotation_id,
      university_name,
      number_of_students,
      number_of_teachers,
      number_of_employees,
      contact_number,
    } = req.body;
    service
      .createQuotation(
        quotation_id,
        university_name,
        number_of_students,
        number_of_teachers,
        number_of_employees,
        contact_number
      )
      .then(data => {
        res.status(data.status).json(data);
        console.log(data);
      })
      .catch(err => {
        res.status(err.status).json(err);
        console.log(err);
      });
  }
);

// Read an entry using quotation id from URL
// GET method
// URL '.../quotation_id'
router.get(
  '/:id',
  [auth, [check('id', 'Not a valid   bn quotation_id').isInt().isLength({ max: 10 })],],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: errors.array(),
      });
    }
    const quotation_id = req.params.id;
    service
      .readQuotation(quotation_id)
      .then(data => {
        res.status(data.status).json(data);
        console.log(data);
      })
      .catch(err => {
        res.status(err.status).json(err);
        console.log(err);
      });
  }
);

// Read all entries
// GET method
router.get('/', auth, (req, res) => {
  service
    .readAllQuotation()
    .then(data => {
      res.status(data.status).json(data);
      console.log(data);
    })
    .catch(err => {
      res.status(err.status).json(err);
      console.log(err);
    });
});

// Update
// PUT method
// input JSON   id, (quatation_id)
//              field, (name of the column that is to be updated)
//              value (new value of the field)
router.put(
  '/',[auth, [
  check('id', 'Not a valid quotation_id').isInt().isLength({ max: 10 })],
  oneOf([
    [
      check('field').equals('university_name'),
      check('value', 'Not a valid university name')
        .isString()
        .isLength({ max: 256 })
        .not()
        .isEmpty(),
    ],
    [
      check('field').equals('number_of_students'),
      check('value', 'Not a valid number of students')
        .isInt()
        .isLength({ max: 4 })
        .not()
        .isEmpty(),
    ],
    [
      check('field').equals('number_of_teachers'),
      check('value', 'Not a valid number of teachers')
        .isInt()
        .isLength({ max: 4 })
        .not()
        .isEmpty(),
    ],
    [
      check('field').equals('number_of_employees'),
      check('value', 'Not a valid number of employees')
        .isInt()
        .isLength({ max: 4 })
        .not()
        .isEmpty(),
    ],
    [
      check('field').equals('contact_number'),
      check('value', 'Not a valid contact number')
        .isInt()
        .isLength({ max: 4 })
        .not()
        .isEmpty(),
    ],
  ])
],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: errors.array(),
      });
    }
    const quotation_id = req.body.id;
    const field = req.body.field;
    const value = req.body.value;
    service
      .updateQuotation(quotation_id, field, value)
      .then(data => {
        res.status(data.status).json(data);
        console.log(data);
      })
      .catch(err => {
        res.status(err.status).json(err);
        console.log(err);
      });
  }
);

// Delete a quotation using quotation_id from URL
// DELETE method
// URL '.../quotation_id'
router.delete(
  '/:id',[auth, [
    check('id', 'Not a valid quotation_id').isInt().isLength({ max: 10 })
  ]],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: errors.array(),
      });
    }
    const quotation_id = req.params.id;
    service
      .deleteQuotation(quotation_id)
      .then(data => {
        res.status(data.status).json(data);
        console.log(data);
      })
      .catch(err => {
        res.status(err.status).json(err);
        console.log(err);
      });
  }
);

module.exports = router;
