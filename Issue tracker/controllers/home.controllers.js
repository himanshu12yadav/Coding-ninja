const Project = require('../models/project.models');
const Bug = require('../models/bug.models');
const Label = require('../models/label.models');

module.exports.index = async function(req, res){
    const lists = await Project.find({});

    return res.render('index',{
        title:'Issue Tracker',
        lists:lists
    });
}

module.exports.getDetails = async function(req, res){
    try{
        const bugs = await Bug.find({project:req.query.id});
        const label = await Label.find({});
        console.log(label);
        return res.render('detail_page',{
            title:'Detail Page',
            bugs:bugs,
            project_id:req.query.id,
            labels:label
        });

    }catch(e){
        console.error(e);
    }
}

module.exports.getSearchResult = async function(req, res){
    try{
        if (req.xhr){
            const arr = req.body.label.split(',');
            const bugs = await Bug.find({project:req.query.search}).or([
                {title:req.body.title},
                {author:req.body.author},
                {description:req.body.description},
                {label:{$in:arr}}
            ]);   
            
            return res.status(200).json({
                data:{
                    bugs:bugs
                }
            });
    }
      
    }catch(e){
        console.error(e);
    }
}
