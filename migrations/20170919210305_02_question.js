exports.up = function(knex, Promise) {
  return knex.schema.createTable('question', (table) => {
    table.increments();
    table.text('category').notNullable();
    table.text('question_title').notNullable();
    table.text('answer').notNullable();
    table.integer('admin_id').references('admin.id').onDelete('cascade');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('question');
};
