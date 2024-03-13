


class DatePicker {
	constructor(divId, callback) {
		this.divId = divId;
		this.callback = callback;
		this.currentDate = new Date();
		this.selectedDate = { month: this.currentDate.getMonth() + 1, day: this.currentDate.getDate(), year: this.currentDate.getFullYear() };
	}

	render(date) {
		this.currentDate = date;
		const div = document.getElementById(this.divId);
		div.innerHTML = '';


		const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
		const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

		const header = document.createElement('div');
		header.classList.add('header');
		const prevBtn = document.createElement('span');
		prevBtn.textContent = '<';
		prevBtn.addEventListener('click', () => this.render(new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1, 1)));
		const nextBtn = document.createElement('span');
		nextBtn.textContent = '>';
		nextBtn.addEventListener('click', () => this.render(new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 1)));
		const monthYear = document.createElement('span');
		monthYear.textContent = monthNames[this.currentDate.getMonth()] + ' ' + this.currentDate.getFullYear();
		header.appendChild(prevBtn);
		header.appendChild(monthYear);
		header.appendChild(nextBtn);

		const table = document.createElement('table');
		const thead = document.createElement('thead');
		const tr = document.createElement('tr');
		daysOfWeek.forEach(day => {
			const th = document.createElement('th');
			th.textContent = day;
			tr.appendChild(th);
		});
		thead.appendChild(tr);
		table.appendChild(thead);

		const tbody = document.createElement('tbody');
		let firstDayOfMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
		let lastDayOfMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0);
		let startDate = new Date(firstDayOfMonth);
		startDate.setDate(startDate.getDate() - startDate.getDay());
		let endDate = new Date(lastDayOfMonth);
		endDate.setDate(endDate.getDate() + (6 - endDate.getDay()));

		while (startDate <= endDate) {
			const tr = document.createElement('tr');
			for (let i = 0; i < 7; i++) {
				const td = document.createElement('td');
				const day = startDate.getDate();
				td.textContent = day;
				if (startDate.getMonth() !== this.currentDate.getMonth()) {
					td.classList.add('other-month');
				} else {
					td.addEventListener('click', () => this.handleDateClick(startDate));
				}
				tr.appendChild(td);
				startDate.setDate(startDate.getDate() + 1);
			}
			tbody.appendChild(tr);
		}

		table.appendChild(tbody);

		div.appendChild(header);
		div.appendChild(table);
	}

	handleDateClick(date) {
		this.selectedDate = { month: date.getMonth() + 1, day: date.getDate(), year: date.getFullYear() };
		this.callback(this.divId, this.selectedDate);
	}
}

