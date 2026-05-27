'use strict';

import logger from '../utils/logger.js';
import skincareStore from '../models/skincare-store.js';
import { v4 as uuidv4 } from 'uuid';
import accounts from './accounts.js';

const skincare = {
  createView(request, response) {
    const skincareId = request.params.id;
    const loggedInUser = accounts.getCurrentUser(request);
    logger.debug(`Skincare id = ${skincareId}`);

    const viewData = {
      title: 'Skincare',
      fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
      singleSkincare: skincareStore.getSkincare(skincareId)
    };
    logger.debug(viewData.singleSkincare);
    response.render('skincare', viewData);
  },

  addProduct(request, response) {
    const skincareId = request.params.id;
    const newProduct = {
      id: uuidv4(),
      product: request.body.title,
      brand: request.body.brand,
    };
    skincareStore.addProduct(skincareId, newProduct);
    response.redirect('/skincare/' + skincareId);
  },

  deleteProduct(request, response) {
    const skincareId = request.params.id;
    const productId = request.params.productid;
    logger.debug(`Deleting Product ${productId} from Skincare ${skincareId}`);
    skincareStore.removeProduct(skincareId, productId);
    response.redirect('/skincare/' + skincareId);
  },
};

export default skincare;

