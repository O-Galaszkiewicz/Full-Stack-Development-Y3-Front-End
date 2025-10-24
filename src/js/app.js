new Vue({
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

    basket: [],         // Holds the list of courses the user has added to their shopping basket in an array
    showBasket: false,  // Controls whether the basket modal is visible

    // Temporary customer/order data used during checkout
    customerName: '',
    customerPhone: '',

    // Search and sorting options
    searchQuery: '',   // User-entered search text
    sortOption: ''     // Selected sorting option (price, subject, spaces, etc.)
  },

  methods: {
    // addToBasket - Adds a selected course to the user's basket if:
    // 1. The course isn't already there, and
    // 2. There are available spaces.
    // When added, one space is deducted from the course.
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

    // removeFromBasket - Removes a course from the basket based on its index,
    // then restores one available space to that course.
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

    // submitOrder - Validates the user’s name and phone input:
    // - Name must contain only letters and spaces.
    // - Phone must contain only numbers.
    // If valid, a confirmation alert is displayed.
    // The basket is then cleared and the user is redirected to the main course list.
    // Temporary validation solution, might add more user data for checkout page
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

      // Reset form and basket after checkout
      this.customerName = '';
      this.customerPhone = '';
      this.basket = [];
      this.currentView = 'courses';
    }
  },

  computed: {
    basketTotal() {
      return this.basket.reduce((total, course) => total + course.price, 0);
    },

    // filteredCourses - Returns a filtered and sorted version of the course list.
    // Filtering: Matches the user's search query against course subject, location, or price.
    // Sorting: Adjusts order based on the user's selected sort option.
    filteredCourses() {
      let result = this.courses;

      // Filter courses based on search query
      if (this.searchQuery.trim() !== '') {
        const query = this.searchQuery.toLowerCase();
        result = result.filter(course =>
          course.subject.toLowerCase().includes(query) ||
          course.location.toLowerCase().includes(query) ||
          String(course.price).includes(query)
        );
      }

      // Sort the filtered list based on selected sort option
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