class YearCalendar extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.year = 2024; 
      this.eventListDate = '';
      this.eventCountArr = {};
      this.monthEventCount = new Array(12).fill(0);
    }
  
    static get observedAttributes() {
      return ['querystring'];
    }
  
    attributeChangedCallback(name, oldValue, newValue) {
      if (name === 'querystring' && oldValue !== newValue) {
        // this.fetchEventsData();
      }
    }
  
    connectedCallback() {
      this.render();
    }
  
    addEventListeners() {
      this.shadowRoot.querySelector('.prevButton').addEventListener('click', () => this.prevButtonHandler());
      this.shadowRoot.querySelector('.nextButton').addEventListener('click', () => this.nextButtonHandler());
    }
  
    // async fetchEventsData() {
    //   const queryString = this.getAttribute('querystring') || '';
    //   const apiUrl = `${baseUrl}/event/search?groupBy=${this.year}-01-01,${this.year}-12-31&${queryString}`;
      
    //   try {
    //     const apiData = await myFetch(apiUrl, {
    //       method: "GET",
    //       headers: headers,
    //     });
    //     if (apiData.data) {
    //       this.eventCountArr = apiData.data;
    //       this.countEventsMonthWise();
    //       this.render();
    //     }
    //   } catch (error) {
    //     console.error('Error fetching data:', error);
    //     this.eventCountArr = {};
    //     this.countEventsMonthWise();
    //     this.render();
    //   }
    // }
  
    countEventsMonthWise() {
      this.monthEventCount = new Array(12).fill(0);
  
      for (const date in this.eventCountArr) {
        if (this.eventCountArr.hasOwnProperty(date)) {
          const month = parseInt(date.split('-')[1]) - 1;
          this.monthEventCount[month] += this.eventCountArr[date].totalEvent;
        }
      }
    }
  
    prevButtonHandler() {
      if (this.year > 0) {
        this.year -= 1;
        // this.fetchEventsData();
        this.render();
      }
    }
  
    nextButtonHandler() {
      if (this.year > 0) {
        this.year += 1;
        this.render();
        // this.fetchEventsData();
      }
    }
  
    generateMonthArray(year, month) {
      const monthNames = [
        "January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"
      ];
  
      const firstDayOfMonth = new Date(year, month - 1, 1);
      const lastDayOfMonth = new Date(year, month, 0);
      const daysInMonth = lastDayOfMonth.getDate();
      const firstDayIndex = firstDayOfMonth.getDay();
  
      const monthObject = {
        monthName: monthNames[month - 1],
        year: year,
        dates: []
      };
  
      for (let i = 0; i < firstDayIndex; i++) {
        monthObject.dates.push("");
      }
  
      for (let day = 1; day <= daysInMonth; day++) {
        monthObject.dates.push(new Date(year, month - 1, day));
      }
  
      return monthObject;
    }
  
    generateYearArray(year) {
      if (year === 0) return [];
      const yearArray = [];
      for (let month = 1; month <= 12; month++) {
        yearArray.push(this.generateMonthArray(year, month));
      }
      return yearArray;
    }
  
    formatDate(dateString) {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
  
    handleListOpen(date) {
      const formattedDate = this.formatDate(date);
      if (formattedDate === this.eventListDate) {
        this.eventListDate = '';
      } else {
        this.eventListDate = formattedDate;
      }
      this.render();
    }
  
    render() {
      const yearData = this.generateYearArray(this.year);
      const monthCards = yearData.map((monthObject, index) => {
        const dateCards = monthObject.dates.map((date, idx) => {
          if (date === "") {
            return `<div class="emptyDayCard" key="${idx}"></div>`;
          } else {
            const formattedDate = this.formatDate(date);
            return `
              <div key="${idx}" class="${this.eventCountArr[formattedDate] && this.eventCountArr[formattedDate]['totalEvent'] > 0 ? 'dayCard hasEvent' : 'dayCard'}" 
                onclick="this.handleListOpen('${formattedDate}')">
                ${(date).getDate()}
                ${this.eventCountArr[formattedDate] && this.eventCountArr[formattedDate]['totalEvent'] > 0 ? 
                  `<div class="eventsCount">${this.eventCountArr[formattedDate]['totalEvent']}</div>` : ''}
              </div>
            `;
          }
        }).join('');
  
        return `
          <div class="monthcard_container">
            <div class="monthcard_header">
              <div class="monthcard_name">${monthObject.monthName}</div>
              <div class="events_details">${this.monthEventCount[index] ? this.monthEventCount[index] : 0} EVENTS</div>
            </div>
            <div class="dayCard_container">
              ${dateCards}
            </div>
          </div>
        `;
      }).join('');
  
      this.shadowRoot.innerHTML = `
        <style>
            .container {
    padding: 20px 0px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 40px;
  }
  .monthcard_header {
    position: relative;
    padding: 20px 30px;
    /* filter: drop-shadow(1px 1px 1px rgb(2, 2, 2));
    background: linear-gradient(118deg, #0c0c0c 0%, rgba(103,80,164,0.4) 100%); */
    background-color: #6750a4;
    border-radius: 12px 12px 0px 0px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  .monthcard_header::after {
    content: "";
    position: absolute;
    height: 3px;
    width: 100%;
    background-color: #6750a4;
    border-radius: 5px;
    bottom: 0px;
    left: 0px;
  }
  
  .monthcard_name,
  .events_details {
    color: white;
    font-weight: 500;
  }
  
  .dayCard_container {
    padding: 20px 0px;
    display: flex;
    gap:10px;
    flex-wrap: wrap;
  }
  
  .emptyDayCard {
    aspect-ratio: 1;
    width: calc((100% - 80px) / 7);
    background-color: transparent;
    border : 1px solid transparent;
    border-radius : 8px;
  }
  
  .dayCard {
    aspect-ratio: 1;
    width: calc((100% - 220px) / 7);
    border-radius: 8px;
    background-color: #1A1A1A;
    border: 1px solid #6750a4;
    padding: 10px;
    color: white;
    font-weight: 500;
    position: relative;
  }

  .dayCard_light{
    background-color: var(--primary-bg-light);
    color: var(--primary-color-light);
  }

  .eventsCount {
    position: absolute;
    bottom: 10px;
    cursor: pointer;
    font-size: 10px;
    background-color: rgb(246, 237, 255);
    color: rgb(96, 74, 152);
    padding: 2px 5px;
    width: 100%;
    left: 0;
  }

  .control_buttons_container {
    /* position: absolute; */
    z-index: 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;

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
    color : white;
    width: 25%;
    text-align: center;
  }
        </style>
        <div class="control_buttons_container">
          <button class="prevButton">
            <--
          </button>
          <div>${this.year > 0 ? this.year : ''}</div>
          <button class="nextButton">
            -->
          </button>
        </div>
        <div class="container">
          ${monthCards}
        </div>
      `;
      this.addEventListeners();
    }
  }
  
  customElements.define('year-calendar', YearCalendar);
  