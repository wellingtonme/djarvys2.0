import { mergeBasicStatics, mergeBasicInstance } from './utils';
import bookshelf from './orm';

const Roles = bookshelf.Model.extend(
	mergeBasicInstance('roles'),
	mergeBasicStatics(null, {})
);

export default bookshelf.model('Roles', Roles);
