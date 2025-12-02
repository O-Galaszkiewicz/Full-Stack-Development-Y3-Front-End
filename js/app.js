const app = new Vue({
  el: '#app',
  data: {
    currentView: 'courses', // Determines which "page" is currently displayed: 'courses' or 'checkout'

    basket: [],         // Holds the list of courses the user has added to their shopping basket in an array. Each item: { course, quantity }
    showBasket: false,  // Controls whether the basket modal is visible

    customerName: '',
    customerPhone: '',

    // Search and sorting options
    searchQuery: '',   // User-entered search text
    sortOption: '',    // Selected sorting option (price, subject, spaces, etc.)

    courses: []
  },

  methods: {
    // Fetch course data from backend
    fetchCourses() {
      fetch("https://full-stack-development-y3-back-end.onrender.com/courses")
        .then(res => res.json())
        .then(data => {
          this.courses = data;
        })
        .catch(err => console.error("Failed to load courses:", err));
    },

    // PATCH request to update spaces in DB
    async updateCourseSpaces(courseId, newSpaces) {
      try {
        await fetch(
          `https://full-stack-development-y3-back-end.onrender.com/courses/${courseId}`,
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ spaces: newSpaces })
          }
        );
      } catch (err) {
        console.error("Error updating spaces:", err);
      }
    },

    // POST order to backend
    async sendOrder(orderData) {
      try {
        const response = await fetch(
          "https://full-stack-development-y3-back-end.onrender.com/orders",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(orderData)
          }
        );

        return await response.json();
      } catch (err) {
        console.error("Error sending order:", err);
      }
    },

    // Switch to checkout
    checkout() {
      this.showBasket = false;
      this.currentView = 'checkout';
    },

    cancelCheckout() {
      this.currentView = 'courses';
    },

    toggleBasket() {
      this.showBasket = !this.showBasket;
    },

    // Placeholder - real implementations are in basket.js
    addToBasket() { },
    removeFromBasket() { },
    increaseQuantity() { },
    decreaseQuantity() { },
    isInBasket() { }
  },

  computed: {
    basketTotal() {
      return this.basket.reduce((total, item) => total + item.course.price * item.quantity, 0);
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
        case 'location-asc':
          result = result.slice().sort((a, b) => a.location.localeCompare(b.location));
          break;
        case 'location-desc':
          result = result.slice().sort((a, b) => b.location.localeCompare(a.location));
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
  },

  created() {
    this.fetchCourses();   // Load backend courses on startup
  }
});