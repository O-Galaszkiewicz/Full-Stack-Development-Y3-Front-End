app.submitOrder = async () => {
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

  // Build proper order object for backend
  const orderData = {
    name: app.customerName,
    phone: app.customerPhone,
    basket: app.basket.map(item => ({
      courseId: item.course._id,
      quantity: item.quantity
    })),
    total: app.basketTotal
  };

  // Send order to backend
  const result = await app.sendOrder(orderData);

  if (result?.error) {
    alert("Failed to place order.");
    return;
  }

  alert("Order placed successfully!");

  app.customerName = '';
  app.customerPhone = '';
  app.basket = [];
  app.currentView = 'courses';
};