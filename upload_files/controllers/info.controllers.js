const csv = require('csv-parser');
const upload = require('../models/upload.models');
const fs = require('fs');
module.exports.index = async function(req, res){
    let query = req.query.list;
    const result = [];

        await upload.findOne({_id:req.params.file}).then(file =>{

            fs.createReadStream(`${file.path}`)
                .pipe(csv())
                .on('data', data=>{
                    result.push(data);
                }).on('end', function(){
                    const header = Object.keys(result[0]);
                    tableRows = result;
                    if (query !== "" && query){
                        console.log("services working");
                        tableRows = tableRows.filter(row =>{
                            console.log("row: ",row);
                            return Object.values(row).some((val)=>{
                                return val.toLowerCase() === query.toLowerCase();
                            })
                        });
                    }

                    if (req.xhr){
                        console.log("working");
                        return res.status(200).json({
                            data:{
                                tableRows,
                                header
                            }
                        });
                    }else{
                        return res.render('info',{
                            file:file,
                            result:tableRows,
                            header:header,
                        })
                    }
                }) 
        })
    }
   
