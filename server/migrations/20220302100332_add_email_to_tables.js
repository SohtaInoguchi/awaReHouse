
exports.up = function(knex) {
  return knex.schema.table("users",table=>{
      table.string("email");
  })
};


exports.down = function(knex) {
  return knex.schema.alterTable("users", table=>{
      table.dropColumn("email")
  })
};
