import getBasicInstance from './basicInstance';
import getBasicStatics from './basicStatics';

/**
 * Merge the passed options with the basic static methods
 * @param {Object} fetchOptions options the come along with the fetch methods
 * @param {Object} statics
 * @return {Object} the merged object
 */
const mergeBasicStatics = (fetchOptions, ...statics) => {
	return Object.assign({}, getBasicStatics(fetchOptions), statics.reduce((res, opt) => Object.assign(res, opt)));
};

/**
 * Merge the passed object on the basic instance methods and adds the table name
 * @param {String} tableName
 * @param {Object} opts
 * @return {Object} the merged object
 */
const mergeBasicInstance = (tableName, ...opts) => {
	return Object.assign({}, getBasicInstance(tableName), opts.reduce((res, opt) => Object.assign(res, opt)));
};

export { mergeBasicStatics, mergeBasicInstance };
