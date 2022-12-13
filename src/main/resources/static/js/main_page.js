/* Swiper-Slide */
const mainSlide = new Swiper('.main-slide', {
    direction:'horizontal',
    loop: true,
    slidesPerView : 1,
    speed: 700,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false
    },
    pagination: {
        el: ".swiper-pagination",
        clickable : true
      },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    },
    observer: true,
	observeParents: true
});

const partnerSlide = new Swiper('.partner-slide', {
    direction:'horizontal',
    loop: true,
    slidesPerView: 8,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    }
});

/* Search-Center */
const selectTitleButtons = document.querySelectorAll('.select-title button');
for(let titlebutton of selectTitleButtons){
    titlebutton.onclick = () => {
        for(let i = 0; i < selectTitleButtons.length; i++){
            selectTitleButtons[i].classList.remove('active');
        }
        titlebutton.classList.add('active');
    }
}

/* Category */
const categoryButtons = document.querySelectorAll('.category li button')
const categoryItemSlide = document.querySelector('.category-items-slide')
const wrapper = document.querySelector('.swiper2 .swiper-wrapper')
const prevButton = document.querySelector(".swiper2 .swiper-button-prev")
const nextButton = document.querySelector(".swiper2 .swiper-button-next")
let currentIndex = 0;


setMainCategoryProductList();


// nextButton.onclick = () => {
//     nextButton.classList.toggle('on')
//     prevButton.classList.toggle('on')
//     if(currentIndex < 1){
//         currentIndex++;
//     }else{
//         currentIndex = 0;
//     }
//     wrapper.style.left = -1400 * currentIndex + "px";
// }

// prevButton.onclick = () => {
//     nextButton.classList.toggle('on')
//     prevButton.classList.toggle('on')
//     if(currentIndex > 0){
//         currentIndex--;
//     }else{
//         currentIndex = 1;
//     }
//     wrapper.style.left = -1400 * currentIndex + "px";
// }


/* Notice - Event */
const boardTitle = document.querySelectorAll('.board-title button')
const boardPreview = document.querySelectorAll('.board-preview ul')
const moreButton = document.querySelectorAll('.more div')

for(let title of boardTitle){
    title.onclick = (e) => {
        const nodes = [...e.target.parentElement.children]
        const index = nodes.indexOf(e.target)

        for(let i = 0; i < boardTitle.length; i++){
            boardTitle[i].classList.remove('active')
            boardPreview[i].classList.remove('active')
            moreButton[i].classList.remove('active')
        }
        title.classList.add('active')
        boardPreview[index].classList.add('active');
        moreButton[index].classList.add('active');


    }
}

/* Go-Top */
const goGopButton = document.querySelector('.go-top')
goGopButton.onclick = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}


function setMainCategoryProductList() {
    const swiperWrapper = document.querySelector(".swiper1 .swiper-wrapper");
    const categoryInfoList = loadMainCategoryProductList();

    let totalPage = 0;
    let size = 0;

    totalPage = categoryInfoList.length % 5 == 0 ? categoryInfoList.length / 5 : Math.floor(categoryInfoList.length / 5) + 1;
    size = categoryInfoList.length;

    swiperWrapper.innerHTML = "";

    for(let i = 0; i < totalPage; i++) {
        let innerHTML = "";
        let startIndex = 5 * i;
        let endIndex = i == totalPage - 1 ? size : startIndex + 5;

        
        innerHTML += `<div class="swiper-slide">`;
        innerHTML += `<ul class="category-image-ul">`;
        
        for(startIndex; startIndex < endIndex; startIndex++) {
            innerHTML += `
                <li class="category-image-li">
                    <div>
                        <img src="/image/winiaaid-images/winia-product/category-images/${categoryInfoList[startIndex].productMainCategoryImage}" alt="${categoryInfoList[startIndex].productCategoryName}">
                    </div>
                </li>
                `;
        }
        
        innerHTML += `</ul></div>`;
        swiperWrapper.innerHTML += innerHTML;
    }

    makeCategorySwiper();
    setCategoryClickEvent(categoryInfoList);
}

function loadMainCategoryProductList() {
    let categoryInfoList = null;

    $.ajax({
        async: false,
        type: "get",
        url: `/api/v1/product/list/category/winia`,
        dataType: "json",
        success: (response) => {
            if(response.data != null) {
                categoryInfoList = response.data;
            }
        },
        error: (request, status, error) => {
            console.log(request.status);
            console.log(request.responseText);
            console.log(error);
        } 
    });

    return categoryInfoList;
}

function setCategoryClickEvent(categoryInfoList) {
    const categoryImageLiItems = document.querySelectorAll(".category-image-li");

    categoryImageLiItems.forEach((category, index) => {
        category.onclick = () => setProductDetailListByCategoryCode(categoryInfoList[index], index);
    })
}

function setProductDetailListByCategoryCode(category, index) {
    const categoryImageLiItems = document.querySelectorAll(".category-image-li");
    const slideButtonItems = document.querySelectorAll(".swiper2 .slide-div");
    const swiperWrapper = document.querySelector(".swiper2 .swiper-wrapper");

    const groupFlag = category.groupFlag;
    let productDetailList = null;

    if(!categoryImageLiItems[index].classList.contains("on")) {
        categoryImageLiItems.forEach(li => li.classList.remove("on"));
        categoryItemSlide.classList.add('show');

        removeVisibles(slideButtonItems);

    }else {
        categoryItemSlide.classList.remove('show');

        addVisibles(slideButtonItems);
    }
    
    categoryImageLiItems[index].classList.toggle('on');

    productDetailList = getProductDetailList(category);


    if(!groupFlag) {
        productDetailList = productDetailList[0].productDetailList;
    }


    let totalPage = 0;
    let size = 0;
    swiperWrapper.innerHTML = "";

    totalPage = productDetailList.length % 8 == 0 ? productDetailList.length / 8 : Math.floor(productDetailList.length / 8) + 1;
    size = productDetailList.length;

    for(let i = 0; i < totalPage; i++) {
        let innerHTML = "";
        let startIndex = 8 * i;
        let endIndex = i == totalPage - 1 ? size : startIndex + 8;

        
        innerHTML += `<div class="swiper-slide">`;
        innerHTML += `<ul class="product-image-ul">`;
        
        for(startIndex; startIndex < endIndex; startIndex++) {
            innerHTML += `
                <li class="product-image-li">
                    <div>
                        <img src="/image/winiaaid-images/winia-product/images/${groupFlag ? productDetailList[startIndex].productMainImage : productDetailList[startIndex].productDetailImage}" alt="${groupFlag ? productDetailList[startIndex].productCategoryName : productDetailList[startIndex].productDetailName}">
                    </div>
                </li>
                `;
        }
        
        innerHTML += `</ul></div>`;
        swiperWrapper.innerHTML += innerHTML;
    }

    makeProductSwiper();
}

function getProductDetailList(category) {
    let productDetailList = null;

    $.ajax({
        async: false,
        type: "get",
        url: `/api/v1/product/list/category/winia/${category.groupFlag ? 'group' : 'default'}/${category.groupFlag ? category.productGroupCode : category.productCategoryCode}`,
        dataType: "json",
        success: (response) => {
            productDetailList = response.data;
        },
        error: (request, status, error) => {
            console.log(request.status);
            console.log(request.responseText);
            console.log(error);
        }
    })

    return productDetailList;
}


function makeCategorySwiper() {
    const swiper1 = new Swiper(".swiper1", {
        slidesPerView: 1,
        spaceBetween: 300,
        allowTouchMove: false,
        navigation: {
            nextEl: '.swiper1 .swiper-button-next',
            prevEl: '.swiper1 .swiper-button-prev'
        }
    });
}

function makeProductSwiper() {
    const swiper2 = new Swiper(".swiper2", {
        slidesPerView: 1,
        spaceBetween: 100,
        allowTouchMove: false,
        navigation: {
            nextEl: '.swiper2 .swiper-button-next',
            prevEl: '.swiper2 .swiper-button-prev'
        }
    });
}

function addVisibles(domObjects) {
    domObjects.forEach(domObject => domObject.classList.add("visible"));
}

function removeVisibles(domObjects) {
    domObjects.forEach(domObject => domObject.classList.remove("visible"));
}