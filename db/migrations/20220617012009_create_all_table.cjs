/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
        .createTable('blogs', function (table) {
            table.increments();
            table.string('title').notNullable().unique();
            table.string('description').nullable();
            table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());      
            table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
        })
        .createTable('blogImages', function (table) {
            table.increments();
            table.bigInteger('blog_id').references('id').inTable('blogs');
            table.string('image_url').nullable();
            table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());      
            table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now()); 
        })
        .createTable('users', function (table) {
            table.increments();
            table.string('email').notNullable().unique();
            table.string('name').nullable();
            table.boolean('is_active').defaultTo(true);
            table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());      
            table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now()); 
        });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
      .dropTable("blogs")
      .dropTable("users")
      .dropTable("blogImages");
};
