var productNameInput = document.getElementById("productName")
var productPriceInput = document.getElementById("productPrice")
var productCategoryInput = document.getElementById("productCategory")
var productDescInput = document.getElementById("productDesc")
var productImageInput = document.getElementById("productImage")
var searchInput = document.getElementById("searchInput")
var addBtn = document.getElementById("addBtn")
var updateBtn = document.getElementById("updateBtn")
var currentIndex; // for the function=> setForm and updateProduct
var regex = {
    productName : {
        value : /^[A-Z][a-z]{5,8}$/,
        isValid :false
    },
    productPrice : {
        value : /^([1-9][0-9]|100)$/,
        isValid : false
    },
    productCategory : {
        value : /^(laptop|TV|Electronics)$/i,
        isValid : false
    },
    productDesc : {
        value : /^[a-zA-Z0-9 ]{10,100}$/, 
        isValid :false
    }
}
addBtn.disabled = true

var containerProducts = []
if(localStorage.getItem("products") == null){
    containerProducts = []
}else{
    containerProducts = JSON.parse(localStorage.getItem("products"))
    displayProducts()
}



function addProduct(){

    var product = {
        name: productNameInput.value ,
        price :productPriceInput.value,
        category : productCategoryInput.value,
        description : productDescInput.value,
        img : productImageInput.files[0]?.name
    }
    containerProducts.push(product)
    console.log(containerProducts)
    clearForm()
    displayProducts()
    addBtn.disabled = true
    productName.classList.remove("is-valid")
    productPrice.classList.remove("is-valid")
    productCategory.classList.remove("is-valid")
    productDesc.classList.remove("is-valid")
    localStorage.setItem("products" , JSON.stringify(containerProducts))
}

function clearForm(){
    productNameInput.value = null
    productPriceInput.value = null 
    productCategoryInput.value = null 
    productDescInput.value = null 
    productImageInput.value = null
}

function displayProducts(){

    var cartona = ""
    for(var i = 0; i<containerProducts.length; i++){
        cartona += `
        <div class="col-md-2 col-sm-6 mx-5">
          <div class="product">
            <img src="../imgs/${containerProducts[i].img}" alt="">
            <h2 Product Name class="h4">${containerProducts[i].name}</h2>
            <p> Price Is : ${containerProducts[i].price}</p>
            <p> Description Is : ${containerProducts[i].description}</p>
            <button onclick="deleteProduct(${i})" class="btn btn-outline-danger w-100 btn-sm ">Delete <i class="fa fa-trash-can"></i></button>
            <button onclick="setFormForUpdate(${i})" class="btn btn-outline-warning my-2 w-100 btn-sm">Update</button>
          </div>
        </div>
        `
    }
    document.getElementById("rowData").innerHTML = cartona
    
}

function deleteProduct(deletedIndex){
    containerProducts.splice(deletedIndex , 1)
    localStorage.setItem("products", JSON.stringify(containerProducts));    
    displayProducts()
    console.log(containerProducts)
}

// function to search
function searchProducts(){
    var searchValue = searchInput.value
    var cartona = ""
    for(var i = 0; i<containerProducts.length; i++){
        var item = containerProducts[i]
        if(item.name.toLowerCase().includes(searchValue.toLowerCase())){
            cartona += `
        <div class="col-md-2 col-sm-6 mx-5">
          <div class="product">
            <img src="../imgs/${containerProducts[i].img}" alt="">
            <h2 Product Name class="h4">${containerProducts[i].name}</h2>
            <p> Price Is : ${containerProducts[i].price}</p>
            <p> Description Is : ${containerProducts[i].description}</p>
            <button onclick="deleteProduct(${i})" class="btn btn-outline-danger w-100 btn-sm ">Delete <i class="fa fa-trash-can"></i></button>
          </div>
          <button onclick="setFormForUpdate(${i})" class="btn btn-outline-warning w-100 my-2 btn-sm">Update</button>
        </div>
        `
        }
    }
    if(cartona === ""){
        document.getElementById("rowData").innerHTML = "No Data Available"
    }else{
        document.getElementById("rowData").innerHTML = cartona
    }
}

// function to set form for update
function setFormForUpdate(selectedIndex){
    currentIndex = selectedIndex
    addBtn.classList.add("d-none")
    updateBtn.classList.remove("d-none")
    productNameInput.value = containerProducts[selectedIndex].name
    productPriceInput.value = containerProducts[selectedIndex].price
    productCategoryInput.value = containerProducts[selectedIndex].category
    productDescInput.value = containerProducts[selectedIndex].description
}

// function to update product
function updateProduct(){
    addBtn.classList.remove("d-none")
    updateBtn.classList.add("d-none")
    containerProducts[currentIndex].name = productNameInput.value
    containerProducts[currentIndex].price = productPriceInput.value
    containerProducts[currentIndex].category = productCategoryInput.value
    containerProducts[currentIndex].description = productDescInput.value
    displayProducts()
    clearForm()
    localStorage.setItem("products", JSON.stringify(containerProducts))
}


function validateProductInput(element){

    if(regex[element.id].value.test(element.value) ==  true){
        element.classList.add("is-valid")
        element.classList.remove("is-invalid")
        element.nextElementSibling.classList.add("d-none")
        regex[element.id].isValid = true
    }else{
        element.classList.remove("is-valid")
        element.classList.add("is-invalid")
        element.nextElementSibling.classList.remove("d-none")
        regex[element.id].isValid = false
    }

    toggleAddBtn()
}

function toggleAddBtn(){
    if(regex.productName.isValid == true && regex.productPrice.isValid == true && regex.productCategory.isValid == true && regex.productDesc.isValid == true){
        addBtn.disabled = false
    }else{
        addBtn.disabled = true
    }
}