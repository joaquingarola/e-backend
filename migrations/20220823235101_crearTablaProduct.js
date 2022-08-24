/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('product', table => {
    table.increments('product_id').primary().notNullable();
    table.string('product_name', 100).notNullable();
    table.decimal('product_price', 10).notNullable();
    table.string('product_thumbnail', 255).notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('product');
};
