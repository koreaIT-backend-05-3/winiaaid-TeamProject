const searchModelButton = document.querySelector('.search-model')
const searchModelInputs = document.querySelector('.search-model-inputs')
const writeModel = document.querySelector('.write-model')
const searchButton = document.querySelector('.search-button')

searchModelButton.onclick = () => {
    searchModelInputs.style.visibility = 'visible';
}

writeModel.oninput = () => {
    setTimeout(function(){
        writeModel.value = writeModel.value.replace(/[^a-zA-Z0-9-()]/ig, '')
    }, 100)
}

writeModel.onkeypress = () => {
    if(window.event.keyCode == 13){
        searchButton.onclick();
    }
}

searchButton.onclick = () => {
    if(writeModel.value == ''){
        alert('검색하실 모델명을 입력해주세요.');
    }else if(writeModel.value.length < 2){
        alert('최소 2자리 이상 입력해 주세요.')
    }
}