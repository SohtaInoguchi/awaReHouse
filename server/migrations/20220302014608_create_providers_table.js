
exports.up = function(knex) {
    return knex.schema.createTable("providers", table =>{
        table.increments("provider_id");
        table.string("first_name").notNullable();
        table.string("last_name").notNullable();
        table.string("password").notNullable();
        table.string("adress").notNullable();
        table.string("bank_reference").notNullable();
        table.string("emergency_contact_person").notNullable();
        table.string("emergency_contact_phone_number").notNullable();
        table.timestamps(true, true);
        })
};


exports.down = function(knex) {
    return knex.schema.dropTable("providers")
  
};
