
exports.up = function(knex) {
    return knex.schema.createTable("users", table =>{
        table.increments("user_id");
        table.string("first_name").notNullable();
        table.string("last_name").notNullable();
        table.string("password").notNullable();
        table.string("adress").notNullable();
        table.timestamps(true, true);
        })
};


exports.down = function(knex) {
    return knex.schema.dropTable("users")
  
};
