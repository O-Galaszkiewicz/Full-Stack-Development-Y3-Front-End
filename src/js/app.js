const app = new Vue({
  el: '#app',
  data: {
    currentView: 'courses', // Determines which "page" is currently displayed: 'courses' or 'checkout'

    // All available courses with details:
    // subject - The topic being taught
    // location - Where the course takes place (can be physical or online)
    // price - Cost of the course
    // spaces - Number of available seats for that course
    // icon - Font Awesome icon representing the subject
    courses: [
      {
        subject: 'Mathematics',
        location: 'New York',
        price: 100,
        spaces: 30,
        icon: 'fas fa-calculator'
      },
      {
        subject: 'Physics',
        location: 'San Francisco',
        price: 120,
        spaces: 30,
        icon: 'fas fa-atom'
      },
      {
        subject: 'Art',
        location: 'Paris',
        price: 90,
        spaces: 30,
        icon: 'fas fa-palette'
      },
      {
        subject: 'Programming',
        location: 'Online',
        price: 150,
        spaces: 30,
        icon: 'fas fa-laptop-code'
      },
      {
        subject: 'Biology',
        location: 'London',
        price: 110,
        spaces: 30,
        icon: 'fas fa-dna'
      },
      {
        subject: 'Music',
        location: 'Berlin',
        price: 95,
        spaces: 30,
        icon: 'fas fa-music'
      },
      {
        subject: 'Chemistry',
        location: 'Toronto',
        price: 115,
        spaces: 30,
        icon: 'fas fa-vials'
      },
      {
        subject: 'History',
        location: 'Rome',
        price: 85,
        spaces: 30,
        icon: 'fas fa-landmark'
      },
      {
        subject: 'Philosophy',
        location: 'Athens',
        price: 80,
        spaces: 30,
        icon: 'fas fa-brain'
      },
      {
        subject: 'Design',
        location: 'Tokyo',
        price: 130,
        spaces: 30,
        icon: 'fas fa-pencil-ruler'
      },
      {
        subject: 'Economics',
        location: 'Singapore',
        price: 140,
        spaces: 30,
        icon: 'fas fa-chart-line'
      },
      {
        subject: 'Psychology',
        location: 'Los Angeles',
        price: 125,
        spaces: 30,
        icon: 'fas fa-user-graduate'
      },
      {
        subject: 'Literature',
        location: 'Dublin',
        price: 90,
        spaces: 30,
        icon: 'fas fa-book-open'
      },
      {
        subject: 'Engineering',
        location: 'Chicago',
        price: 160,
        spaces: 30,
        icon: 'fas fa-cogs'
      },
      {
        subject: 'Photography',
        location: 'Barcelona',
        price: 100,
        spaces: 30,
        icon: 'fas fa-camera-retro'
      },
      {
        subject: 'Astronomy',
        location: 'Sydney',
        price: 135,
        spaces: 30,
        icon: 'fas fa-star'
      },
      {
        subject: 'Geography',
        location: 'Cape Town',
        price: 105,
        spaces: 30,
        icon: 'fas fa-globe-americas'
      },
      {
        subject: 'Law',
        location: 'Washington D.C.',
        price: 150,
        spaces: 30,
        icon: 'fas fa-gavel'
      },
      {
        subject: 'Medicine',
        location: 'Zurich',
        price: 170,
        spaces: 30,
        icon: 'fas fa-stethoscope'
      },
      {
        subject: 'Business',
        location: 'Hong Kong',
        price: 145,
        spaces: 30,
        icon: 'fas fa-briefcase'
      }
    ],
    basket: [],         // Holds the list of courses the user has added to their shopping basket in an array. Each item: { course, quantity }
    showBasket: false,  // Controls whether the basket modal is visible

    // Temporary customer/order data used during checkout
    customerName: '',
    customerPhone: '',

    // Search and sorting options
    searchQuery: '',   // User-entered search text
    sortOption: ''     // Selected sorting option (price, subject, spaces, etc.)
  },

  methods: {
    // Switch to checkout
    checkout() {
      this.showBasket = false;
      this.currentView = 'checkout';
    },

    // Cancel checkout and go back
    cancelCheckout() {
      this.currentView = 'courses';
    },

    toggleBasket() {
      this.showBasket = !this.showBasket;
    },

    // Placeholder basket methods (defined in basket.js)
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
