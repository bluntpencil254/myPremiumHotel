let cart = {};

window.addEventListener("load", function(){
    let loader = document.getElementById("loader");
    setTimeout(()=>{
        if(loader) loader.remove();
    },2000);
});

function add(btn,name,price){
    let qty = Number(btn.previousElementSibling.value);

    if(cart[name]){
        cart[name].qty += qty;
    }else{
        cart[name] = { price, qty };
    }

    renderCart();
}

function renderCart(){
    let cartBox = document.getElementById("cartItems");
    let total = 0;
    cartBox.innerHTML = "";

    for(let item in cart){
        let subtotal = cart[item].price * cart[item].qty;
        total += subtotal;

        cartBox.innerHTML += `
            <div class="cart-item">
                <div>
                    <strong>${item}</strong><br>
                    x${cart[item].qty} — KSh ${subtotal}
                </div>
                <span class="remove-btn" onclick="removeItem('${item}')">✕</span>
            </div>
        `;
    }

    document.getElementById("total").innerText = total;
}

function removeItem(item){
    delete cart[item];
    renderCart();
}

function sendWhatsapp(){
    if(Object.keys(cart).length===0){
        alert("Cart is empty.");
        return;
    }

    let name=document.getElementById("customerName").value;
    let phone=document.getElementById("customerPhone").value;

    if(!name || !phone){
        alert("Enter name and phone.");
        return;
    }

    let orderText = "";
    let total = 0;

    for(let item in cart){
        total += cart[item].qty * cart[item].price;
        orderText += `${item} x${cart[item].qty}\n`;
    }

    let message=`Customer: ${name}
Phone: ${phone}
Order:
${orderText}
Total: KSh ${total}`;

    window.open(`https://wa.me/254711906157?text=${encodeURIComponent(message)}`);
}

function sendEmail(){
    if(Object.keys(cart).length===0){
        alert("Cart is empty.");
        return;
    }

    let name = document.getElementById("customerName").value;
    let phone = document.getElementById("customerPhone").value;

    if(!name || !phone){
        alert("Enter name and phone.");
        return;
    }

    let orderText = "";
    let total = 0;

    for(let item in cart){
        total += cart[item].qty * cart[item].price;
        orderText += `${item} x${cart[item].qty}\n`;
    }

    let body = `Customer: ${name}
Phone: ${phone}
Order:
${orderText}
Total: KSh ${total}`;

    window.location.href =
    `mailto:orders@myhotel.com?subject=New Order&body=${encodeURIComponent(body)}`;
}

function searchMeal(){
    let input=document.getElementById("search").value.toLowerCase();
    let foods=document.querySelectorAll(".food");

    foods.forEach(food=>{
        food.style.display=food.innerText.toLowerCase().includes(input) ? "block":"none";
    });
}

function toggleMenu(){
    let nav = document.getElementById("navRight");
    if(nav) nav.classList.toggle("active");
}

function scrollToMenu(){
    document.getElementById("menu").scrollIntoView({behavior:"smooth"});
}

function toggleFullMenu(){
    let menu = document.getElementById("fullMenu");
    let btn = document.getElementById("menuToggleBtn");

    if(!menu || !btn) return;

    menu.classList.toggle("active");
    btn.innerText = menu.classList.contains("active")
        ? "Hide Full Menu"
        : "View Full Menu";
}

function showPreview(src){
    let img = document.getElementById("previewImage");
    if(!img) return;

    img.src = src;
    img.style.display = "block";
}

function quickAdd(name,price){
    if(cart[name]){
        cart[name].qty += 1;
    }else{
        cart[name] = { price, qty:1 };
    }

    renderCart();
}

function toggleFaq(element){
    let p=element.nextElementSibling;
    p.style.display=p.style.display==="block" ? "none":"block";
}

function toggleDarkMode(){
    document.body.classList.toggle("dark");
}
#year update
document.getElementById("year").innerText = new Date().getFullYear();
