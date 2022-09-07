const cancelImage = document.querySelector(".cancel-image");
const productCategoryName = document.querySelector(".product-category-name");
const productCategoryInfo = document.querySelector(".product-category-info");
const productCategoryImage = document.querySelector(".product-category-image");
const productNumberLocationInfo = document.querySelector(".product-number-location-info");

let productCategories = document.querySelectorAll(".product-category");

let modelMap = new Map();

loadModelCategory();

cancelImage.onclick = cancelPopup;

function loadModelCategory() {
    $.ajax({
        async: false,
        type: "get",
        url: "/api/v1/product/list/model/number/info",
        dataType: "json",
        success: (response) => {
            if(response.data != null) {
                setModel(response.data);
                productCategories[0].click();
            }
        },
        error: errorMessage
    });
}

function setModel(modelList) {
    const productCategoryUl = document.querySelector(".product-category-ul");
    
    for(model of modelList) {
        let modelInfoObject = {};
        let modelImageList = new Array();

        model = getCategoryInfo(model);
        productCategoryUl.innerHTML += `
        <li class="product-category model-${model[0].modelCode}">
            <span>${model[0].modelName}</span>
        </li>
        `;

        modelInfoObject.modelName = model[0].modelName;
        modelInfoObject.modelNumberInfo = model[0].modelNumberInfo;
        modelInfoObject.modelNumberInfoDetail = model[0].modelNumberInfoDetail;


        
        model.forEach(model => {
            modelImageList.push(model.modelImageName);
        })
        
        modelInfoObject.modelImageList = modelImageList;
        
        modelMap.set("model" + model[0].modelCode, modelInfoObject);

        console.log(modelMap.get("model" + model[0].modelCode));
        console.log(modelInfoObject);
    }

    setCategoryClickEvent();

}

function setCategoryClickEvent() {
    productCategories = document.querySelectorAll(".product-category");
    
    productCategories.forEach(category => {
        category.onclick = () => {

            removeSelectCategoryClass(productCategories);
            addSelectCategoryClass(category);

            let modelCode = category.classList.item(1).substring(category.classList.item(1).lastIndexOf("-") + 1);

            console.log(category.classList.item(1));
            console.log(modelCode);
            let modelInfo = modelMap.get("model" + modelCode);
        
            productCategoryName.innerHTML = `<span>${modelInfo.modelName}</span>`;
            productCategoryInfo.innerHTML = `<textarea>${modelInfo.modelNumberInfo}</textarea>`;
            
            clearDomObject(productCategoryImage);

            modelInfo.modelImageList.forEach(image => {
                productCategoryImage.innerHTML += `
                <div>
                    <img src="/image/model-number-images/${image}" alt="${modelInfo.modelName}">
                </div>`;
            });
            
            productNumberLocationInfo.innerHTML = `<p class="important-p">${modelInfo.modelNumberInfoDetail}</p>`;
        }
    });

}

function addSelectCategoryClass(category) {
    category.classList.add("select-category");
}

function removeSelectCategoryClass(productCategories) {
    productCategories.forEach(category => category.classList.remove("select-category"))
}

function getCategoryInfo(modelList) {
    return modelList.productNumberInfoObjectDtoList;
}

function clearDomObject(domObject) {
    domObject.innerHTML = "";
}

function errorMessage(request, status, error) {
    alert("요청중에 오류가 발생했습니다.");
    console.log(request.status);
    console.log(request.responseText);
    console.log(error);
}