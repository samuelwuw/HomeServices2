
exports.up = function(knex) {
    return knex.schema.createTable('servicoDisponiveis', function(table){
        //nomeServico, precoMedio, detalhes, servicoId, contratanteId
        table.string('nomeServico').notNullable();
        table.double('precoMedio').notNullable();
        table.string('detalhes').notNullable();        
        table.string('servicoId').primary();
        table.string('prestadorId').notNullable();

        table.foreign('prestadorId').references('id').inTable('usuarios');
      });
};

exports.down = function(knex) {
    return knex.schema.dropTable('servicoDisponiveis');
};
