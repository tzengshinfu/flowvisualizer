export const DoubleQuote = "&quot;";

export enum CommentType {
	Leading = 'leading',
	Trailing = 'trailing',
}

export enum Key {
	Alternate = 'alternate',
	Test = 'test',
	Consequent = 'consequent',
	Body = 'body',
	Left = 'left',
	Right = 'right',
	Init = 'init',
	Update = 'update',
	Block = 'block',
	Callee = 'callee',
	Id = 'id',
	Handler = 'handler',
	Finalizer = 'finalizer',
}

export enum PathType {
	SwitchCase = 'SwitchCase',
	DoWhileStatement = 'DoWhileStatement',
	WhileStatement = 'WhileStatement',
	LabelStatement = 'LabelStatement',
	ForStatement = 'ForStatement',
	ForInStatement = 'ForInStatement',
	ForOfStatement = 'ForOfStatement',
	BreakStatement = 'BreakStatement',
	ContinueStatement = 'ContinueStatement',
	ReturnStatement = 'ReturnStatement',
	ThrowStatement = 'ThrowStatement',
	BlockStatement = 'BlockStatement',
	IfStatement = 'IfStatement',
	SingleLineStatement = 'SingleLineStatement',
	ExpressionStatement = 'ExpressionStatement',
	None = 'None',
	VariableStatement = 'VariableStatement',
}
