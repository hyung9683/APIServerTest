import bldg from './bldg/index.js';
import poi from './poi/index.js';

const mountRoutes = (app) => {
    app.use('/bldg', bldg);
    app.use('/poi', poi);
};

export default {
    mountRoutes
}