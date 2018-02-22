
exports.up = function(knex, Promise) {
	return knex.schema.createTable('users', table => {
		table.increments('id').primary();
		table.string('name');
		table.string('email').unique().notNullable();
		table.string('username').unique().notNullable();
		table.string('password');
		table.string('salt');
		table.timestamps(true, true);
	}).createTable('roles', table => {
		table.increments('id').primary();
		table.string('code').unique().notNullable();
		table.timestamps(true, true);
	}).createTable('users_roles', table => {
		table.integer('user_id').references('users.id');
		table.integer('role_id').references('roles.id');
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTable('users_roles')
		.dropTable('users')
		.dropTable('roles');
};
