
exports.up = function(knex) {
    return knex.schema.alterTable("extra",table=>{
        table.dropColumn("user_email");
        table.dropColumn("box_id");
    })
};


exports.down = function(knex) {
    return knex.schema.table("extra", table=>{
        table.string("user_email");
        table.dropColumn("box_id");
    })
};
