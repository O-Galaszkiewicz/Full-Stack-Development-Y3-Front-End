app.submitOrder = () => {
  const nameValid = /^[A-Za-z\s]+$/.test(app.customerName);
  const phoneValid = /^[0-9]+$/.test(app.customerPhone);

  if (!nameValid) return alert('Name must contain only letters.');
  if (!phoneValid) return alert('Phone number must contain only numbers.');

  alert(`Order placed successfully!\nName: ${app.customerName}\nPhone: ${app.customerPhone}\nTotal: $${app.basketTotal}`);

  app.customerName = '';
  app.customerPhone = '';
  app.basket = [];
  app.currentView = 'courses';
};