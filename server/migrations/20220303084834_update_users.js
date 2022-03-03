
exports.up = function(knex) {
    return knex.schema.table("users",table=>{
      table.string("picture_file");
  })
};


exports.down = function(knex) {
    return knex.schema.alterTable("users", table=>{
        table.dropColumn("picture_file")
    })
};
