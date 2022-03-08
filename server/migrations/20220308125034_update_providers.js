exports.up = function (knex) {
  return knex.schema.table("providers", (table) => {
    table.integer("floor");
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable("providers", (table) => {
    table.dropColumn("floor");
  });
};
