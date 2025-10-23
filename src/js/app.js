new Vue({
  el: '#app',
  data: {
    currentView: 'courses',
    courses: [
      {
        subject: 'Mathematics',
        location: 'New York',
        price: 100,
        spaces: 5,
        icon: 'fas fa-calculator'
      },
      {
        subject: 'Physics',
        location: 'San Francisco',
        price: 120,
        spaces: 5,
        icon: 'fas fa-atom'
      },
      {
        subject: 'Art',
        location: 'Paris',
        price: 90,
        spaces: 5,
        icon: 'fas fa-palette'
      },
      {
        subject: 'Programming',
        location: 'Online',
        price: 150,
        spaces: 5,
        icon: 'fas fa-laptop-code'
      }
    ],
    basket: [],
    showBasket: false,
    customerName: '',
    customerPhone: '',
    searchQuery: '',
    sortOption: ''
  },
  methods: {
    addToBasket(course) {
      if (!this.isInBasket(course) && course.spaces > 0) {
        this.basket.push(course);
        course.spaces--;
      }
    },
    isInBasket(course) {
      return this.basket.includes(course);
    },
    toggleBasket() {
      this.showBasket = !this.showBasket;
    },
    removeFromBasket(index) {
      const removed = this.basket.splice(index, 1)[0];
      removed.spaces++;
    },
    checkout() {
      this.showBasket = false;
      this.currentView = 'checkout';
    },
    cancelCheckout() {
      this.currentView = 'courses';
    },
    submitOrder() {
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

      alert(`Order placed successfully!\nName: ${this.customerName}\nPhone: ${this.customerPhone}\nTotal: $${this.basketTotal}`);

      this.customerName = '';
      this.customerPhone = '';
      this.basket = [];
      this.currentView = 'courses';
    },
    sortCourses() {
      this.courses = [...this.courses];
    }
  },
  computed: {
    basketTotal() {
      return this.basket.reduce((total, course) => total + course.price, 0);
    },
    filteredCourses() {
      let result = this.courses;

      if (this.searchQuery.trim() !== '') {
        const query = this.searchQuery.toLowerCase();
        result = result.filter(course =>
          course.subject.toLowerCase().includes(query) ||
          course.location.toLowerCase().includes(query) ||
          String(course.price).includes(query)
        );
      }

      switch (this.sortOption) {
        case 'price-asc':
          result = result.slice().sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          result = result.slice().sort((a, b) => b.price - a.price);
          break;
        case 'subject-asc':
          result = result.slice().sort((a, b) => a.subject.localeCompare(b.subject));
          break;
        case 'subject-desc':
          result = result.slice().sort((a, b) => b.subject.localeCompare(a.subject));
          break;
        case 'spaces-asc':
          result = result.slice().sort((a, b) => a.spaces - b.spaces);
          break;
        case 'spaces-desc':
          result = result.slice().sort((a, b) => b.spaces - a.spaces);
          break;
      }

      return result;
    }
  }
});