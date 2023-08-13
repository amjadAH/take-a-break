const vscode = require('vscode');

const actions = {
	takeABreak: "Take a break",
	giveMeMoreTime: "Give me more time",
}

const timeToTakeABreak = vscode.workspace.getConfiguration('timeOf').get('coding') * 60 * 1000;
const timeOfBreak = vscode.workspace.getConfiguration('timeOf').get('break') * 60 * 1000; 
const timeOfSnooze = vscode.workspace.getConfiguration('timeOf').get('snooze') * 60 * 1000;

const item = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, -1);

function activate() {
	item.show();
	startNewTimer(timeToTakeABreak);
}

function startNewTimer(time) {
	updateStatusBar(`Next break at ${getFormattedTime(time)}`, 'statusBarItem.infoBackground')
	setTimeout(() => {
		vscode.window.showWarningMessage('Take a break', actions.takeABreak, actions.giveMeMoreTime)
		.then((selection) => {
			if (selection === actions.takeABreak) {
				takeABreak();
			} else if (selection === actions.giveMeMoreTime) {
				startNewTimer(timeOfSnooze)
			} else {
				startNewTimer(timeToTakeABreak);
			}
		});
	}, time);
}

function takeABreak() {
	var breakEndsAt = getFormattedTime(timeOfBreak);
	updateStatusBar(`Break ends at ${breakEndsAt}`, 'statusBarItem.errorBackground');
	vscode.window.showInformationMessage(`You should get back at ${breakEndsAt}`);
	setTimeout(() => {
		startNewTimer(timeToTakeABreak);
	}, timeOfBreak);
}

function updateStatusBar(message, backgroundColor) {
	item.text = message;
	item.backgroundColor = new vscode.ThemeColor(backgroundColor)
}

function getFormattedTime(time) {
	return new Date(Date.now() + time).toLocaleTimeString('en-GB', { timeStyle: 'short' });
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
