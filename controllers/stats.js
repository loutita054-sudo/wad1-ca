"use strict";

import logger from "../utils/logger.js";
import skincareStore from "../models/skincare-store.js";
import accounts from './accounts.js';
import userStore from '../models/user-store.js';

const stats = {
  createView(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);

    if (loggedInUser) {
      logger.info("Stats page loading!");

      const skincareItems = skincareStore.getAllSkincare();
      const users = userStore.getAllUsers();

      let numSkincare = skincareItems.length;
      let numUsers = users.length; 
      let numProducts = skincareItems.reduce((total, skincare) => total + skincare.products.length, 0);
      let average = numSkincare > 0 ? (numProducts / numSkincare).toFixed(2) : 0;
      let totalRating = skincareItems.reduce((total, skincare) => total + parseInt(skincare.rating), 0);
      let avgRating = numSkincare > 0 ? totalRating / numSkincare : 0;
      let maxRating = Math.max(...skincareItems.map(skincare => skincare.rating));
      let maxRated = skincareItems.filter(skincare => skincare.rating === maxRating);
      let favCategories = maxRated.map(item => item.category);

      const statistics = {
        displayNumSkincare: numSkincare,
        displayNumProducts: numProducts,
        displayAverage: average,
        displayAvgRating: avgRating.toFixed(2),
        displayNumUsers: numUsers,
        highest: maxRating,
        displayFav: favCategories, 
        displayUsers: numUsers
      };

      const viewData = {
        title: "Skincare App Statistics",
        fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
        stats: statistics
      };

      response.render("stats", viewData);
    } else {
      response.redirect('/');
    }
  },
};

export default stats;