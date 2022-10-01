const MainMn = document.querySelector(".mn-ul");
const SubWrap = document.querySelector(".sub-wrap");
const SubUl = document.querySelectorAll("#gnb .sub-ul");

 MainMn.addEventListener('mouseover',function(){
        for(let i=0; i < SubUl.length; i++){
            SubUl[i].classList.add('on');
        } 
    SubWrap.classList.add('on')
    })

    MainMn.addEventListener('mouseout',function(){
        for(let i=0; i < SubUl.length; i++){
            SubUl[i].classList.remove('on')
        }
    SubWrap.classList.remove('on')
})