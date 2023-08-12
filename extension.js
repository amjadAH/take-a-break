const vscode = require('vscode');

const actions = {
	takeABreak: "Take a break",
	giveMeMoreTime: "Give me more time",
}

const timeToTakeABreak = vscode.workspace.getConfiguration('timeOf').get('coding') * 60 * 1000;
const timeOfBreak = vscode.workspace.getConfiguration('timeOf').get('break') * 60 * 1000 
const timeOfSnooze = vscode.workspace.getConfiguration('timeOf').get('snooze') * 60 * 1000;

function activate() {
	startNewTimer(timeToTakeABreak);
}

function startNewTimer(time) {
	setTimeout(() => {
		vscode.window.showWarningMessage('Take a break', actions.takeABreak, actions.giveMeMoreTime)
		.then((selection) => {
			if (selection === actions.takeABreak) {
				vscode.window.showInformationMessage(
					`You should get back at ${new Date(Date.now() + timeOfBreak).toLocaleTimeString('en-GB', {timeStyle: 'short'})}`
				);
				startNewTimer(timeToTakeABreak + timeOfBreak);
			} else if (selection === actions.giveMeMoreTime) {
				startNewTimer(timeOfSnooze);
			} else {
				startNewTimer(timeToTakeABreak);
			}
		});
	}, time);
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
