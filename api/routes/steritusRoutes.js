module.exports = app => {
  const steritus = require('../controllers/steritusController')

  // steritus Routes
  app.route('/sterilizers')
    .get(steritus.list_all_sterilizers)
    .post(steritus.create_a_sterilizer)


  app.route('/tasks/:taskId')
    .get(steritus.read_a_sterilizer)
    .put(steritus.update_a_sterilizer)
    .delete(steritus.delete_a_sterilizer)
}