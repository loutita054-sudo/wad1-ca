'use strict';

import express from 'express';
import logger from "./utils/logger.js";

const router = express.Router();

import start from './controllers/start.js';
import about from './controllers/about.js';
import dashboard from './controllers/dashboard.js';
import skincare from './controllers/skincare.js';
import stats from './controllers/stats.js';
import accounts from './controllers/accounts.js';


router.get('/start', start.createView);
router.get('/about', about.createView);


router.get('/dashboard', dashboard.index);
router.post('/dashboard/addskincare', dashboard.addSkincareItem);
router.get('/dashboard/deleteskincare/:id', dashboard.deleteSkincare);


router.get('/skincare/:id', skincare.createView);
router.post('/category/:id/addproduct', skincare.addProduct);
router.get('/skincare/:id/deleteproduct/:productid', skincare.deleteProduct);


router.get('/stats', stats.createView);

router.get('/', accounts.index);
router.get('/login', accounts.login);
router.get('/signup', accounts.signup);
router.get('/logout', accounts.logout);
router.post('/register', accounts.register);
router.post('/authenticate', accounts.authenticate);

export default router;