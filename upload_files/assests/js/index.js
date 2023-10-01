
const search = document.getElementById('search');
const input = document.getElementById('search_input');
const form = $('#form_search');
const tbody = $('#table_csv');
const thead = $('#teable_csv_head');
const table = $('.table');
const view = $('#view');


input.addEventListener('input', function(e){

    if (this.value == ''){
        console.log(form.attr('action'));
        $.ajax({
            url:form.attr('action'),
            method:'GET',
            success:function({data}){
                console.log("Data: ", data.tableRows[0]);
                getHtml(data);  
            },
            error:function(err){
                console.log(err);
            } 
        })
    }

    if (this.value !== ''){
        $.ajax({
            url:`${form.attr('action')}?list=${this.value}`,
            method:'GET',
            success:function({data}){
                getHtml(data);
            },
            error:function(err){
                console.log(err);
            } 
        })
    }
});


function getHtml(data){
    tbody.empty();    
    for (let row of data.tableRows){
        let tr = document.createElement('tr');
        tbody.append(tr);
        for (let elem of data.header){
            let td = document.createElement('td');
            td.textContent = `${row[elem]}`
            tr.append(td);
        }
    }
}

