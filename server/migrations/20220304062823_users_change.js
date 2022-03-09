exports.up = function(knex) {
    return knex.schema.alterTable("users",table=>{
        table.text("picture_file").alter();
    })
};


exports.down = function(knex) {
    return knex.schema.alterTable("users",table=>{
        table.string("picture_file").alter();
    })
};