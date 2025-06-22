// Constants
const SHIPPING_COST = 50;

// Get order ID from URL
function getOrderId() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

// Format date
function formatDate(dateString) {
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('th-TH', options);
}

// Create item element
function createItemElement(item) {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'item';
    
    itemDiv.innerHTML = `
        <img src="${item.image_url}" alt="${item.name}">
        <div class="item-details">
            <h4>${item.name}</h4>
            <p>จำนวน: ${item.quantity} ชิ้น</p>
            <p>ราคาต่อชิ้น: ฿${item.price.toLocaleString('th-TH')}</p>
        </div>
        <div class="item-total">
            ฿${(item.price * item.quantity).toLocaleString('th-TH')}
        </div>
    `;
    
    return itemDiv;
}

// Initialize page
async function initializePage() {
    const orderId = getOrderId();
    if (!orderId) {
        window.location.href = 'index.html';
        return;
    }
    
    try {
        // Get order details
        const orderResult = await DB.getOrder(orderId);
        const order = orderResult.rows[0];
        
        if (!order) {
            window.location.href = 'index.html';
            return;
        }
        
        // Update order info
        document.getElementById('orderId').textContent = order.id;
        document.getElementById('orderDate').textContent = formatDate(order.created_at);
        document.getElementById('orderStatus').textContent = order.status === 'pending' ? 'รอดำเนินการ' : 'สำเร็จ';
        
        // Get order items
        const itemsResult = await DB.getOrderItems(orderId);
        const items = Array.from(itemsResult.rows);
        
        // Add items to list
        const itemsList = document.getElementById('itemsList');
        items.forEach(item => {
            itemsList.appendChild(createItemElement(item));
        });
        
        // Update summary
        const subtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
        const shipping = SHIPPING_COST;
        const total = subtotal + shipping;
        
        document.getElementById('subtotal').textContent = `฿${subtotal.toLocaleString('th-TH')}`;
        document.getElementById('shipping').textContent = `฿${shipping.toLocaleString('th-TH')}`;
        document.getElementById('total').textContent = `฿${total.toLocaleString('th-TH')}`;
        
    } catch (error) {
        console.error('Error loading order:', error);
        window.location.href = 'index.html';
    }
}

// Initialize when page loads
window.addEventListener('load', initializePage);
