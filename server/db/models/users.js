import { mergeBasicStatics, mergeBasicInstance } from './utils';
import bookshelf from './orm';
import bcrypt from 'bcrypt-nodejs';
import Roles from './Roles.js';

const fetchOptions = { require: true, withRelated: ['roles'] };

const instanceMethods = {
	roles: function () {
		return this.belongsToMany(Roles, 'users_roles', 'user_id', 'role_id');
	},
	hashPassword: function () {
		let password = this.get('password');
		let salt = this.genSaltSync(5);
		let hashPassword = bcrypt.hashSync(password, salt);

		this.set('password', hashPassword);
		this.set('salt', salt);

		return this;
	},
	isValidPassword: function (password) {
		let storedPassword = this.get('password');
		return bcrypt.compareSync(password, storedPassword);
	}
};

const staticMethods = {
	save: function (payload) {
		return this.forge(payload).hashPassword().save();
	},
	getByUserName: function (username) {
		return this.forge({ username: username }).fetch(fetchOptions);
	}
};

const User = bookshelf.Model.extend(
	mergeBasicInstance('users', instanceMethods),
	mergeBasicStatics(fetchOptions, staticMethods)
);

export default bookshelf.model('User', User);
