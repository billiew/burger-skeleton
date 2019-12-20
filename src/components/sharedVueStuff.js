'use strict';

// Stuff that is used both in the ordering system and in the kitchen
var sharedVueStuff = {
  data: function () {
    return {
      orders: {},
      uiLabels: {},
      ingredients: {},
      lang: "en",
      view: 'que'
    }
  },
  created: function () {
    this.$store.state.socket.on('initialize', function (data) {
      this.orders = data.orders;
      this.uiLabels = data.uiLabels;
      this.ingredients = data.ingredients;
    }.bind(this));

    this.$store.state.socket.on('switchLang', function (data) {
      this.uiLabels = data;
    }.bind(this));

    this.$store.state.socket.on('currentQueue', function (data) {
      this.orders = data.orders;
      if (typeof data.ingredients !== 'undefined') {
        this.ingredients = data.ingredients;
      }
    }.bind(this));
  },
  methods: {
    groupIngredients(ingredients) {
      let grouped = []
      for (let i = 0; i < ingredients.length; i += 1) {
        let newIngredient = true
        for (let j = 0; j < grouped.length; j += 1) {
          if (ingredients[i].ingredient_id === grouped[j].ing.ingredient_id) {
            grouped[j].count += 1;
            newIngredient = false;
            break;
          }
        }
        if (newIngredient)
          grouped.push({ing: ingredients[i], count: 1})
      }
      return grouped;
    },
    switchLang: function () {
      if (this.lang === "en") {
        this.lang = "sv";
      } else {
        this.lang = "en";
      }
      this.$store.state.socket.emit('switchLang', this.lang);
    },
    changeView: function(vie){
      this.view=vie;
    }
  }
};

export default sharedVueStuff;
