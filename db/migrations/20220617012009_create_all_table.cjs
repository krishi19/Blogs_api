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
            table.timestamps();        
        })
        .createTable('blogImages', function (table) {
            table.increments();
            table.bigInteger('blog_id').references('id').inTable('blogs');
            table.string('image_url').nullable();
            table.timestamps();
        })
        .createTable('users', function (table) {
            table.increments();
            table.string('email').notNullable().unique();
            table.string('name').nullable();
            table.boolean('is_active').defaultTo(true);
            table.timestamps();
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
