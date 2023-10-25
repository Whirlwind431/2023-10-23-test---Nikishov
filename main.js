
// Global variables
let products = []
// get elements from html document
const productName = document.getElementById('productName')
const price = document.getElementById('price')
const category = document.getElementById('category')
const img = document.getElementById('img')
// buttons
const submitBtn = document.getElementById("submitBtn")
const saveBtn = document.getElementById("saveBtn")

// start our website
webInit()

// no refreshing for our website
preventdefault = function (e) {
    e.preventDefault();
}

// create new obj for product=
function createProductObj() {
    const newProductObj = {
        productName: productName.value,
        category: category.value,
        price: price.value,
        img: img.value,
    }
    return newProductObj
}


function addProduct() {
    const newProduct = createProductObj()
    const validation = validationFunc(newProduct)
    if (validation) {
        // push new product to array
        products.push(newProduct)
        console.log(products);
        // add product to local Storage
        addToLocalStorage()
        webInit()
        clearInputs()
    }
}

// validate all the values to the new product object
function validationFunc(productObj) {
    const productNameError = document.getElementById("productNameError")
    const priceError = document.getElementById("priceError")
    const categoryError = document.getElementById("categoryError")
    const imgError = document.getElementById("imgError")
    if (!productObj.productName) {
        productNameError.innerHTML = "Please enter product name";
        productName.style.backgroundColor = "red";
    } else {
        productNameError.innerHTML = "";
        productName.style.backgroundColor = "white";
    } if (!productObj.price) {
        priceError.innerHTML = "Please enter  product price ";
        price.style.backgroundColor = "red";
    } else {
        priceError.innerHTML = "";
        price.style.backgroundColor = "white";
    } if (!productObj.category) {
        categoryError.innerHTML = "Please choose the category ";
        category.style.backgroundColor = "red";
    } else {
        categoryError.innerHTML = "";
        category.style.backgroundColor = "white";
    } if (!productObj.img) {
        imgError.innerHTML = "Please fill  img URL";
        img.style.backgroundColor = "red";
    } else {
        imgError.innerHTML = "";
        img.style.backgroundColor = "white";
    } if (!productObj.productName || !productObj.price || !productObj.category || !productObj.img) {
        return false;
    } else {
        return true;
    }
}

// add product to local Storage
function addToLocalStorage() {
    const str = JSON.stringify(products)
    localStorage.setItem("products", str)
}

// get product from local Storage and show in the table
function webInit() {
    if (localStorage.getItem("products")) {
        const productsArray = localStorage.getItem("products")
        const strProducts = JSON.parse(productsArray)
        products = strProducts
        console.log(products);
    } else {
        products = []
    }
    drawProducts()
}

// draw table from local storage array (products)
function drawProducts() {
    const tableBody = document.getElementById("tableBody")
    // Reset /clean data
    tableBody.innerHTML = ""
    let html = ''
    for (const product of products) {
        let index = products.indexOf(product)
        html += `<tr>
        <td> ${product.productName} </td>
        <td> ${product.price} </td>
        <td> ${product.category} </td>
        <td> <img src=" ${product.img}" class="img img-fluid img-thumbnail rounded mx-auto d-block"></td>
        <td> <button onclick="simpleToast(${index})" class="btn btn-danger" >Delete</button> </td>
        <td> <button onclick="editProduct(${index})" class="btn btn-warning">Edit</button> </td>
        </tr>`
    }
    tableBody.innerHTML = html
}

// clear input values after adding a new product
function clearInputs() {
    productName.value = ''
    category.value = ''
    price.value = ''
    img.value = ''
}

// update products after delete/edit some products
function updateProductsToLocalStorage() {
    const strNewArray = JSON.stringify(products)
    localStorage.setItem("products", strNewArray)
}

// delete product 
function deleteProduct(index) {
    products.splice(index, 1)
    updateProductsToLocalStorage()
    webInit()
}

// EDIT HELL BUTTON :(
function editProduct(index) {
    const product = products[index]
    submitBtn.setAttribute("hidden", "true")
    saveBtn.removeAttribute("hidden")
    productName.value = product.productName
    price.value = product.price
    category.value = product.category
    img.value = product.img
    saveBtn.addEventListener("click", () => {
        saveBtnFunc(product)
    })
}

//save button
function saveBtnFunc(product) {
    product.productName = productName.value
    product.price = price.value
    product.category = category.value
    product.img = img.value
    if (validationFunc(product)) {
        drawProducts()
        updateProductsToLocalStorage()
        saveBtn.setAttribute("hidden", "true")
        submitBtn.removeAttribute("hidden")
        webInit()
    }
}

// popup if u wanna delete product
function simpleToast(index) {
    // Get the SIMPLE-TOAST DIV
    const toast = document.getElementById("simpleToast");
    // Add the "show" class to DIV
    toast.className = "show";
    let html = ''
    html += `<h4 class="popup">Delete this product?<h4><br>
    <button onclick="deleteProduct(${index})" class="btn btn-danger popup" >Yes</button>
    <button onclick="webInit()" class="btn btn-primary popup">No</button>`
    toast.innerHTML = html
    setTimeout(function () {
        toast.className = toast.className.replace("show", "");
    }, 3000);
}


