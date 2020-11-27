
exports.up = function(knex) {
    return knex.schema.createTable('usuarios', function(table){
        table.string('name').notNullable();
        table.string('password').notNullable();
        table.string('email').primary();
        table.string('id').primary();
        table.string('tipo').notNullable();
      });
};

exports.down = function(knex) {
    return knex.schema.dropTable('usuarios');
};
