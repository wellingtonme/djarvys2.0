const getBasicStatics = fetchOptions => {
	fetchOptions = Object.assign({}, fetchOptions);

	return {
		save: function(payload) {
			return this.forge(payload).save();
		},
		get: function (id) {
			return this.forge({ id: id }).fetch(fetchOptions);
		},
		getAll: function (id) {
			return this.fetchAll(fetchOptions);
		}
	};
};

export default getBasicStatics;
