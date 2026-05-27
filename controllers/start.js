'use strict';

import logger from "../utils/logger.js";
import appStore from "../models/app-store.js";
import accounts from './accounts.js';

const start = {
  createView(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    logger.info("Start page loading!");

    if (loggedInUser) {
      const viewData = {
        title: "Skincare App",
        fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
        info: appStore.getAppInfo()
      };
      logger.info("View data", viewData.info);
      response.render('start', viewData);
    } else {
      response.redirect('/');
    }
  },
};

export default start;






