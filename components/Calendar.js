class Calendar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.selectedCalendar = 'year'; // default view
        this.queryString = this.getAttribute('queryString') || '';
    }

    connectedCallback() {
        this.render();
        this.addEventListeners();
    }

    handleCalendar(view) {
        this.selectedCalendar = view;
        this.render();
    }

    addEventListeners() {
        this.shadowRoot.querySelector('.weekBtn').addEventListener('click', () => this.handleCalendar('week'));
        this.shadowRoot.querySelector('.monthBtn').addEventListener('click', () => this.handleCalendar('month'));
        this.shadowRoot.querySelector('.yearBtn').addEventListener('click', () => this.handleCalendar('year'));
    }
    render() {
        this.shadowRoot.innerHTML = `
            <style>
            .container{
                margin-bottom: 10px;
                position: relative;
            }
            .monthCal{
                display: flex;
                justify-content: center;
            }
            .calendarBtns button{
                color: white;
                font-size: 14px;
                background:none;
                border: none;
                border: 1px solid #6750A4;
                padding: 5px 15px;
                border-radius: 10px;
                margin-left: 10px;
                cursor: pointer;
            }
            .calendarBtns button:hover{
                transition-duration: .2s;
                background-color: #9281be;
            }
            .calendarBtns button.activeCalendarBtn{
                background-color: #6750A4;
                color: white;
            }
            </style>
            <div class="container">
                <div class="calendarBtns">
                    <button class="weekBtn ${this.selectedCalendar === 'week' ? 'activeCalendarBtn' : ''}">Week</button>
                    <button class="monthBtn ${this.selectedCalendar === 'month' ? 'activeCalendarBtn' : ''}">Month</button>
                    <button class="yearBtn ${this.selectedCalendar === 'year' ? 'activeCalendarBtn' : ''}">Year</button>
                </div>
                <div class="calendarContent">
                ${this.selectedCalendar === 'month' ? `<month-calendar queryString="${this.queryString}"></month-calendar>` : ''}
                ${this.selectedCalendar === 'year' ? `<year-calendar queryString="${this.queryString}"></year-calendar>` : ''}
                ${this.selectedCalendar === 'week' ? `<week-calendar queryString="${this.queryString}"></week-calendar>` : ''}
                </div>
            </div>

        `;
        this.addEventListeners(); 
    }
}

customElements.define('calendar-container', Calendar);
