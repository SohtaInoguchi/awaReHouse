
exports.up = function(knex) {
    return knex.schema.alterTable("inventory",table=>{
        table.string("user_owner").alter();
    })
};


exports.down = function(knex) {
    return knex.schema.alterTable("inventory",table=>{
        table.integer("user_owner").alter();
    })
};
