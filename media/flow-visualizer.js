//@ts-check

/**
 * 顯示或關閉function敘述區塊
 * @param {HTMLAnchorElement} node
 */
function toggleFunctionStatementBlock(node) {
	hideAllFunctionStatementBlocks();
	document.querySelector(`div[data-function-id="${node.dataset.functionId}"]`).classList.toggle('lightbox');
}

/**
 * 關閉所有function敘述區塊
 */
function hideAllFunctionStatementBlocks() {
	document.querySelectorAll(`div[data-function-id]`).forEach((functionStatementWindow) => { functionStatementWindow.classList.remove('lightbox'); });
}

/**
 * 改變function敘述區塊參數提示文字內容
 * @param {string} functionName
 * @param {string} callFunctionParameterJson
 */
function changeFunctionStatementBlockParameterTooltips(functionName, callFunctionParameterJson) {
	const functionStatementWindow = /** @type {HTMLDivElement} */ (document.querySelector(`div[data-function-id="${functionName}"]`));

	if (functionStatementWindow) {
		const declareFunctionParameters = JSON.parse(functionStatementWindow.dataset.declareFunctionParameterJson.replace(/\\/g, ''));
		const callFunctionParameters = JSON.parse(callFunctionParameterJson);

		for (const [parameterIndex, declareFunctionParameter] of declareFunctionParameters.entries()) {
			const callFunctionParameter = callFunctionParameters[parameterIndex];
			const highlightFunctionParameters = Array.from(functionStatementWindow.querySelectorAll(`span[name="${declareFunctionParameter}"]`));

			for (const highlightFunctionParameter of highlightFunctionParameters) {
				const tooltipText = highlightFunctionParameter.querySelector('div.tooltip-text');

				if (tooltipText) {
					tooltipText.innerHTML = callFunctionParameter.replace(/"/g, `<span class="text-color-cyan-600">"</span>`).replace(/'/g, `<span class="text-color-orange-500">'</span>`);
				}
			}

			const openFunctionStatementWindowLinks = Array.from(functionStatementWindow.querySelectorAll(`a`));

			for (const openFunctionStatementWindowLink of openFunctionStatementWindowLinks) {
				const changeParameterTooltipsFunction = openFunctionStatementWindowLink.getAttribute('onclick');

				if (changeParameterTooltipsFunction) {
					openFunctionStatementWindowLink.setAttribute('onclick', changeParameterTooltipsFunction.replace(declareFunctionParameter, callFunctionParameter.replace(/\\/g, '\\\\').replace(/"/g, '\\' + '&quot;')));
				}
			}
		}
	}
}

/**
 * 顯示或關閉try敘述catch區塊
 * @param {HTMLAnchorElement} node
 */
function toggleCatchStatementBlock(node) {
	const tryStatementBlock = ((node) => {
		let parentNode = /** @type {HTMLElement} */ (node.parentNode);

		while (parentNode.getAttribute('name') !== 'TryStatement-block') {
			parentNode = /** @type {(HTMLTableCellElement|HTMLTableRowElement|HTMLTableElement)} */ (parentNode.parentNode);
		}

		return parentNode;
	})(node);
	const catachStatementLevels = tryStatementBlock.querySelectorAll('td[name="TryStatement-Catch-unit"], td[name="TryStatement-Catch-Body-unit"]');

	catachStatementLevels.forEach((catachStatementLevel) => { catachStatementLevel.classList.toggle('hide'); });
}

/**
 * 啟用或停止方向圖示動畫
 * @param {HTMLAnchorElement} node
 * @param {string} statementType
 */
function moveOrStopFlowIcon(node, statementType) {
	const parentStatementName = ((statementType) => {
		let parentStatementName = [];

		switch (statementType) {
			case 'ContinueStatement':
				parentStatementName = ['ForStatement-block', 'ForXStatement-block', 'DoWhileStatement-block', 'WhileStatement-block'];
				break;
			case 'BreakStatement':
				parentStatementName = ['ForStatement-block', 'ForXStatement-block', 'DoWhileStatement-block', 'WhileStatement-block', 'SwitchStatement-block'];
				break;
		}

		return parentStatementName;
	})(statementType);
	const parentStatementBlock = ((/** @type {HTMLAnchorElement} */ node, /** @type {string[]} */ parentStatementName) => {
		let parentNode = /** @type {HTMLElement} */ (node.parentNode);

		while (!parentStatementName.includes(parentNode.getAttribute('name'))) {
			parentNode = /** @type {HTMLElement} */ (parentNode.parentNode);
		}

		return parentNode;
	})(node, parentStatementName);

	switch (statementType) {
		case 'ContinueStatement': {
			const continueFlowIcon = Array.from(parentStatementBlock.querySelectorAll('img')).find((img) => {
				return img.getAttribute('name') ? img.getAttribute('name').startsWith(statementType) : false;
			});

			if (continueFlowIcon) {
				continueFlowIcon.classList.toggle('move-toleft');
			}

			break;
		}

		case 'BreakStatement': {
			const breakFlowIcon = Array.from(parentStatementBlock.parentNode.querySelectorAll('img')).find((img) => {
				return (img.getAttribute('name') ? img.getAttribute('name').startsWith(statementType) : false) && img.dataset.start === parentStatementBlock.dataset.start && img.dataset.end === parentStatementBlock.dataset.end;
			});

			if (breakFlowIcon) {
				breakFlowIcon.classList.toggle('move-todown');
			}

			break;
		}
	}
}

/**
 * 改變變數提示文字內容
 * @param {HTMLSpanElement} node
 */
function changeVariableDeclaratorTooltip(node) {
	const varialbleName = node.getAttribute('name');
	const variableValueNode = /** @type {HTMLTableCellElement} */(document.querySelector(`td[data-variable-name="${varialbleName}"]`));
	const isUndefined = ((/** @type {HTMLSpanElement} */ node, /** @type {HTMLTableCellElement} */variableValueNode) => {
		//未宣告變數
		if (!variableValueNode) {
			return true;
		}
		else {
			//在使用變數之前宣告
			if (parseInt(variableValueNode.dataset.start, 10) < parseInt(node.dataset.start, 10)) {
				return false;
			}
			//在使用變數之後宣告
			else {
				return true;
			}
		}

	})(node, variableValueNode);
	const tooltipTextNode = /** @type {HTMLDivElement} */(node.querySelector('div.tooltip-text'));

	if (tooltipTextNode) {
		if (!isUndefined) {
			const variableValue = variableValueNode.innerText.replace(';', '').trim();
			tooltipTextNode.innerHTML = variableValue.replace(/"/g, `<span class="text-color-cyan-600">"</span>`).replace(/'/g, `<span class="text-color-orange-500">'</span>`);
		}
		else {
			if (tooltipTextNode.innerText === /** @type {HTMLElement} */(tooltipTextNode.parentNode).getAttribute('name')) {
				tooltipTextNode.innerHTML = `<span class="text-color-purple-700"><i>undefined</i></span>`;
			}
		}
	}
}
