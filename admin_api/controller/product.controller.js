const Product = require('../model/product.model');

module.exports.allProduct = async function(req, res){
    await Product.find({}).then(products=>{
        if (products.length > 0){
            return res.status(200).json({
                products:products,
                message:'All product list'
            })
        }else{
            return res.status(400).json({
                message:'No Product'
            })
        }
    })
}

module.exports.create = async function(req, res){
    console.log(req.body);

    await Product.create({
        name:req.body.name,
        quantity:req.body.quantity        
    }).then(result=>{
        if (result){
            return res.status(200).json({
                data:result,
                message:'Created Successfully'       
            })
        }else{
            return res.status(400).json({
                message:'Error'
            })
        }
    });
}

module.exports.delete = async function(req, res){
    console.log(req.params.id);

    await Product.deleteOne({_id:req.params.id}).then(result =>{
        console.log(result);
        if (result){
            return res.status(200).json({
                message:'product deleted successfully.'  
              })
        }else{
            return res.status(400).json({
                message:'product not found'
            })
        }
    });
    
}

module.exports.update = async function(req, res){
    const product = await Product.findOneAndUpdate({_id:req.params.id},{quantity:req.query.quantity});
    if (product){
        product.save();
        return res.status(200).json({
            message:'Updated successfully'
        })
    }else{
        return res.status(502).json({
            message:'Updated unsuccessfully'
        })
    }    
} 


