'use strict';

let buttonCalculate = document.getElementById("start");
let buttonCancel = document.getElementById("cancel");
let incomesPlus = document.getElementsByTagName("button")[0];
let expensesPlus = document.getElementsByTagName("button")[1];
let checkBox = document.querySelector("#deposit-check");
let checkMark = document.querySelector(".deposit-checkmark");
let possibleIncomesNames = document.querySelectorAll(".additional_income-item");
let budgetDay = document.getElementsByClassName("budget_day-value")[0];
let expensesMonth = document.getElementsByClassName("expenses_month-value")[0];
let addIncomesValues = document.getElementsByClassName("additional_income-value")[0];
let addExpensesValues = document.getElementsByClassName("additional_expenses-value")[0];
let incomeValueOfPeriod = document.getElementsByClassName("income_period-value")[0];
let targetMonth = document.getElementsByClassName("target_month-value")[0];
let budgetMonth = document.querySelector(".budget_month-value");
let salary = document.querySelector(".salary-amount");
let addIncomeName = document.querySelectorAll(".income-title")[1];
let addIncomeNameAmount = document.querySelector(".income-amount");
let obligatoryExpensesName = document.querySelectorAll(".expenses-title")[1];
let expensesItems = document.querySelectorAll(".expenses-items");
let possibleExpenses = document.querySelector(".additional_expenses-item");
let targetAmount = document.querySelector(".target-amount");
let rangePeriod = document.querySelector(".period-select");
let rangePeriodAmount = document.querySelector(".period-amount");
let incomeItems = document.querySelectorAll('.income-items');



//all data types return true except number.

let isNumber = function(n){
	return !isNaN(parseFloat(n)) && isFinite(n) ;
};

buttonCalculate.disabled = true;

let appData = {
	budget: 0,
	budgetDay: 0,
	budgetMonth: 0,
	expensesMonth: 0,
	income: {},
	incomeMonth: 0,
	addIncome: [],
	expenses: {},
	addExpenses: [],
	deposit: false,
	percentDeposit: 0,
	moneyDeposit: 0,
	start: function () {
		buttonCalculate.style.display ='none';
		buttonCancel.style.display ='block';
		buttonCancel.addEventListener('click', this.reset);


		this.budget = +salary.value;
		this.getExpenses();
		this.getIncome();
		this.getExpensesMonth();
		this.getAddExpenses();
		this.getAddIncomes();
		this.getBudget();

		this.showResult();

	},
	showResult: function(){
		budgetMonth.value = this.budgetMonth;
		budgetDay.value = this.budgetDay;
		expensesMonth.value = this.expensesMonth;
		addExpensesValues.value = this.addExpenses.join(', ');
		addIncomesValues.value = this.addIncome.join(', ');
		targetMonth.value = Math.ceil(this.getTargetMonth());
		incomeValueOfPeriod.value = this.calcPeriod();

		rangePeriod.addEventListener('change', function(event){
			incomeValueOfPeriod.value = appData.calcPeriod();
		});


	},
	addExpensesBlock: function(){      
		let cloneExpensesItem = expensesItems[0].cloneNode(true);
		expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
		expensesItems = document.querySelectorAll(".expenses-items");
		if(expensesItems.length === 3){
			expensesPlus.style.display = 'none';
		}
	},
	getExpenses: function(){
		expensesItems.forEach(function(item){
			let itemExpences = item.querySelector('.expenses-title').value;
			let cashExpences = item.querySelector('.expenses-amount').value;
			if(itemExpences !== '' && cashExpences !== ''){
				appData.expenses[itemExpences] = cashExpences;
			}
		});
	},
	addIncomesBlock: function(){
		let cloneExpensesItem = incomeItems[0].cloneNode(true); 
		incomeItems[0].parentNode.insertBefore(cloneExpensesItem, incomesPlus);
		incomeItems = document.querySelectorAll(".income-items");

		if(incomeItems.length === 3){
			incomesPlus.style.display = 'none';
		}
	},
	getIncome: function(){

		incomeItems.forEach(function(item){
			let itemIncome = item.querySelector('.income-title').value;
			let cashIncome = item.querySelector('.income-amount').value;
			if(itemIncome !== '' && cashIncome !== ''){
				appData.income[itemIncome] = cashIncome;
			}
		});
		
		for( let key in appData.income){
			appData.incomeMonth += +appData.income[key];
		}

	},
	getAddExpenses: function(){
		let additionalExpenses = possibleExpenses.value.split(',');
		additionalExpenses.forEach(function(item){
			item = item.trim();
			if(item !== ''){
				appData.addExpenses.push(item);
			}
		})
	},   
	getAddIncomes: function(){
		possibleIncomesNames.forEach(function(item){
			let itemValue = item.value.trim();
			if(itemValue !== ''){
				appData.addIncome.push(itemValue);
			};
		});
	}, 
	getExpensesMonth: function () {
		for (let key in appData.expenses) {
			appData.expensesMonth += +appData.expenses[key];
		}
	},
	getBudget: function () {
		this.budgetMonth = this.budget + appData.incomeMonth - this.expensesMonth;
		this.budgetDay = Math.floor(this.budgetMonth / 30);
	},

	getTargetMonth: function () {
		return targetAmount.value / this.budgetMonth;
	},
	getStatusIncome: function () {
		if (this.budgetDay >= 1200) {
			console.log("У вас высокий уровень дохода 🤑");
		} else if (this.budgetDay >= 600 && this.budgetDay < 1200) {
			console.log("У вас средний уровень дохода :wink:");
		} else if (this.budgetDay >= 0 && this.budgetDay < 600) {
			console.log("К сожалению у вас уровень дохода ниже среднего :sleepy:");
		} else {
			console.log("Что то пошло не так 🧐");
		}
	},
	getInfoDeposit: function(){
		/*appData.deposit = confirm("Есть ли у вас депозит в банке?");
		*/
		if(appData.deposit){
			do {
				appData.percentDeposit = prompt("Какой годовой процент?", "10");
			} while(!isNumber(appData.percentDeposit));

			do {
				appData.moneyDeposit = prompt("Какая сумма заложена?", 10000);
			}while(!isNumber(appData.moneyDeposit));
		}
	},
	calcPeriod: function () {
		return this.budgetMonth * rangePeriod.value;
	},
	blockLeftInputs: function () {
		let inputs = document.querySelector('.data').querySelectorAll('input[type=text]');
		inputs.forEach(function(item){
			item.disabled = true;
		});
		let btnPlus = document.querySelectorAll('.btn_plus');
		btnPlus.forEach(function(item){
			item.disabled = true;
		});
	},
	reset: function () {
		let inputs = document.querySelector('.data').querySelectorAll('input[type=text]');
		inputs.forEach(function(item){
			item.value = '';
			item.disabled = false;
		});
		rangePeriodAmount.textContent = "1";
		rangePeriod.value = "1";
		buttonCancel.style.display ='none';
		buttonCalculate.style.display ='block';

		let addedIncomesBlock = document.querySelector('.income');
		let addedIncomes = document.querySelectorAll('.income-items');
		console.log(addedIncomes);
        console.log(addedIncomes.length);
		/*if(addedIncomes.length === 3){
			addedIncomesBlock[0].removeChild(addedIncomes[1]);
			addedIncomesBlock[0].removeChild(addedIncomes[2]);
		}else if(addedIncomes.length === 2){
			addedIncomesBlock[0].removeChild(addedIncomes[1]);
		}else{
			alert('only one');
		}*/
		for(let i = 1; i<addedIncomes.lenght; i++){
			addedIncomesBlock.removeChild(addedIncomes[i]);
		}


	}
};



salary.addEventListener('input', function (event) {
	if (event.target.value.trim() !== '') {
		buttonCalculate.disabled = false;
	} else {
		buttonCalculate.disabled = true;
	}

});
rangePeriod.addEventListener('input', function(event){
	rangePeriodAmount.textContent = event.target.value;
});

buttonCalculate.addEventListener('click', appData.start.bind(appData), true);
buttonCalculate.addEventListener('click', appData.blockLeftInputs, true);

expensesPlus.addEventListener('click', appData.addExpensesBlock);

incomesPlus.addEventListener('click', appData.addIncomesBlock);





/*console.log("Сумма всех обязательных расходов за месяц: " + appData.expensesMonth  + " y.e.");
*/
/*if (appData.expensesMonth >= 0) {
    console.log(`Ваша цель будет достигнута за : ` + Math.ceil(appData.getTargetMonth()) + ` мес.`);
} else {
    console.log("Ваша цель не будет достигнута");
}*/

/*appData.getStatusIncome();*/

/*for (let key in appData){
    console.log(`Наша программа включает в себя данные: + key + , значение данных: ` + appData[key]);
}*/

appData.getInfoDeposit();





