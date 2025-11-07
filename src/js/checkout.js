app.submitOrder = function () {
  const nameValid = /^[A-Za-z\s]+$/.test(this.customerName);
  const phoneValid = /^[0-9]+$/.test(this.customerPhone);

  if (!nameValid) {
    alert('Name must contain only letters.');
    return;
  }
  if (!phoneValid) {
    alert('Phone number must contain only numbers.');
    return;
  }

  alert(
    `Order placed successfully!\nName: ${this.customerName}\nPhone: ${this.customerPhone}\nTotal: $${this.basketTotal}`
  );

  this.customerName = '';
  this.customerPhone = '';
  this.basket = [];
  this.currentView = 'courses';
};