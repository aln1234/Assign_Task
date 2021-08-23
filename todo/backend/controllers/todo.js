const Todo = require('../models/Todo')

const ErrorResponse = require('../utils/errorResponse');


//@desc Get all Todos in
//@route GET/api//v1/todo
//@access Private
exports.getTodos = (async(req,res,next) => {
    req.body.user=req.user.id;


    
    try{
        const todo = await Todo.find({ user: req.user.id });
      

        res.status(200).json({
            sucess:true,
            data:todo
        })

    }
    catch (err) {
        res.status(400).json({success:false})

    }

})









//@desc Create Todos 
//@route GET/api//v1/todo
//@access Private
exports.createTodo = async (req,res,next) => {

    //Add use to the req,body

    req.body.user=req.user.id;

    

    try{
        const todo = await Todo.create(req.body);
       

        res.status(201).json({
            sucess:true,
            data:todo
          
        })

    }
    catch (err) {
        res.status(400).json({success:false})

    }

 


}

//@desc Get all Todos in
//@route GET/api//v1/todo/:id
//@access Private
exports.updateTodo = async (req,res,next) =>  {
    let todo = await Todo.findById(req.params.id);
  
    if (!todo) {
      return next(
        new ErrorResponse(`Todo not found with id of ${req.params.id}`, 404)
      );
    }
  

    todo = await Todo.findOneAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
  
    res.status(200).json({ success: true, data: todo });
  }


//@desc Get all Todos in
//@route GET/api//v1/todo/:id
//@access Private
exports.deleteTodo =async (req,res,next) => {
    const todo = await Todo.findById(req.params.id);
  
    if (!todo) {
      return next(
        new ErrorResponse(`Todo not found with id of ${req.params.id}`, 404)
      );
    }

  
    todo.remove();
  
    res.status(200).json({ success: true, data: {} });
  }