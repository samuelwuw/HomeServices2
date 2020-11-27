
exports.up = function(knex) {
    return knex.schema.createTable('servicoFeitos', function(table){
        //nomeServico, preco, detalhes, notaDoContratante, notaDoPrestador, relatorio, contratanteId, prestadorId
        table.string('nomeServico').notNullable();
        table.double('preco').notNullable();
        table.string('detalhes').notNullable();
        table.int('notaDoContratante').notNullable();
        table.int('notaDoPrestador').notNullable();
        table.string('relatorio').notNullable();
        table.string('servicoId').primary();
        table.string('contratanteId').notNullable();
        table.string('prestadorId').notNullable();

        table.foreign('contratanteId').references('id').inTable('usuarios');
        table.foreign('prestadorId').references('id').inTable('usuarios');
      });
};

exports.down = function(knex) {
    return knex.schema.dropTable('servicoFeitos');
};
