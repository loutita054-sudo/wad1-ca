'use strict';

import logger from "../utils/logger.js";
import aboutStore from "../models/about-store.js";
import accounts from './accounts.js';

const about = {
  createView(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    logger.info("About page loading!");

    if (loggedInUser) {
      const viewData = {
        title: "About the Skincare App",
        fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
        employees: aboutStore.getAppInfo()
      };
      logger.info("View data", viewData.employees);
      response.render('about', viewData);
    } else {
      response.redirect('/');
    }
  },
};

export default about;
