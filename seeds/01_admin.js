exports.seed = function(knex, Promise) {
  return knex.raw('DELETE FROM "admin"; ALTER SEQUENCE admin_id_seq RESTART WITH 5;')
    .then(function() {
      var admins = [{
        id: 1,
        name: 'Sally',
        email: 'sally@sally.com',
        password: 'sally'
      }, {
        id: 2,
        name: 'jj',
        email: 'jj@jj.com',
        password: 'jj'
      }, {
        id: 3,
        name: 'yousif',
        email: 'yousif@yousif.com',
        password: 'yousif'
      }, {
        id: 4,
        name: 'brian',
        email: 'brian@brian.com',
        password: 'brian'
      }];
      return knex('admin').insert(admins);
    });
};
