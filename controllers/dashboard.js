'use strict';

import { v4 as uuidv4 } from 'uuid';
import logger from "../utils/logger.js";
import skincareStore from "../models/skincare-store.js";
import accounts from './accounts.js';

const dashboard = {
  index(request, response) {
    logger.info("Dashboard page loading!");

    const loggedInUser = accounts.getCurrentUser(request);

    if (loggedInUser) {
      const searchTerm = request.query.searchTerm || "";

      const skincareItems = searchTerm
        ? skincareStore.searchUserSkincare(searchTerm, loggedInUser.id)
        : skincareStore.getUserSkincare(loggedInUser.id);

      const sortField = request.query.sort;
      const order = request.query.order === "desc" ? -1 : 1;

      let sorted = skincareItems;

      if (sortField) {
        sorted = skincareItems.slice().sort((a, b) => {
          if (sortField === "category") {
            return a.category.localeCompare(b.category) * order;
          }
          if (sortField === "rating") {
            return (a.rating - b.rating) * order;
          }
          return 0;
        });
      }

      const viewData = {
        title: "Skincare App Dashboard",
        fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
        skincareItems: sortField ? sorted : skincareItems,
        search: searchTerm,
        categorySelected: request.query.sort === "category",
        ratingSelected: request.query.sort === "rating",
        ascSelected: request.query.order === "asc",
        descSelected: request.query.order === "desc",
      };

      logger.info('about to render', viewData.skincareItems);
      response.render('dashboard', viewData);
    } else {
      response.redirect('/');
    }
  },

  addSkincareItem(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const timestamp = new Date();

    const newskincare = {
      userid: loggedInUser.id,
      id: uuidv4(),
      category: request.body.category,
      rating: parseInt(request.body.rating),
      date: timestamp,
      products: []
    };

    skincareStore.addSkincareItem(newskincare);
    response.redirect('/dashboard');
  },

  addSkincare(request, response) {
    const skincareId = request.params.id;
    logger.debug(`Adding Skincare ${skincareId}`);
    skincareStore.addSkincare(skincareId);
    response.redirect('/dashboard');
  },

  deleteSkincare(request, response) {
    const skincareId = request.params.id;
    logger.debug(`Deleting Skincare ${skincareId}`);
    skincareStore.removeSkincare(skincareId);
    response.redirect('/dashboard');
  },
};

export default dashboard;