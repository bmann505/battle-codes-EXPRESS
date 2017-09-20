exports.up = function(knex, Promise) {
  return knex.schema.createTable('admin', (table) => {
    table.increments();
    table.text('name').notNullable();
    table.text('email').notNullable();
    table.text('password').notNullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('admin');
};
