/* eslint-disable */

const userStatement = `insert into users ( id, name, email, password, username, salt )
  values( :id, :name, :email, :password, :username, :salt)
  on conflict(username) do update
  set id = :id, name = :name, password = :password, username = :username, salt = :salt 
	returning *`;

const adminUser = {
	id: 1,
	name: 'Admin',
	email: 'admin@djarvys.com',
	password: '$2a$05$4qmupJd.gaSOpSco1TXIMe70OSc0ihCiTwjc0f8qmPklSfGsbdlru',
	username: 'admin',
	salt: '$2a$05$4qmupJd.gaSOpSco1TXIMe'
};

const roles = [
	'admin',
	'pharmaceutical'
];

const insertRoles = async(knex) => {
	let promises = [];
	roles.forEach( (code, idx) => {
		promises.push(insertRole( knex, { id: idx, code: code } ));
	});

	return Promise.all(promises);
};

const insertRole = async(knex, role) => {
	return await knex.raw(roleStatement, role)
};

const roleStatement = `insert into roles ( id, code ) values ( :id, :code )
	on conflict(code) do update
	set id = :id, code = :code
	returning *`;

const usersRolesStatement = `insert into users_roles ( user_id, role_id ) 
	values ( :userId, :roleId )
	returning *`;

const userRoleAdmin = {
	userId: 1,
	roleId: 1
}

exports.seed = function(knex, Promise) {
	// Deletes ALL existing entries
	return knex.raw(userStatement, adminUser)
		.then(() => {
			return insertRoles(knex);
		}).then(() => {
			return knex.raw(usersRolesStatement, userRoleAdmin);
		});
};
