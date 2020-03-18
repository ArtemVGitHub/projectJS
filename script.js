'use sctrict';

let money, time;

function start() {
    money = +prompt("Ваш бюджет на месяц", "50000");
    time = prompt("Введиет дату в формате YYYY-MM-DD", "2020-02-02");

    while (isNaN(money) || money == '' || money == null) {
        money = +prompt("Ваш бюджет на месяц", "");
    }
}

start();

let appData = {
    budget: money,
    timeData: time,
    expenses: {},
    optionalExpenses: {},
    income: [],
    savings: true,
    chooseExpenses: function () {
        for (let i = 0; i < 2; i++) {
            let question = prompt("Введите обязательную статью расходов в этом месяце", 'ЖКХ'),
                answer = prompt("Во сколько обойдется?", '');
            if (typeof (question) === 'string' && typeof (question) != null && typeof (answer) != null && question != '' && answer != '' & question.length < 50) {
                appData.expenses[question] = answer;
            } else {
                i--;
            }
        }
    },
    detectDayBudget: function () {
        appData.moneyPerDay = (appData.budget / 30).toFixed();
        alert('Ежедневный бюджет: ' + appData.moneyPerDay);
    },
    detectLevel: function () {
        if (appData.moneyPerDay < 100) {
            console.log("Минимальный уровень достатка");
        } else if (100 < appData.moneyPerDay < 2000) {
            console.log("Средний уровень достатка");
        } else if (appData.moneyPerDay > 2000) {
            console.log("Приличный уровень достатка, мне б такой");
        }
    },
    checkSavings: function () {
        if (appData.savings == true) {
            let save = +prompt("Какова сумма накоплений?", ''),
                percent = +prompt("Под какой процент?");

            appData.monthIncome = save / 100 / 12 * percent;
            alert("Доход в месяц с депозита: " + appData.monthIncome);
        }
    },
    chooseOptExpenses: function () {
        for (let i = 0; i < 3; i++) {
            let answer = prompt("Статья необязательных расходов?");

            if (typeof (answer) === 'string' && answer.length < 50) {
                let a = i + 1;
                appData.optionalExpenses[a] = answer;
            }
        }
    },
};