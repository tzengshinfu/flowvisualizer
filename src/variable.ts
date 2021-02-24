export const C = '&lt;'; //because C looks like '<'
export const D = '&gt;'; //because D looks like '>'
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
}