const Bug = require('../models/bug.models');
const Label = require('../models/label.models');

module.exports.getBugPage = async function(req, res){
    const labels = await Label.find({});

    return res.render('create_bug',{
        title:'CREATE BUG',
        project_id:req.query.id,
        labels:labels
    })
}

module.exports.create = async function(req, res){
    let arr = req.body.labels.split(',');
    console.log(arr);

    await Bug.create({
        title:req.body.title,
        description:req.body.description,
        label:arr, 
        author:req.body.author,
        project:req.query.id
    });

    await Label.updateOne({},{
        $push:{label:arr}
    });

    return res.redirect(`/issue_tracker/detail_page?id=${req.query.id}`);
}