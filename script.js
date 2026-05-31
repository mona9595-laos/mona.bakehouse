const productsData = [
    {
        id: 1,
        name: "Basque Burnt Cheesecake",
        price: 130000,
        img: "https://i.pinimg.com/1200x/97/d7/eb/97d7ebe37e4271d5088e0433018f23f1.jpg",
        hasSize: true,
        type: "cheesecake",
        bestSeller: true,
        isNew: false
    },
    {
        id: 2,
        name: "Chocolate Cheesecake",
        price: 150000,
        img: "https://i.pinimg.com/1200x/ba/0a/2e/ba0a2e33d0101827ab7bc9fb5145bff9.jpg",
        hasSize: true,
        type: "cheesecake",
        bestSeller: false,
        isNew: false
    },
    {
        id: 3,
        name: "Matcha Cheesecake",
        price: 180000,
        img: "https://i.pinimg.com/1200x/a4/c4/ff/a4c4ff499b0d6053bd4e2e35637a9d5d.jpg",
        hasSize: true,
        type: "cheesecake",
        bestSeller: false,
        isNew: false
    },
    {
        id: 4,
        name: "Strawberry Croissant",
        price: 85000,
        img: "https://i.pinimg.com/1200x/27/bf/f2/27bff2c81904bc5ca6ecddf3311b5a51.jpg",
        hasSize: false,
        bestSeller: false,
        isNew: false
    },
    {
        id: 5,
        name: "Shiopan",
        price: 40000,
        img: "https://i.pinimg.com/736x/ee/08/58/ee08588365fbed9eec8e5f1540519d86.jpg",
        hasSize: false,
        bestSeller: true,
        isNew: false
    },
    {
        id: 6,
        name: "Biscoff Cookie",
        price: 20000,
        img: "https://i.pinimg.com/736x/76/91/23/769123337af6e1e352d9207361d29e9f.jpg",
        hasSize: false,
        bestSeller: false,
        isNew: false
    },
    {
        id: 7,
        name: "Apple Pie",
        price: 250000,
        img: "https://i.pinimg.com/1200x/c4/17/32/c417322ab1a16d62b51fdb3fa2352337.jpg",
        hasSize: true,
        type: "pie",
        bestSeller: false,
        isNew: true
    },
    {
        id: 8,
        name: "Cream Puff",
        price: 25000,
        img: "https://i.pinimg.com/736x/ef/4f/c9/ef4fc91748c51597cc242fd8122830b5.jpg",
        hasSize: false,
        bestSeller: false,
        isNew: false
    },
    {
        id: 9,
        name: "Egg Tart",
        price: 25000,
        img: "https://i.pinimg.com/736x/f5/05/59/f50559d6e3e97e7cd00836a381d6fdec.jpg",
        hasSize: false,
        bestSeller: false,
        isNew: false
    },
    {
        id: 10,
        name: "Matcha Lava Tart",
        price: 45000,
        img: "https://i.pinimg.com/1200x/34/11/e0/3411e070baf1e5b10d53d317d51523d7.jpg",
        hasSize: false,
        bestSeller: true,
        isNew: false
    }
];

let basket = [];
let selectedProduct = null;
let modalQty = 1;
let paymentSlipData = "";

const productlist = document.getElementById("product-list");
const bestSellerList = document.getElementById("best-seller-list");
const paymentSlipInput = document.getElementById("paymentSlip");

function createProductCard(product) {
    return `
        <div class="card">
            ${product.bestSeller ? `<div class="best-badge">Best Seller</div>` : ""}
            ${product.isNew ? `<div class="new-badge">New</div>` : ""}

            <img src="${product.img}" alt="${product.name}">

            <h3>${product.name}</h3>

            <p>${product.price.toLocaleString()} ກີບ</p>

            <button onclick="openProductModal(${product.id})">
                ເລືອກສິນຄ້າ
            </button>
        </div>
    `;
}

if (productlist) {
    productlist.innerHTML = productsData.map(createProductCard).join("");
}

if (bestSellerList) {
    bestSellerList.innerHTML = productsData
        .filter(product => product.bestSeller)
        .map(createProductCard)
        .join("");
}

if (paymentSlipInput) {
    paymentSlipInput.addEventListener("change", function () {
        const file = this.files[0];

        if (!file) {
            paymentSlipData = "";
            document.getElementById("slip-preview-box").style.display = "none";
            return;
        }

        const reader = new FileReader();

        reader.onload = function (event) {
            paymentSlipData = event.target.result;

            document.getElementById("slip-preview").src = paymentSlipData;
            document.getElementById("slip-preview-box").style.display = "block";
        };

        reader.readAsDataURL(file);
    });
}

function showSection(sectionId) {
    const sections = document.querySelectorAll(".page-section");

    sections.forEach(section => {
        section.classList.remove("active");
    });

    document.getElementById(sectionId).classList.add("active");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

function openProductModal(productId) {
    selectedProduct = productsData.find(product => product.id === productId);
    modalQty = 1;

    document.getElementById("modalQty").innerText = modalQty;
    document.getElementById("modal-img").src = selectedProduct.img;
    document.getElementById("modal-name").innerText = selectedProduct.name;
    document.getElementById("modal-price").innerText =
        selectedProduct.price.toLocaleString() + " ກີບ";
    document.getElementById("modal-note").value = "";

    let sizeHtml = "";

    if (selectedProduct.hasSize && selectedProduct.type === "cheesecake") {
        sizeHtml = `
            <label>ຂະໜາດ</label>
            <select id="modal-size">
                <option value="1 ປອນ" data-multiplier="1">ຂະໜາດ 1 ປອນ</option>
                <option value="2 ປອນ" data-multiplier="2">ຂະໜາດ 2 ປອນ (ລາຄາ x2)</option>
            </select>
        `;
    }

    if (selectedProduct.hasSize && selectedProduct.type === "pie") {
        sizeHtml = `
            <label>ຂະໜາດ</label>
            <select id="modal-size">
                <option value="1 ປອນ" data-multiplier="1">ຂະໜາດ 1 ປອນ</option>
                <option value="1 ປອນເຄິ່ງ" data-multiplier="1.5">ຂະໜາດ 1 ປອນເຄິ່ງ (ລາຄາ x1.5)</option>
                <option value="2 ປອນ" data-multiplier="2">ຂະໜາດ 2 ປອນ (ລາຄາ x2)</option>
            </select>
        `;
    }

    document.getElementById("modal-size-area").innerHTML = sizeHtml;
    document.getElementById("productModal").style.display = "flex";
}

function closeProductModal() {
    document.getElementById("productModal").style.display = "none";
}

function changeModalQty(amount) {
    modalQty += amount;

    if (modalQty < 1) {
        modalQty = 1;
    }

    document.getElementById("modalQty").innerText = modalQty;
}

function addModalToCart() {
    let size = "ປົກກະຕິ";
    let price = selectedProduct.price;
    let note = document.getElementById("modal-note").value.trim();

    if (selectedProduct.hasSize) {
        const sizeSelect = document.getElementById("modal-size");

        size = sizeSelect.value;

        const multiplier = parseFloat(
            sizeSelect.options[sizeSelect.selectedIndex].getAttribute("data-multiplier")
        );

        price = selectedProduct.price * multiplier;
    }

    const existingItem = basket.find(item =>
        item.name === selectedProduct.name &&
        item.size === size &&
        item.note === note
    );

    if (existingItem) {
        existingItem.qty += modalQty;
    } else {
        basket.push({
            name: selectedProduct.name,
            price: price,
            size: size,
            qty: modalQty,
            note: note
        });
    }

    renderUI();
    closeProductModal();
}

function changeQty(index, amount) {
    basket[index].qty += amount;

    if (basket[index].qty <= 0) {
        basket.splice(index, 1);
    }

    renderUI();
}

function renderUI() {
    const totalQty = basket.reduce((sum, item) => sum + item.qty, 0);
    const subtotal = basket.reduce((sum, item) => sum + item.price * item.qty, 0);

    let discount = 0;

    if (subtotal >= 500000) {
        discount = subtotal * 0.05;
    }

    const finalTotal = subtotal - discount;

    const cartCount = document.getElementById("cart-count");
    const subtotalText = document.getElementById("subtotal-text");
    const discountText = document.getElementById("discount-amount-text");
    const finalTotalText = document.getElementById("final-total-text");
    const container = document.getElementById("cart-items-container");

    if (cartCount) {
        cartCount.innerText = totalQty;
    }

    if (subtotalText) {
        subtotalText.innerText = subtotal.toLocaleString() + " ກີບ";
    }

    if (discountText) {
        discountText.innerText = discount.toLocaleString() + " ກີບ";
    }

    if (finalTotalText) {
        finalTotalText.innerText = finalTotal.toLocaleString() + " ກີບ";
    }

    if (!container) {
        return;
    }

    if (basket.length === 0) {
        container.innerHTML = "ຍັງຫວ່າງເປັ່າ";
        return;
    }

    container.innerHTML = basket.map((item, index) => `
        <div class="cart-item-row">
            <div>
                <span><b>${item.name}</b> (${item.size})</span><br>
                <small>${item.price.toLocaleString()} ກີບ</small><br>
                ${item.note ? `<small>ໝາຍເຫດ: ${item.note}</small>` : ""}
            </div>

            <div>
                <button class="qty-btn" onclick="changeQty(${index}, -1)">-</button>
                <span>${item.qty}</span>
                <button class="qty-btn" onclick="changeQty(${index}, 1)">+</button>
            </div>
        </div>
    `).join("");
}

function resetCart() {
    if (confirm("ລ້າງກະຕ່າສິນຄ້າ?")) {
        basket = [];
        renderUI();
    }
}

function saveOrderToStorage(myOrderData, adminOrderData) {
    try {
        localStorage.setItem("myOrder", JSON.stringify(myOrderData));
    } catch (error) {
        localStorage.setItem("myOrder", JSON.stringify(adminOrderData));
    }

    try {
        let allOrders = JSON.parse(localStorage.getItem("allOrders")) || [];
        allOrders.push(adminOrderData);
        localStorage.setItem("allOrders", JSON.stringify(allOrders));
    } catch (error) {
        localStorage.setItem("allOrders", JSON.stringify([adminOrderData]));
    }
}

function confirmPurchase() {
    const name = document.getElementById("custName").value.trim();
    const tel = document.getElementById("custTel").value.trim();
    const loc = document.getElementById("custLoc").value.trim();
    const deliveryTime = document.getElementById("deliveryTime").value.trim();
    const paymentMethod = document.getElementById("paymentMethod").value;

    if (!name || !tel || !deliveryTime || basket.length === 0) {
        alert("ກະລຸນາປ້ອນຂໍ້ມູນໃຫ້ຄົບ ແລະ ເລືອກສິນຄ້າ!");
        return;
    }

    if (!paymentSlipData) {
        alert("ກະລຸນາແນບສະລິບການໂອນເງິນກ່ອນຢືນຢັນອໍເດີ!");
        return;
    }

    const subtotal = basket.reduce((sum, item) => sum + item.price * item.qty, 0);
    const discount = subtotal >= 500000 ? subtotal * 0.05 : 0;
    const finalTotal = subtotal - discount;

    const orderItems = basket.map(item => ({
        name: item.name,
        price: item.price,
        size: item.size,
        qty: item.qty,
        note: item.note
    }));

    const orderData = {
        name: name,
        tel: tel,
        loc: loc,
        delivery: deliveryTime,
        payment: paymentMethod,
        paymentStatus: "ລູກຄ້າທ່ານນີ້ໂອນເງິນແລ້ວ",
        paymentSlip: paymentSlipData,
        items: orderItems,
        subtotal: subtotal.toLocaleString() + " ກີບ",
        discount: discount.toLocaleString() + " ກີບ",
        total: finalTotal.toLocaleString() + " ກີບ",
        date: new Date().toLocaleString()
    };

    const orderForAdmin = {
        name: name,
        tel: tel,
        loc: loc,
        delivery: deliveryTime,
        payment: paymentMethod,
        paymentStatus: "ລູກຄ້າທ່ານນີ້ໂອນເງິນແລ້ວ",
        items: orderItems,
        subtotal: subtotal.toLocaleString() + " ກີບ",
        discount: discount.toLocaleString() + " ກີບ",
        total: finalTotal.toLocaleString() + " ກີບ",
        date: new Date().toLocaleString()
    };

    saveOrderToStorage(orderData, orderForAdmin);

    window.location.href = "receipt.html";
}

renderUI();