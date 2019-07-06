const atmsController = require('./../controllers/atms.ctrl');
module.exports = (router) => {
  router
    .route('/atms/lat/:latitude/long/:longitude/radius/:radius')
    .get(atmsController.getAtmsWithinRadius);
}