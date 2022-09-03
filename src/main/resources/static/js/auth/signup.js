const MainMnLi = document.querySelectorAll('.main-mn');
const SubUl = document.querySelectorAll(".sub-ul");
const SubWrap = document.querySelector(".sub-wrap")
console.log(MainMnLi);

MainMnLi.addEventListener('mouseenter',function () {
    SubUl.fadeIn(300);
    SubWrap.fadeIn(300);
    console.log("mouseenter")
});
MainMnLi.addEventListener('mouseleave' , function () {
    SubUl.hide(300);
    SubWrap.hide(300);
});
