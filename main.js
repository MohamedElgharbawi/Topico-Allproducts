let myCart = document.querySelector(".my-cart");
let bodyofcart = document.querySelector(".my-cart .body");
let final_price = document.getElementsByClassName("final-price")[0];
let final_price2 = document.getElementsByClassName("final-price")[1];
let P = 0;
let bg1 = document.querySelector(".bg");
let bars = document.querySelector(".fa-bars");
let fa_circle_xmark = document.querySelector(".fa-circle-xmark");
let span = document.querySelector("header nav+span");
let nav = document.querySelector("header nav");
let to_Top = document.querySelector(".to-Top");
let btn = document.querySelector(".first-sec button");
let filter = document.querySelector(".filter");
let x = document.querySelector(".filter h2 i");
let arr = [];
let checkBtn = document.querySelector(".checkout");
let shopMoreBtn = document.querySelector(".my-cart button:not(.checkout)");
document.querySelector(".date").append(new Date().getFullYear());
shopMoreBtn.onclick = function () {
    myCart.classList.remove("active");
    bg1.classList.remove("active");
}
document.querySelector("#text").style.marginTop = `${document.querySelector("header").offsetHeight}px`;
window.onresize = function () {
    document.querySelector("#text").style.marginTop = `${document.querySelector("header").offsetHeight}px`;
}
window.onscroll = _ => to_Top.style.display = window.scrollY ? "block" : "none";
function addActive() {
    myCart.classList.add("active");
}
function removeActive() {
    myCart.classList.remove("active")
} 
function set_bg_active() {
    bg1.classList.add("active");
}
function remove_bg_active() {
    bg1.classList.remove("active");
}
bars.onclick = function () {
    nav.style.display = "block";
    span.style.display = "block";
}
fa_circle_xmark.onclick = function () {
    fa_circle_xmark.parentElement.parentElement.style.display = "none";
    span.style.display = "none";
}
span.onclick = function () {
    nav.style.display = "none";
    span.style.display = "none";
}
if (!bodyofcart.children.length) bodyofcart.innerHTML = `<p class="position-absolute text-center no-product"> No Products Selected </p>`;
function removeProducts() {
    let i = document.querySelectorAll(".my-cart .body i");
    i.forEach(product => {
        product.addEventListener("click", () => {
            let imgs = document.querySelectorAll(".product .img-product :first-child");
            for (let i = 0; i < imgs.length; i++) 
                if (imgs[i].src === product.parentElement.firstElementChild.firstElementChild.src) {
                    imgs[i].parentElement.parentElement.children[1].firstElementChild.classList.remove("active");
                    break;
                }
            product.parentElement.remove();
            document.querySelector(".count-items").innerHTML = document.querySelector(".my-cart .body").children.length;
            document.querySelector(".my-cart .head p .Span_Two").innerHTML = `(${document.querySelector(".my-cart .body").children.length} Item In Cart)`;
            P -= Number(product.parentElement.children[1].children[1].innerHTML.slice(1));
            final_price.innerHTML = `$${P}`;
            final_price2.innerHTML = `$${P}`;
            if (!document.querySelectorAll(".my-cart .body i").length) {
                bodyofcart.innerHTML += `<p class="position-absolute text-center no-product"> No Products Selected </p>`;
                window.localStorage.setItem("arr", "null");
            }
            addToLocalStorageOrRemove();
        });
    });
};
fetch("Ecommerce-Website.json").then(data => data.json()).then(products => {
    let TheProducts = document.getElementById("TheProducts");
    products.forEach(product => {
        let salePercentage = product.old_price ? Math.round((product.old_price - product.price) / product.old_price * 100) : 0;
        let oldPriceHTML = product.old_price ? `<p class="old-price">${product.old_price}</p>` : "";
        let SPAN = `<span class="sale-present position-absolute">%${salePercentage}</span>`;
        let ZERO = `<span class="sale-present position-absolute d-none">%${salePercentage}</span>`
        TheProducts.innerHTML +=
        `
                <div class="product position-relative text-center overflow-hidden swiper-slide">
                    ${salePercentage ? SPAN : ZERO}
                    <div class="icons position-absolute d-flex flex-column">
                        <span class="d-flex justify-content-center align-items-center position-relative"><i class="fa-solid fa-cart-plus"></i></span>
                        <span class="d-flex justify-content-center align-items-center"><i class="fa-solid fa-heart"></i></span>
                        <span class="d-flex justify-content-center align-items-center"><i class="fa-solid fa-share"></i></span>
                    </div>
                    <div class="img-product position-relative">
                        <img src="${product.img}" alt="">
                        <img class="img-hover position-absolute" src="${product.img_hover}" alt="">
                    </div>
                    <h3 class="product-name">
                        <a href="#">${product.name}</a>
                    </h3>
                    <div class="stars my-3">
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                    </div>
                    <div class="price d-flex justify-content-center align-items-center">
                        <p class="fw-bold">${product.price}</p>
                        ${oldPriceHTML}
                    </div>
                </div>
        `;
                            // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                            if (window.localStorage.getItem("arr")) {
                                let a = window.localStorage.getItem("arr").split(",");
                                for (let i = 0; i < a.length; i++) {
                                        for (let j = 0; j < TheProducts.children.length; j++) {
                                            if (TheProducts.children[j].children[2].firstElementChild.getAttribute("src") === a[i]) {
                                                TheProducts.children[j].children[1].firstElementChild.classList.add("active");
                                                break;
                                            }
                                        }
                                }
                            }
                            // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    });
    [...TheProducts.children].forEach(Element => {
        let bodyOfCart = document.querySelector(".my-cart .body");
        let count_items = document.querySelector(".count-items");
        Element.children[1].children[0].onclick =  function ()  {
            this.classList.add("active");
            let allImgs = document.querySelectorAll(".my-cart .body img");
            let flag = true;
            for (let i = 0; i < allImgs.length; i++)
                if (allImgs[i].src === Element.children[2].firstElementChild.src) {
                    flag = false;
                    break;
                }
            if (flag) {
                if (document.querySelector(".no-product"))
                    document.querySelector(".no-product").remove();
            P += parseInt(Element.children[5].firstElementChild.innerHTML);
            let count_items = document.querySelector(".count-items"); 
            bodyOfCart.innerHTML += `
                <div class="product d-flex align-items-center">
                    <div class="image"><img src="${Element.children[2].children[0].src}" alt=""></div>
                    <div class="text">
                        <p>${Element.children[3].firstElementChild.innerHTML}</p>
                        <div class="price">$${Element.children[5].firstElementChild.innerHTML}</div>
                    </div>
                    <i class="fa-solid fa-trash"></i>
                </div>
            `;
                addToLocalStorageOrRemove();
                final_price.innerHTML = `$${P}`;
                final_price2.innerHTML = `$${P}`;
                count_items.innerHTML = bodyOfCart.children.length;
                document.querySelector(".my-cart .head p .Span_Two").innerHTML = `(${bodyOfCart.children.length} Item In Cart)`;
                removeProducts();
            }    
        };
    });
});
let inputs = document.querySelectorAll(".first-sec .filter input");
inputs.forEach(input => {
    input.addEventListener("click", function () {
        filter.style.display = "none";
        fetch("Ecommerce-Website.json").then(data => data.json()).then(data => {
            let TheProducts = document.getElementById("TheProducts");
            TheProducts.innerHTML = "";
            for (let i = 0; i < data.length; i++) {
                if (data[i].categorie === input.id) {
                    let salePercentage = data[i].old_price ? Math.round((data[i].old_price - data[i].price) / data[i].old_price * 100) : 0;
                    let SPAN = `<span class="sale-present position-absolute">%${salePercentage}</span>`;
                    let ZERO = `<span class="sale-present position-absolute d-none">%${salePercentage}</span>`
                    TheProducts.innerHTML += `<div class="product position-relative text-center overflow-hidden swiper-slide">
                    ${salePercentage ? SPAN : ZERO}
        <div class="icons position-absolute d-flex flex-column">
            <span class="d-flex justify-content-center align-items-center position-relative"><i class="fa-solid fa-cart-plus"></i></span>
            <span class="d-flex justify-content-center align-items-center"><i class="fa-solid fa-heart"></i></span>
            <span class="d-flex justify-content-center align-items-center"><i class="fa-solid fa-share"></i></span>
        </div>
        <div class="img-product position-relative">
            <img src="${data[i].img}" alt="">
            <img class="img-hover position-absolute" src="${data[i].img_hover}" alt="">
        </div>
        <h3 class="product-name">
            <a href="#">${data[i].name}</a>
        </h3>
        <div class="stars my-3">
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
        </div>
        <div class="price d-flex justify-content-center align-items-center">
            <p class="fw-bold">${data[i].price}</p>
            ${data[i].old_price ? `<p class="old-price">${data[i].old_price}</p>` : ""}
        </div>
    </div>`
                                    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                                    if (window.localStorage.getItem("arr")) {
                                        let a = window.localStorage.getItem("arr").split(",");
                                        for (let i = 0; i < a.length; i++) {
                                                for (let j = 0; j < TheProducts.children.length; j++) {
                                                    if (TheProducts.children[j].children[2].firstElementChild.getAttribute("src") === a[i]) {
                                                        TheProducts.children[j].children[1].firstElementChild.classList.add("active");
                                                        break;
                                                    }
                                                }
                                        }
                                    }
                                    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                } else if (data[i].brand === input.id) {
                    let salePercentage = data[i].old_price ? Math.round((data[i].old_price - data[i].price) / data[i].old_price * 100) : 0;
                    let SPAN = `<span class="sale-present position-absolute">%${salePercentage}</span>`;
                    let ZERO = `<span class="sale-present position-absolute d-none">%${salePercentage}</span>`
                    TheProducts.innerHTML += `<div class="product position-relative text-center overflow-hidden swiper-slide">
        ${salePercentage ? SPAN : ZERO}
        <div class="icons position-absolute d-flex flex-column">
            <span class="d-flex justify-content-center align-items-center position-relative"><i class="fa-solid fa-cart-plus"></i></span>
            <span class="d-flex justify-content-center align-items-center"><i class="fa-solid fa-heart"></i></span>
            <span class="d-flex justify-content-center align-items-center"><i class="fa-solid fa-share"></i></span>
        </div>
        <div class="img-product position-relative">
            <img src="${data[i].img}" alt="">
            <img class="img-hover position-absolute" src="${data[i].img_hover}" alt="">
        </div>
        <h3 class="product-name">
            <a href="#">${data[i].name}</a>
        </h3>
        <div class="stars my-3">
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
        </div>
        <div class="price d-flex justify-content-center align-items-center">
            <p class="fw-bold">${data[i].price}</p>
            ${data[i].old_price ? `<p class="old-price">${data[i].old_price}</p>` : ""}
        </div>
    </div>`;
                                        // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                                        if (window.localStorage.getItem("arr")) {
                                            let a = window.localStorage.getItem("arr").split(",");
                                            for (let i = 0; i < a.length; i++) {
                                                    for (let j = 0; j < TheProducts.children.length; j++) {
                                                        if (TheProducts.children[j].children[2].firstElementChild.getAttribute("src") === a[i]) {
                                                            TheProducts.children[j].children[1].firstElementChild.classList.add("active");
                                                            break;
                                                        }
                                                    }
                                            }
                                        }
                                        // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                } else if (data[i].color === input.id) {
                    let salePercentage = data[i].old_price ? Math.round((data[i].old_price - data[i].price) / data[i].old_price * 100) : 0;
                    let SPAN = `<span class="sale-present position-absolute">%${salePercentage}</span>`;
                    let ZERO = `<span class="sale-present position-absolute d-none">%${salePercentage}</span>`
                    TheProducts.innerHTML += `<div class="product position-relative text-center overflow-hidden swiper-slide">
        ${salePercentage ? SPAN : ZERO}
        <div class="icons position-absolute d-flex flex-column">
            <span class="d-flex justify-content-center align-items-center position-relative"><i class="fa-solid fa-cart-plus"></i></span>
            <span class="d-flex justify-content-center align-items-center"><i class="fa-solid fa-heart"></i></span>
            <span class="d-flex justify-content-center align-items-center"><i class="fa-solid fa-share"></i></span>
        </div>
        <div class="img-product position-relative">
            <img src="${data[i].img}" alt="">
            <img class="img-hover position-absolute" src="${data[i].img_hover}" alt="">
        </div>
        <h3 class="product-name">
            <a href="#">${data[i].name}</a>
        </h3>
        <div class="stars my-3">
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
        </div>
        <div class="price d-flex justify-content-center align-items-center">
            <p class="fw-bold">${data[i].price}</p>
            ${data[i].old_price ? `<p class="old-price">${data[i].old_price}</p>` : ""}
        </div>
    </div>`;
                    
                                        // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                                        if (window.localStorage.getItem("arr")) {
                                            let a = window.localStorage.getItem("arr").split(",");
                                            for (let i = 0; i < a.length; i++) {
                                                    for (let j = 0; j < TheProducts.children.length; j++) {
                                                        if (TheProducts.children[j].children[2].firstElementChild.getAttribute("src") === a[i]) {
                                                            TheProducts.children[j].children[1].firstElementChild.classList.add("active");
                                                            break;
                                                        }
                                                    }
                                            }
                                        }
                                        // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                }
            }
            if (!TheProducts.innerHTML) {
                let p = document.createElement("p");
                p.textContent = "No Product Founded";
                p.style.cssText = `display:felx;justify-content:center;align-items:center;font-size:30px;font-weight:bold`;
                TheProducts.appendChild(p);
                filter.style.display = "none";
            } else {
                [...TheProducts.children].forEach(Element => {
                    let bodyOfCart = document.querySelector(".my-cart .body");
                    let count_items = document.querySelector(".count-items");
                    if (bodyOfCart.children.length && bodyOfCart.children[0].localName !=="p") {
                        for (let i = 0; i < bodyOfCart.children.length; i++) {
                            if (Element.children[2].firstElementChild.src === bodyOfCart.children[i].firstElementChild.firstElementChild.getAttribute("src")) {
                                Element.children[1].firstElementChild.classList.add("active");
                                break;
                            }
                        }
                    }
                    Element.children[1].children[0].onclick = function () {
                        this.classList.add("active");
                        let allImgs = document.querySelectorAll(".my-cart .body img");
                        let flag = true;
                        for (let i = 0; i < allImgs.length; i++)
                            if (allImgs[i].src === Element.children[2].firstElementChild.src) {
                                flag = false;
                                break;
                            }
                        if (flag) {
                            if (document.querySelector(".no-product"))
                                document.querySelector(".no-product").remove();
                        P += parseInt(Element.children[5].firstElementChild.innerHTML);
                        let count_items = document.querySelector(".count-items"); 
                        bodyOfCart.innerHTML += `
                            <div class="product d-flex align-items-center">
                                <div class="image"><img src="${Element.children[2].children[0].src}" alt=""></div>
                                <div class="text">
                                    <p>${Element.children[3].firstElementChild.innerHTML}</p>
                                    <div class="price">$${Element.children[5].firstElementChild.innerHTML}</div>
                                </div>
                                <i class="fa-solid fa-trash"></i>
                            </div>
                        `;
                            addToLocalStorageOrRemove();
                            final_price.innerHTML = `$${P}`;
                            final_price2.innerHTML = `$${P}`;
                            count_items.innerHTML = bodyOfCart.children.length;
                            document.querySelector(".my-cart .head p .Span_Two").innerHTML = `(${bodyOfCart.children.length} Item In Cart)`;
                            removeProducts();
                        }    
                    };
                });
            }
        })
    })
});
document.addEventListener('DOMContentLoaded', function () {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    for (let i = 0; i < checkboxes.length; i++) { 
        checkboxes[i].addEventListener('change', function () {
            if (this.checked) {
                for (let j = 0; j < checkboxes.length; j++) {
                    if (checkboxes[j] !== checkboxes[i]) {
                        checkboxes[j].checked = false;
                    }
                }
            } else {
                fetch("Ecommerce-Website.json").then(data => data.json()).then(products => {
                    let TheProducts = document.getElementById("TheProducts");
                    TheProducts.innerHTML = "";
                    products.forEach(product => {
                        let salePercentage = product.old_price ? Math.round((product.old_price - product.price) / product.old_price * 100) : 0;
                        let oldPriceHTML = product.old_price ? `<p class="old-price">${product.old_price}</p>` : "";
                        let SPAN = `<span class="sale-present position-absolute">%${salePercentage}</span>`;
                        let ZERO = `<span class="sale-present position-absolute d-none">%${salePercentage}</span>`
                        TheProducts.innerHTML +=
                        `
                                <div class="product position-relative text-center overflow-hidden swiper-slide">
                                    ${salePercentage ? SPAN : ZERO}
                                    <div class="icons position-absolute d-flex flex-column">
                                        <span class="d-flex justify-content-center align-items-center position-relative"><i class="fa-solid fa-cart-plus"></i></span>
                                        <span class="d-flex justify-content-center align-items-center"><i class="fa-solid fa-heart"></i></span>
                                        <span class="d-flex justify-content-center align-items-center"><i class="fa-solid fa-share"></i></span>
                                    </div>
                                    <div class="img-product position-relative">
                                        <img src="${product.img}" alt="">
                                        <img class="img-hover position-absolute" src="${product.img_hover}" alt="">
                                    </div>
                                    <h3 class="product-name">
                                        <a href="#">${product.name}</a>
                                    </h3>
                                    <div class="stars my-3">
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                    </div>
                                    <div class="price d-flex justify-content-center align-items-center">
                                        <p class="fw-bold">${product.price}</p>
                                        ${oldPriceHTML}
                                    </div>
                                </div>
                        `;
                    });
                    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                    if (window.localStorage.getItem("arr")) {
                        let a = window.localStorage.getItem("arr").split(",");
                        for (let i = 0; i < a.length; i++) {
                                for (let j = 0; j < TheProducts.children.length; j++) {
                                    if (TheProducts.children[j].children[2].firstElementChild.getAttribute("src") === a[i]) {
                                        TheProducts.children[j].children[1].firstElementChild.classList.add("active");
                                        break;
                                    }
                                }
                        }
                    }
                    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                    [...TheProducts.children].forEach(Element => {
                        let bodyOfCart = document.querySelector(".my-cart .body");
                        let count_items = document.querySelector(".count-items");
                        Element.children[1].children[0].onclick =  function ()  {
                            this.classList.add("active");
                            let allImgs = document.querySelectorAll(".my-cart .body img");
                            let flag = true;
                            for (let i = 0; i < allImgs.length; i++)
                                if (allImgs[i].src === Element.children[2].firstElementChild.src) {
                                    flag = false;
                                    break;
                                }
                            if (flag) {
                                if (document.querySelector(".no-product"))
                                    document.querySelector(".no-product").remove();
                            P += parseInt(Element.children[5].firstElementChild.innerHTML);
                            let count_items = document.querySelector(".count-items"); 
                            bodyOfCart.innerHTML += `
                                <div class="product d-flex align-items-center">
                                    <div class="image"><img src="${Element.children[2].children[0].src}" alt=""></div>
                                    <div class="text">
                                        <p>${Element.children[3].firstElementChild.innerHTML}</p>
                                        <div class="price">$${Element.children[5].firstElementChild.innerHTML}</div>
                                    </div>
                                    <i class="fa-solid fa-trash"></i>
                                </div>
                            `;
                                addToLocalStorageOrRemove();
                                final_price.innerHTML = `$${P}`;
                                final_price2.innerHTML = `$${P}`;
                                count_items.innerHTML = bodyOfCart.children.length;
                                document.querySelector(".my-cart .head p .Span_Two").innerHTML = `(${bodyOfCart.children.length} Item In Cart)`;
                                removeProducts();
                            }    
                        };
                    });
                    [...TheProducts.children].forEach(prod => {
                        for (let z = 0; z < document.querySelector(".my-cart .body").children.length; z++) {
                            if (prod.children[2].firstElementChild.src === document.querySelector(".my-cart .body").children[z].children[0].firstElementChild.getAttribute("src")) {
                                prod.children[1].firstElementChild.classList.add("active");
                                break;
                            }
                        }
                    })
                });
            }
        });
    }
});
x.onclick = function () {
    filter.style.display = "none";
}
btn.onclick = function () {
    filter.style.cssText = "position:absolute;z-index:50;display:block";
}
function addToLocalStorageOrRemove() {
    let A = document.querySelector(".body");
    A = [...A.children];
    let arr = [];
    for (let i = 0; i < A.length; i++) {
        let img = A[i].querySelector("img");
        let src = img.getAttribute("src");
        let absoluteUrl = new URL(src, window.location.href);
        let relativeUrl = absoluteUrl.pathname;
        arr.push(relativeUrl.substr(20 , 10) + " " + relativeUrl.substr(33));
    }
    window.localStorage.setItem("arr", arr);
}
checkBtn.onclick = function () {
    window.open("https://mohamedelgharbawi.github.io/Topico-Checkout/", "_self");
    myCart.classList.remove("active");
}


if (window.localStorage.getItem("arr")) {
    let a = window.localStorage.getItem("arr").split(",");
    bodyofcart.innerHTML = "";
    for (let i = 0; i < a.length; i++) {
        fetch("Ecommerce-Website.json").then(data => data.json()).then(data => {
            for (let j = 0; j < data.length; j++) {
                if (a[i] === data[j].img) {
                    bodyofcart.innerHTML += 
                                    `<div class="product d-flex align-items-center">
                                            <div class="image"><img src="${a[i]}" alt="image${i + 1}"></div>
                                            <div class="text">
                                                <p>${data[j].name}</p>
                                                <div class="price">$${data[j].price}</div>
                                            </div>
                                            <i class="fa-solid fa-trash"></i>
                                    </div>`;
                    P += data[j].price;
                    break;
                }
            }
            final_price.innerHTML = `$${P}`;
            final_price2.innerHTML = `$${P}`;
            document.querySelector("span.count-items").innerHTML = bodyofcart.children.length;
            document.querySelector(".Span_Two").innerHTML = `(${bodyofcart.children.length} Item In Cart)`;
            removeProducts();
            
        })
    }
}



let mode = document.getElementById("mode");
let dark = document.querySelector(".dark");
let light = document.querySelector(".light");

mode.onclick = function()  {
    if (light.classList.contains("none")) {
        document.body.style.background = "#000";
        window.localStorage.setItem("backgroundBody", "#000");
        window.localStorage.setItem("icon", "dark");
        document.styleSheets[2].rules[1].style.setProperty("--dark-color","#fff");
        document.styleSheets[2].rules[1].style.setProperty("--element-color","#181818");
        document.styleSheets[2].rules[1].style.setProperty("--black-color", "#fff");
        document.querySelector(".logo-1").src = "imgs/image e-commrce/img/logo-white.png";
        document.querySelector(".logo-2").src = "imgs/image e-commrce/img/logo-white.png";
    } else {
        document.body.style.background = "#f5f6f9";
        window.localStorage.setItem("backgroundBody", "#f5f6f9");
        window.localStorage.setItem("icon", "light");
        document.styleSheets[2].rules[1].style.setProperty("--dark-color","#000");
        document.styleSheets[2].rules[1].style.setProperty("--element-color","#fff");
        document.styleSheets[2].rules[1].style.setProperty("--black-color", "#000");
        document.querySelector(".logo-1").src = "imgs/image e-commrce/img/logo-black.png";
        document.querySelector(".logo-2").src = "imgs/image e-commrce/img/logo-black.png";
    }
    light.classList.toggle("none");
    dark.classList.toggle("none");
}



if (window.localStorage.getItem("backgroundBody")) {
    document.body.style.backgroundColor = window.localStorage.getItem("backgroundBody");
    if (window.localStorage.getItem("icon") === "dark") {
        light.classList.remove("none");
        dark.classList.add("none");
        document.styleSheets[2].rules[1].style.setProperty("--dark-color","#fff");
        document.styleSheets[2].rules[1].style.setProperty("--element-color","#181818");
        document.styleSheets[2].rules[1].style.setProperty("--black-color", "#fff");
        document.querySelector(".logo-1").src = "imgs/image e-commrce/img/logo-white.png";
        document.querySelector(".logo-2").src = "imgs/image e-commrce/img/logo-white.png";
    } else {
        light.classList.add("none");
        dark.classList.remove("none");
        document.styleSheets[2].rules[1].style.setProperty("--dark-color","#000");
        document.styleSheets[2].rules[1].style.setProperty("--element-color","#fff");
        document.styleSheets[2].rules[1].style.setProperty("--black-color", "#000");
        document.querySelector(".logo-1").src = "imgs/image e-commrce/img/logo-black.png";
        document.querySelector(".logo-2").src = "imgs/image e-commrce/img/logo-black.png";
    }
}