const bugInput = document.getElementById('bug__list');
const bugSelect = document.getElementById('select__bug');


bugSelect.addEventListener('change', function(e){
    if (bugInput.value == ""){
        bugInput.value = e.target.value;
    }else{
        bugInput.value += ',' + e.target.value;
    }

});