'use strict';

import logger from '../utils/logger.js';
import JsonStore from './json-store.js';

const skincareStore = {

  store: new JsonStore('./models/skincare-store.json', { skincareCollection: [] }),
  collection: 'skincareCollection',
  array: 'products',

  getAllSkincare() {
    return this.store.findAll(this.collection);
  },

  getSkincare(id) {
    return this.store.findOneBy(this.collection, (item) => item.id === id);
  },

  async addSkincareItem(item) {
    item.date = new Date().toISOString();
    await this.store.addCollection(this.collection, item);
  },

  addProduct(id, product) {
    this.store.addItem(this.collection, id, this.array, product);
  },

  removeProduct(id, productId) {
    this.store.removeItem(this.collection, id, this.array, productId);
  },

  removeSkincare(id) {
    const skincare = this.getSkincare(id);
    this.store.removeCollection(this.collection, skincare);
  },

  getUserSkincare(userid) {
    return this.store.findBy(this.collection, (skincare => skincare.userid === userid));
  },

  searchUserSkincare(search, userid) {
    return this.store.findBy(
      this.collection,
      (skincare => skincare.userid === userid && skincare.category.toLowerCase().includes(search.toLowerCase())))
  },

};

export default skincareStore;