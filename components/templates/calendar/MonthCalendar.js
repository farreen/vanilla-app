class MonthCalendar extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.selectedCalendar = 'week'; // default view
      this.queryString = this.getAttribute('queryString') || '';
      this.monthEvents = {};
      this.year = 0;
      this.month = 0;
      this.datesWithEvents = [];
      this.eventListDate = '0';
      this.eventIdColorMap = {};
    }
  
    connectedCallback() {
      this.render();
      this.addEventListeners();
      this.initializeCalendar();
    }
  
    addEventListeners() {
      this.shadowRoot.querySelector('.prevButton').addEventListener('click', () => this.prevButtonHandler());
      this.shadowRoot.querySelector('.nextButton').addEventListener('click', () => this.nextButtonHandler());
    }
  
    initializeCalendar() {
      const date = new Date();
      this.month = date.getMonth() + 1;
      this.year = date.getFullYear();
      this.setupCalendar();
    }
  
    setupCalendar() {
      const monthDatesArray = this.generateMonthArray(this.year, this.month);
      this.datesWithEvents = monthDatesArray.map((date) => {
        if (date === "") return "";
        else {
          return { date, events: [], totalEvent: 0 };
        }
      });
      this.render();
    }
  
    prevButtonHandler() {
      if (this.month > 1) {
        this.month -= 1;
        this.setupCalendar();
      } else {
        this.month = 12;
        this.year -= 1;
        this.setupCalendar();
      }
    }
  
    nextButtonHandler() {
      if (this.month < 12) {
        this.month += 1;
        this.setupCalendar();
      } else {
        this.month = 1;
        this.year += 1;
        this.setupCalendar();
      }
    }
  
    handleListOpen(date) {
      const formattedDate = this.formatDate(date);
      this.eventListDate = formattedDate === this.eventListDate ? '0' : formattedDate;
      this.render();
    }
  
    generateMonthArray(year, month) {
      const firstDayOfMonth = new Date(year, month - 1, 1);
      const lastDayOfMonth = new Date(year, month, 0);
      const daysInMonth = lastDayOfMonth.getDate();
      const firstDayIndex = firstDayOfMonth.getDay();
      const monthArray = [];
      let currentDate = new Date(firstDayOfMonth);
  
      for (let i = 0; i < firstDayIndex; i++) {
        monthArray.push("");
      }
  
      for (let day = 1; day <= daysInMonth; day++) {
        monthArray.push(new Date(year, month - 1, day, 5, 30, 0, 0));
        currentDate.setDate(currentDate.getDate() + 1);
      }
      return monthArray;
    }
  
    formatDate(dateString) {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
  
    render() {
      const days = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
      const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
      const monthName = this.month > 0 ? months[this.month - 1] : '';
  
      const dayHeaders = days.map(day => `<div class="dayCard"><div class="day_title">${day}</div></div>`).join('');
  
      const dateCards = this.datesWithEvents.map((dateWithEvent, index) => {
        if (dateWithEvent === "") {
          return `<div class="emptyCard" key=${index}></div>`;
        } else {
          const currentDate = dateWithEvent.date;
          return `
            <div class="monthCard">
              <div class="monthCard_dayno">${currentDate.getDate()}</div>
            </div>
          `;
        }
      }).join('');
  
      this.shadowRoot.innerHTML = `
        <style>
          .container {
            padding: 20px 0px;
            display: flex;
            flex-direction: column;
            gap: 20px;
          }

          .dayCards_container {
            display: flex;
            align-items: center;
            gap: 15px;
          }

          .dayCard {
            background-color: #6750a4;
            border-radius: 12px 12px 0px 0px;
            padding: 25px 0px;
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 8px;
            position: relative;
          }

          .dayCard::after {
            content: "";
            position: absolute;
            bottom: -5px;
            height: 4px;
            width: 100%;
            border-radius: 5px;
            background-color: #6750a4;
          }

          .day_title {
            color: white;
            font-weight: 500;
            font-size: 12px;
          }

          .dayCard::after {
            content: "";
            position: absolute;
            bottom: -5px;
            height: 4px;
            width: 100%;
            border-radius: 5px;
            background-color: #6750a4;
          }

          .day_title {
            color: white;
            font-weight: 500;
            font-size: 12px;
          }

          .monthCards_container {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            gap: 16px;
          }

          .emptyCard {
            position: relative;
            background-color: transparent;
            aspect-ratio: 1;
            width: calc((100% - 320px) / 7);
            border-radius: 20px;
            padding: 15px;
            color: #ffffff;
            border: 1px solid transparent;
          }
          .monthCard {
            position: relative;
            border: 1px solid #6750a4;
            background-color: #1a1a1a;
            aspect-ratio: 1;
            width: calc((100% - 320px) / 7);
            border-radius: 20px;
            padding: 15px;
            color: #ffffff;
          }

          .monthCard_light{
            background-color: white;
            color: black
          }

          .monthCard_dayno {
            font-weight: 500;
            font-size: 28px;
          }

          .event {
            position: absolute;
            z-index: 1;
            left: 10px;
            font-size: 70%;
            border-radius: 2px;
            padding: 3.5%;
          }


          .colorStrip{
            position: absolute;
            left: .5%;
            z-index: 1;
            font-size: 12px;
            width: 100%;
            height: 20px;
          }

          .control_buttons_container {
            z-index: 0;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 20px;
            color : black;
          }

          .control_buttons_container button {
            background-color: transparent;
            outline: none;
            border: none;
            cursor: pointer;
            color : white;
          }

          .control_buttons_container div {
            font-size: 24px;
            font-weight: 500;
            width: 25%;
            text-align: center;
            color : white;
          }
        </style>
        <div class="control_buttons_container">
          <button class="prevButton">
            &lt;--
          </button>
          <div class="monthName">${monthName} ${this.year}</div>
          <button class="nextButton">
            --&gt;
          </button>
        </div>
        <div class="container">
          <div class="dayCards_container">
            ${dayHeaders}
          </div>
          <div class="monthCards_container">
            ${dateCards}
          </div>
        </div>
      `;
      this.addEventListeners(); 
    }
  }
  
  customElements.define('month-calendar', MonthCalendar);
