new Vue({
  el: '#app',
  data: {
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
    basket: []
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
    }
  },
  computed: {
    basketTotal() {
      return this.basket.reduce((total, course) => total + course.price, 0);
    }
  }
});
