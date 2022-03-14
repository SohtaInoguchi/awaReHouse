
exports.up = function(knex) {
    return knex.schema.createTable("payments", table =>{
        table.increments("transaction_id");
        table.string("covered_month").notNullable();
        table.string("provider_email").notNullable();
        table.integer("amount_jpy").notNullable();
        table.timestamps(true, true);
        })
};


exports.down = function(knex) {
    return knex.schema.dropTable("payments")
  
};
