/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('message', table => {
    table.increments('message_id').primary().notNullable();
    table.string('message_email', 100).notNullable();
    table.string('message_content', 255).notNullable();
    table.dateTime('message_date').notNullable();
    table.string('message_socket_id', 45).notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('message');
};
