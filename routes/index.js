'use strict';

module.exports = app => {
    require('../components/home').routes(app);
    require('../components/user').routes(app);
} 