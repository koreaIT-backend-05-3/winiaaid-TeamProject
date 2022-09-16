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
const wrapper = document.querySelector('.slide-wrapper')
const item = document.querySelector('.item')
const item2 = document.querySelector('.item2');
const prevButton = document.querySelector(".slide-button-prev")
const nextButton = document.querySelector(".slide-button-next")
let currentIndex = 0;
const items = [
    {
        type: "kimchi-fridge",
        name: "뚜껑형",
        img: "/static/images/category1_1.jpg"
    },
    {
        type: "kimchi-fridge",
        name: "스탠드형",
        img: "/static/images/category1_2.jpg"
    },
    {
        type: "air-contidioner",
        name: "스탠드에어컨",
        img: "/static/images/category2_1.jpg"
    },
    {
        type: "air-contidioner",
        name: "벽걸이에어컨",
        img: "/static/images/category2_2.jpg"
    },
    {
        type: "air-contidioner",
        name: "천장형에어컨",
        img: "/static/images/category2_3.jpg"
    },
    {
        type: "air-contidioner",
        name: "이동형에어컨",
        img: "/static/images/category2_4.jpg"
    },
    {
        type: "air-contidioner",
        name: "창문형에어컨",
        img: "/static/images/category2_5.jpg"
    },
    {
        type: "rice-cooker",
        name: "딤채쿡",
        img: "/static/images/category3_1.png"
    },
    {
        type: "kitchen-appliances",
        name: "김치냉장고",
        img: "/static/images/category1_1.jpg"
    },
    {
        type: "kitchen-appliances",
        name: "냉장고",
        img: "/static/images/category4_2.jpg"
    },
    {
        type: "kitchen-appliances",
        name: "전기밥솥",
        img: "/static/images/category3_1.png"
    },
    {
        type: "kitchen-appliances",
        name: "전기레인지",
        img: "/static/images/category4_4.jpg"
    },
    {
        type: "kitchen-appliances",
        name: "전자레인지/오븐",
        img: "/static/images/category4_5.png"
    },
    {
        type: "kitchen-appliances",
        name: "에어프라이어",
        img: "/static/images/category4_6.jpg"
    },
    {
        type: "kitchen-appliances",
        name: "정수기",
        img: "/static/images/category4_7.jpg"
    },
    {
        type: "kitchen-appliances",
        name: "식기세척기",
        img: "/static/images/category4_8.jpg"
    },
    {
        type: "kitchen-appliances",
        name: "전기주전자",
        img: "/static/images/category4_9.jpg"
    },
    {
        type: "kitchen-appliances",
        name: "뉴트리불렛",
        img: "/static/images/category4_10.jpg"
    },
    {
        type: "household-appliances",
        name: "에어컨",
        img: "/static/images/category2_1.jpg"
    },
    {
        type: "household-appliances",
        name: "에어워셔/스포워셔",
        img: "/static/images/category5_2.jpg"
    },
    {
        type: "household-appliances",
        name: "제습기",
        img: "/static/images/category5_3.jpg"
    },
    {
        type: "household-appliances",
        name: "공기청정기",
        img: "/static/images/category5_4.png"
    },
    {
        type: "household-appliances",
        name: "세탁기/건조기",
        img: "/static/images/category5_5.jpg"
    },
    {
        type: "household-appliances",
        name: "비데",
        img: "/static/images/category5_6.jpg"
    },
    {
        type: "household-appliances",
        name: "눈마사지기(서비스접수불가제품)",
        img: "/static/images/category5_7.jpg"
    },
    {
        type: "household-appliances",
        name: "TV",
        img: "/static/images/category5_8.jpg"
    },
    {
        type: "household-appliances",
        name: "온풍기",
        img: "/static/images/category5_9.jpg"
    },
    {
        type: "household-appliances",
        name: "샤워기/청소기/멀티드라이어",
        img: "/static/images/category5_10.jpg"
    }
];

for(let categoryButton of categoryButtons){
    categoryButton.onclick = (e) => {
        const itemViews = items.filter(item => item.type == e.target.classList[0]);

        if(!e.target.classList.contains('on')){
            for(let i = 0; i < categoryButtons.length; i++){
                categoryButtons[i].classList.remove('on')
                categoryItemSlide.classList.add('show');
            }
        }else{
            categoryItemSlide.classList.remove('show');
        }
        categoryButton.classList.toggle('on');

        wrapper.style.left = '0';
        currentIndex = 0;
        item.classList.remove('haspage2');
        prevButton.classList.add('visible')
        nextButton.classList.add('visible', 'on')
        prevButton.classList.remove('on')
        item.innerHTML = ``;
        item2.innerHTML = ``;
        if(itemViews.length < 8){
            for(let i = 0; i < itemViews.length; i++){
                item.innerHTML += `
                    <button type="button">
                        <span class="item-image"><img src="${itemViews[i].img}"></span>
                        ${itemViews[i].name}
                    </button>
                `
            }
        }else{
            item.classList.add('haspage2')
            prevButton.classList.remove('visible')
            nextButton.classList.remove('visible')
            for(let i = 0; i < 8; i++){
                item.innerHTML += `
                    <button type="button">
                        <span class="item-image"><img src="${itemViews[i].img}"></span>
                        ${itemViews[i].name}
                    </button>
                `
            }
            for(let i = 8; i < itemViews.length; i++) {
                item2.innerHTML += `
                    <button type="button">
                        <span class="item-image"><img src="${itemViews[i].img}"></span>
                        ${itemViews[i].name}
                    </button>
                `
            }
        }

    }
}

nextButton.onclick = () => {
    nextButton.classList.toggle('on')
    prevButton.classList.toggle('on')
    if(currentIndex < 1){
        currentIndex++;
    }else{
        currentIndex = 0;
    }
    wrapper.style.left = -1400 * currentIndex + "px";
}

prevButton.onclick = () => {
    nextButton.classList.toggle('on')
    prevButton.classList.toggle('on')
    if(currentIndex > 0){
        currentIndex--;
    }else{
        currentIndex = 1;
    }
    wrapper.style.left = -1400 * currentIndex + "px";
}


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