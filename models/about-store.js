'use strict';

import JsonStore from './json-store.js';

const aboutStore = {

  store: new JsonStore('./models/About.json', { employees: [] }),
  collection: 'employees',

  getAppInfo() {
    return this.store.findAll(this.collection);
  },

};

export default aboutStore;