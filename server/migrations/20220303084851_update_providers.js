
exports.up = function(knex) {
    return knex.schema.table("providers",table=>{
        table.string("email");
        table.string("picture_file");
    })
};


exports.down = function(knex) {
    return knex.schema.alterTable("providers", table=>{
        table.dropColumn("email");
        table.dropColumn("picture_file");
    })
};
