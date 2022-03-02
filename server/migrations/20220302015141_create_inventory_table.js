
exports.up = function(knex) {
    return knex.schema.createTable("inventory", table =>{
        table.increments("box_id");
        table.string("declared_content_one").notNullable();
        table.string("declared_content_two");
        table.string("declared_content_three");
        table.string("storage_location").notNullable();
        table.decimal("weight_in_kg", 4,2).notNullable();
        table.boolean("declared_as_fragile").notNullable();
        table.string("expected_retrieval_season").notNullable();
        table.integer("user_owner").notNullable();
        table.timestamps(true, true);
        })
};


exports.down = function(knex) {
    return knex.schema.dropTable("inventory")
  
};
