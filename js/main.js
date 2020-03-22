'use sctrict';

let startBtn = document.getElementById('start'),
	budgetValue = document.querySelector('.budget-value'),
	daybudgetValue = document.querySelector('.daybudget-value'),
	levelValue = document.querySelector('.level-value'),
	expensesValue = document.querySelector('.expenses-value'),
	optionalExpensesValue = document.querySelector('.optionalexpenses-value'),
	incomeValue = document.querySelector('.income-value'),
	monthsavingsValue = document.querySelector('.monthsavings-value'),
	yearsavingsValue = document.querySelector('.yearsavings-value'),
	expensesItemInputs = document.querySelectorAll('.expenses-item'),
	expensesItemBtn = document.querySelector('.expenses-item-btn'),
	optionalExpensesBtn = document.querySelector('.optionalexpenses-btn'),
	countBudgetBtn = document.querySelector('.count-budget-btn'),
	optionalExpensesInputs = document.querySelectorAll('.optionalexpenses-item'),
	chooseIncomeInput = document.querySelector('.choose-income'),
	savings = document.querySelector('#savings'),
	sumSavings = document.querySelector('#sum'),
	percentSavings = document.querySelector('#percent'),
	yearValue = document.querySelector('.year-value'),
	monthValue = document.querySelector('.month-value'),
	dayValue = document.querySelector('.day-value');



let money, time;


startBtn.addEventListener('click', function () {


	expensesItemBtn.removeAttribute('disabled');
	for (let i = 0; i < expensesItemInputs.length; i++) {
		expensesItemInputs[i].removeAttribute('disabled');
	}
	optionalExpensesBtn.removeAttribute('disabled');
	for (let i = 0; i < optionalExpensesInputs.length; i++) {
		optionalExpensesInputs[i].removeAttribute('disabled');
	}
	chooseIncomeInput.removeAttribute('disabled');
	savings.removeAttribute('disabled');
	sumSavings.removeAttribute('disabled');
	percentSavings.removeAttribute('disabled');


	time = prompt("Введиет дату в формате YYYY-MM-DD", "2020-02-02");
	money = +prompt("Ваш бюджет на месяц", "50000");

	while (isNaN(money) || money == '' || money == null) {
		money = +prompt("Ваш бюджет на месяц", "");
	}
	appData.budget = money;
	appData.timeData = time;

	budgetValue.textContent = money.toFixed();

	yearValue.value = new Date(Date.parse(time)).getFullYear();
	monthValue.value = new Date(Date.parse(time)).getMonth() + 1;
	dayValue.value = new Date(Date.parse(time)).getDate();
});

expensesItemBtn.addEventListener('click', () => {
	let sum = 0;

	for (let i = 0; i < expensesItemInputs.length; i++) {
		let question = expensesItemInputs[i].value,
			answer = expensesItemInputs[++i].value;
		if (typeof (question) === 'string' && typeof (question) != null && typeof (answer) != null && question != '' && answer != '' && question.length < 50) {
			appData.expenses[question] = answer;
			sum += +answer;
			expensesValue.textContent = sum;
		}
	}
});

optionalExpensesBtn.addEventListener('click', () => {

	for (let i = 0; i < optionalExpensesInputs.length; i++) {
		let opt = optionalExpensesInputs[i].value;

		if (typeof (opt) === 'string' && opt.length < 50) {
			appData.optionalExpenses[i] = opt;
			optionalExpensesValue.textContent += appData.optionalExpenses[i] + ' ';
		}

	}
});


countBudgetBtn.addEventListener('click', () => {

	if (appData.budget != undefined) {
		appData.moneyPerDay = ((appData.budget - +expensesValue.textContent) / 30).toFixed();
		daybudgetValue.textContent = +appData.moneyPerDay;

		if (appData.moneyPerDay < 100) {
			levelValue.textContent = "Минимальный уровень достатка";
		} else if (100 < appData.moneyPerDay < 2000) {
			levelValue.textContent = "Средний уровень достатка";
		} else if (appData.moneyPerDay > 2000) {
			levelValue.textContent = "Приличный уровень достатка, мне б такой";
		}
	} else {
		daybudgetValue.textContent = "Начните расчет";
	}
});

chooseIncomeInput.addEventListener('input', () => {
	let items = chooseIncomeInput.value;
	if (typeof (items) === 'string' && typeof (items) != null && items != '' && items.length < 50) {
		appData.income = items.split(', ');
	}
	incomeValue.textContent = appData.income;
});

savings.addEventListener('click', () => {

	if (!appData.savings) {
		appData.savings = true;
	} else {
		appData.savings = false;
	}
});

sumSavings.addEventListener('input', () => {
	if (appData.savings) {
		let sum = +sumSavings.value,
			percent = +percentSavings.value;

		appData.monthIncome = sum / 100 / 12 * percent;
		monthsavingsValue.textContent = appData.monthIncome.toFixed(2);
		appData.yearIncome = sum / 100 * percent;
		yearsavingsValue.textContent = appData.yearIncome.toFixed(2);
	}
});

percentSavings.addEventListener('input', () => {
	if (appData.savings) {
		let sum = +sumSavings.value,
			percent = +percentSavings.value;

		appData.monthIncome = sum / 100 / 12 * percent;
		monthsavingsValue.textContent = appData.monthIncome.toFixed(2);
		appData.yearIncome = sum / 100 * percent;
		yearsavingsValue.textContent = appData.yearIncome.toFixed(2);
	}
});

let appData = {
	budget: money,
	timeData: time,
	expenses: {},
	optionalExpenses: {},
	income: [],
	savings: false,
};