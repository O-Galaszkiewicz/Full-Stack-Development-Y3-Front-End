app.addToBasket = function(course) {
  const existingItem = this.basket.find(item => item.course === course);
  if (existingItem) {
    if (course.spaces > 0) {
      existingItem.quantity++;
      course.spaces--;
    } else {
      alert('No more spaces available for this course.');
    }
  } else if (course.spaces > 0) {
    this.basket.push({ course, quantity: 1 });
    course.spaces--;
  }
};

app.decreaseQuantity = function (item) {
  if (item.quantity > 1) {
    item.quantity--;
    item.course.spaces++;
  } else {
    this.removeFromBasket(this.basket.indexOf(item));
  }
};

app.increaseQuantity = function(item) {
  if (item.course.spaces > 0) {
    item.quantity++;
    item.course.spaces--;
  } else {
    alert('No more spaces available for this course.');
  }
};

app.removeFromBasket = function (index) {
  const item = this.basket[index];
  item.course.spaces += item.quantity;
  this.basket.splice(index, 1);
};

app.isInBasket = function(course) {
  return this.basket.some(item => item.course === course);
};