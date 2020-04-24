exports.up = function(knex) {
    return knex.schema.createTable('residences', function (table) {
        table.increments()
        table.string('city').notNullable()
        table.string('district').notNullable()
        table.string('street').notNullable()
        table.string('house_number').notNullable()
        table.string('uf', 2).notNullable()
        table.string('title').notNullable()
        table.string('description').notNullable()
        table.string('vacancies_number').notNullable()
        table.string('residents_number').notNullable()
        table.decimal('price').notNullable()

        table.string('user_id').notNullable()
        table.foreign('user_id').references('id').inTable('users')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('residences')
};
