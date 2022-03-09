exports.up = function(knex) {
    return knex.schema.alterTable("providers",table=>{
        table.text("picture_file").alter();
    })
};


exports.down = function(knex) {
    return knex.schema.alterTable("providers",table=>{
        table.string("picture_file").alter();
    })
};