const express = require ('express');

const {getTodos, getTodo,createTodo,updateTodo,deleteTodo} = require('../controllers/todo')

const router = express.Router();
const {protect} = require("../middleware/auth")

router.route('/').get(protect,getTodos).post(protect,createTodo);

router.route('/:id').put(protect,updateTodo).delete(protect,deleteTodo)




module.exports = router;