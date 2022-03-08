
exports.up = function(knex) {
    return knex.schema.createTable("extraretrieval", table =>{
        table.string("retrieval_date").notNullable();
        table.string("user_email").notNullable();
        table.timestamps(true, true);
        })
};


exports.down = function(knex) {
    return knex.schema.dropTable("extraretrieval")
  
};
