import allProducts from './mocks/products.json';
import product1 from './mocks/product-1.json';
import product2 from './mocks/product-2.json';
import reviewsData from './mocks/reviews.json';
import mockUser from './mocks/user.json';
import mockOrders from './mocks/orders.json';

// "שליחת" קוד ללקוח (מוק): תמיד 123456
export async function requestOtp(phone) {
  localStorage.setItem('otp_phone', phone);
  localStorage.setItem('otp_code', '123456');
  return true;
}

// אימות קוד (מוק)
export async function verifyOtp(phone, code) {
  const savedPhone = localStorage.getItem('otp_phone');
  const savedCode  = localStorage.getItem('otp_code');
  const ok = (savedPhone === phone && code === savedCode);
  if (ok) {
    if (!localStorage.getItem('user')) {
      const u = { ...mockUser, phone }; // נעדכן טלפון שהוזן
      localStorage.setItem('user', JSON.stringify(u));
    }
    localStorage.setItem('session', '1');
  }
  return ok;
}

// המשתמש הנוכחי (מוק + localStorage)
export async function getCurrentUser() {
  const raw = localStorage.getItem('user');
  return raw ? JSON.parse(raw) : mockUser;
}

export async function updateUser(patch) {
  const current = await getCurrentUser();
  const updated = { ...current, ...patch };
  localStorage.setItem('user', JSON.stringify(updated));
  return updated;
}

export async function logout() {
  localStorage.removeItem('session');
}

// מוצרים (מוק)
export async function getProducts() {
  return allProducts;
}

export async function getProduct(id) {
  // אפשר או לחפש מתוך allProducts או להשתמש בקבצי product-1/2.json
  const found = allProducts.find(p => p.id === Number(id));
  if (found) return found;
  const map = { 1: product1, 2: product2 };
  return map[Number(id)] ?? product1;
}

// חוות דעת (מוק)
export async function getReviews() {
  return reviewsData;
}

// הזמנות (מוק)
export async function getOrders() {
  return mockOrders;
}

export async function reorder(orderId) {
  const order = mockOrders.find(o => o.id === orderId);
  return order ? order.items : [];
}
