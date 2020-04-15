
exports.up = function(knex) {
  return knex.schema.createTable('cars', tbl => {
      tbl.increments('id');
      tbl.integer('VIN').notNullable().unique().index();
      tbl.string('make');
      tbl.string('model');
      tbl.integer('mileage');

  })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('cars');
  
};
