//===G E T  E L E M E N T S===
let titleInput = document.getElementById("title")
let priceInput = document.getElementById("price")
let taxesInput = document.getElementById("taxes")
let adsInput = document.getElementById("ads")
let discountInput = document.getElementById("discount")
let total = document.getElementById("total")
let countInput = document.getElementById('count')
let categoryInput = document.getElementById('category')
let createBtn = document.getElementById('create-btn')
let productsOutput = document.getElementById('products')
let addDeleteBtnHere = document.getElementById('delete-btn')
let searchInput = document.getElementById('search')

//------------------
let mood = 'create'
let updateIndex;
//------------------

//===C A L C  T O T A L===
function getTotal() {
    // make sure that price is not empty
    if(priceInput.value != ''){
        let result = ((+priceInput.value) + (+taxesInput.value) + (+adsInput.value)) - (+discountInput.value)
        console.log(result);
        total.innerHTML = result
    }else{
        total.innerHTML = ''
    }
}

//===C R E A T E  P R O D U C T===
// check if we have data in localstorage 
let data;
if(localStorage.product != null){
    data = JSON.parse(localStorage.product)
}else{
    data = [];
}
createBtn.onclick = ()=>{
    let product = {
        title: titleInput.value,
        price: priceInput.value,
        taxes: taxesInput.value,
        ads: adsInput.value,
        discount: discountInput.value,
        total: total.innerHTML,
        count: countInput.value,
        category: categoryInput.value,
    }
    if (titleInput.value != '' && priceInput.value !='' && categoryInput.value !='') {
        if (mood === 'create') {
            if(product.count>1){
                for (let i = 0; i < product.count; i++) {
                    data.push(product)
                }
            }else{
                data.push(product)
            }
        }else{
            data[updateIndex] = product
            mood = 'create'
            createBtn.innerHTML = 'Create'
            countInput.style.display="block"
        }
        clearInputs()
    }
    localStorage.setItem('product', JSON.stringify(data))
    getData()
}

//===C L E A R  I N P U T S  F E I L D S===
function clearInputs() {
    titleInput.value = ''
    priceInput.value = ''
    taxesInput.value = ''
    adsInput.value = ''
    discountInput.value = ''
    total.innerHTML = ''
    countInput.value = ''
    categoryInput.value = ''
}

//===S H O W  D A T A===
function getData() {
    let tabel = ''
    
    if(data.length>0){
        for (let i = 0; i < data.length; i++) {
            product = data[i];
            tabel +=`<tr> <td>${i+1}</td> <td>${product.title}</td> <td>${product.price}</td> <td>${product.taxes}</td> <td>${product.ads}</td> <td>${product.discount}</td> <td>${product.total}</td> <td>${product.category}</td> <td><button onclick="updateProduct(${i})" class='btn'>Update</button></td> <td><button onclick="deleteProduct(${i})" class='btn'>Delete</button></td></tr>`
            productsOutput.innerHTML = tabel
       }
        addDeleteBtnHere.innerHTML = `<button onclick="emptyAll()" class="btn">Empty</button>`
    }else{
        productsOutput.innerHTML = ''
        addDeleteBtnHere.innerHTML=''
    }
}
getData()

//===D E L E T E  1  P R O D U C T=== 
function deleteProduct(i) {
    console.log("delete " + i);
    data.splice(i, 1)
    localStorage.product = JSON.stringify(data)
    getData()
}

//===U P D A T E===
function updateProduct(i) {
    console.log("update " + i);
    createBtn.innerHTML= "UPDATE"
    titleInput.value = data[i].title
    priceInput.value = data[i].price
    taxesInput.value = data[i].taxes
    adsInput.value = data[i].ads
    discountInput.value = data[i].discount
    total.innerHTML = data[i].total
    categoryInput.value = data[i].category
    countInput.style.display = 'none'
    updateIndex =  i
    mood = 'update'
    scroll({
        top:0,
        behavior:'smooth'
    })
}

//===E M P T Y  A L L===
function emptyAll(){
    localStorage.clear()
    data.splice(0)
    getData()
}

//===S E A R C H===
let searchMood = 'title';
//get & update serach mood...
function getSearchMood(id) {
    if (id == 'searchCategory') {
        searchMood = 'category'
    }else if (id == 'searchTitle') {
        searchMood = 'title';
    }
    searchInput.focus()
    searchInput.placeholder = "Search By " + searchMood.charAt(0).toUpperCase() + searchMood.slice(1);
    searchInput.value = ''
    getData()
}
//search function...
function searchData(searchValue){
    let tabel = ''
    if(searchMood == 'title'){
        //by title
        for (let i = 0; i < data.length; i++) {
            if (data[i].title.toLowerCase().includes(searchValue.toLowerCase())){
                product = data[i];
                tabel +=`<tr> <td>${i+1}</td> <td>${product.title}</td> <td>${product.price}</td> <td>${product.taxes}</td> <td>${product.ads}</td> <td>${product.discount}</td> <td>${product.total}</td> <td>${product.category}</td> <td><button onclick="updateProduct(${i})" class='btn'>Update</button></td> <td><button onclick="deleteProduct(${i})" class='btn'>Delete</button></td></tr>`
            }
        }
    }else if (searchMood == 'category'){
        //by category
        for (let i = 0; i < data.length; i++) {
            if (data[i].category.toLowerCase().includes(searchValue.toLowerCase())){
                product = data[i];
                tabel +=`<tr> <td>${i+1}</td> <td>${product.title}</td> <td>${product.price}</td> <td>${product.taxes}</td> <td>${product.ads}</td> <td>${product.discount}</td> <td>${product.total}</td> <td>${product.category}</td> <td><button onclick="updateProduct(${i})" class='btn'>Update</button></td> <td><button onclick="deleteProduct(${i})" class='btn'>Delete</button></td></tr>`
            }
        }
    }
    productsOutput.innerHTML = tabel
}
