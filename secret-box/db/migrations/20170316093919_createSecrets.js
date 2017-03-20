exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('owners', function(table) {
            table.increments('id').primary();
            table.string('name');

            table.timestamps();
        }),

        knex.schema.createTable('secrets', function(table){
            table.string('id').primary();
            table.string('message');
            table.integer('owner_id')
                 .references('id')
                 .inTable('owners');

            table.timestamps();
        })
    ])
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('owners'),
        knex.schema.dropTable('secrets')
    ])
};
