export const C = '%7B'; //because C looks like '{'
export const B = '%7D'; //because D looks like '}'
export let Count = 0;

export enum CommentType {
	Leading = 'leading',
	Trailing = 'trailing',
}

export enum Key {
	Alternate = 'alternate',
	Test = 'test',
	Consequent = 'consequent',
}

export enum PathType {
	SwitchCase = 'SwitchCase',
	DoWhileStatement = 'DoWhileStatement',
	WhileStatement = 'WhileStatement',
	LabelStatement = 'LabelStatement',
	ForStatement = 'ForStatement',
	ForInStatement = 'ForInStatement',
	ForOfStatement = 'ForOfStatement',
}
