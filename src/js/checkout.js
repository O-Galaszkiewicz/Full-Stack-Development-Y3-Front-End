app.submitOrder = () => {
  const nameValid = /^[A-Za-z\s]{3,30}$/.test(app.customerName);
  const phoneValid = /^[0-9]{12,15}$/.test(app.customerPhone);

  if (!nameValid) {
    alert('Name must contain only letters and be between 3 and 30 characters.');
    return;
  }
  if (!phoneValid) {
    alert('Phone number must contain only numbers and be between 12 and 15 digits.');
    return;
  }

  alert(
    `Order placed successfully!\nName: ${app.customerName}\nPhone: ${app.customerPhone}\nTotal: $${app.basketTotal}`
  );

  app.customerName = '';
  app.customerPhone = '';
  app.basket = [];
  app.currentView = 'courses';
};