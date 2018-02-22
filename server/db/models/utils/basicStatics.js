const _basic = {
	get: function (id) {
		return this.forge().get(id);
	},
	getAll: function (id) {
		return this.fetchAll();
	}
};

export default _basic;
