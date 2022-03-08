
exports.up = function(knex) {
    return knex.schema.table("extra",table=>{
        table.string("requiring_user_email");
        table.string("declared_content_one");
        table.string("declared_content_two");
        table.string("declared_content_three");
    })
};


exports.down = function(knex) {
    return knex.schema.alterTable("extra", table=>{
        table.dropColumn("requiring_user_email");
        table.dropColumn("declared_content_one");
        table.dropColumn("declared_content_two");
        table.dropColumn("declared_content_three");
    })
};
