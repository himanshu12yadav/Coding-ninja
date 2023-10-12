const Project = require('../models/project.models');

module.exports.createPage = function(req, res){
    return res.render('create_project',{
        title:'Create Project'
    });
}

module.exports.create = async function(req, res){
    const project = await Project.create({
        name:req.body.name,
        description:req.body.description,
        author:req.body.author
    });

    if (project){
        console.log("Project created successfully");
    }

    return res.redirect('/issue_tracker');
}