const input = document.getElementById('list__input');
const output = document.getElementById('list');
const select = document.getElementById('select');
const btn = document.getElementById('submit__btn');

const list = [];

function outputTag(item){
    
    const tag = `
        <span id="item__tag" class="form__tag">${item} <i class="fa-solid fa-xmark"></i></span>
    `;

    output.insertAdjacentHTML('afterbegin', tag);    
}

select.addEventListener('change', function(e){
    const val = e.target.value;
    console.log(val);
    list.push(val);
    outputTag(val);
    input.value = "";
});

output.addEventListener('click', function(e){
    
    e.target.parentNode.addEventListener('click', function(){
        const val = e.target.parentNode.textContent;
        const result = val.trim();
        console.log("val ", result);
        let index = list.findIndex(el => el === result);
        list.splice(index, 1);    
        
        const tag = e.target.parentElement.nodeName;
        console.log("event ", tag);
        if (tag === 'SPAN'){
            this.remove();
        }
    }); 
  

}, true);

$('#submit__btn').on('click', function(){
    let tbody = $('#tbody');
    let form = $('#form');
 
    input.value = list;
    console.log(input.value);

    $.ajax({
        type:'POST',
        url:form.attr('action'),
        data:form.serialize(),
        success:function(data){
            console.log(data);
            tbody.empty();
            for (let bug of data.data.bugs){
                tbody.append(getHtml(bug));
            }
            window.stop();
        },
        error:function(){
            alert("Some error");
        }
    });

    input.value = "";
});


function getHtml(data){
    return $(`
        <tr>
            <td>${data.title}</td>
            <td>${data.description} </td>
            <td>${data.author}</td>
            <td>
            <div class="tag-container">
            <div class="tag">
                    <span>${data.label}</span>
                </div>
            </div>
            </td>
            <td><button><a href="#">SHOW MORE</a></button></td>
        </tr>
    `)
}




