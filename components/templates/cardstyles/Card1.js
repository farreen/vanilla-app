class Card1 extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        // Initialize properties if needed
        this.event = JSON.parse(this.getAttribute('event'))
        this.customizedData = JSON.parse(this.getAttribute('customizedData'))
        this.widgetid = JSON.parse(this.getAttribute('widgetid'));
        console.log("card data : ", this.event)
        console.log("customized data : ", this.customizedData)
        this.day_month = this.formatStartDate(this.event.start_date);
        this.render();
    }

    connectedCallback() {
        console.log("Card1")
    }
    attributeChangedCallback(name, oldValue, newValue) {
        this[name] = newValue;
        this.render();
    }
    formatStartDate(dateString) {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const date = new Date(dateString);
        const day = date.getDate();
        const month = months[date.getMonth()];
        return { day, month };
    };
    formatDate(date){
        const options = { day: '2-digit', month: 'short' };
        return new Date(date).toLocaleDateString('en-US', options);
    };
    render() {
        this.shadowRoot.innerHTML = `
    <style>
                .card {
                    box-sizing : border-box;    
                    max-width: 305px;
                    max-height: 337px;
                    min-width: 305px;
                    min-height: 337px;
                    border-radius: ${this.customizedData.cardBorderRadius}px;
                    background-color: ${this.customizedData.cardBgColor};
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    overflow: hidden;
                    text-decoration : none;
                }
                .banner {
                    width: 291px;
                    height: 185px;
                    border-bottom-left-radius: 50px;
                    border-bottom-right-radius: 50px;
                    filter: drop-shadow(1px 1px 4px rgb(111, 111, 111));
                }
                .date_location_nameContainer {
                    padding: 20px 14px 0px 14px;
                    width: 90%;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }
                .dateContainer {
                    background-color: #F6F6F6;
                    border-radius: 9px;
                    width: 50px;
                    height: 68px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                }
                .date {
                    color: black;
                    line-height : ${this.customizedData.fontSettings?.heading?.fontSize}px;
                    font-family : ${this.customizedData.fontSettings?.heading?.fontFamily};
                    font-size: ${this.customizedData.fontSettings?.heading?.fontSize}px;
                    font-weight: ${this.customizedData.fontSettings?.heading?.fontWeight};
                }
                .month {
                    color: black;
                    line-height : ${this.customizedData.fontSettings?.heading?.fontSize}px;
                    font-family : ${this.customizedData.fontSettings?.heading?.fontFamily};
                    font-size: ${this.customizedData.fontSettings?.heading?.fontSize}px;
                    font-weight: ${this.customizedData.fontSettings?.heading?.fontWeight};
                }
                .line {
                    height: 60px;
                    border-left: 1px solid #F6F6F6;
                }
                .name_locationContainer {
                    display: flex;
                    flex-direction: column;
                    gap: 5px;
                    width: 70%;
                }
                .locationContainer {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }
                .location {
                    line-height : ${this.customizedData.fontSettings?.subheading?.fontSize}px;
                    font-size:${this.customizedData.fontSettings?.subheading?.fontSize}px;
                    color: ${this.customizedData.fontSettings?.subheading?.fontColor};
                    font-weight: ${this.customizedData.fontSettings?.subheading?.fontWeight};
                    font-family : ${this.customizedData.fontSettings?.subheading?.fontFamily};
                }
                .eventName {
                    line-height : ${this.customizedData.fontSettings?.heading?.fontSize}px;
                    font-weight: ${this.customizedData.fontSettings?.heading?.fontWeight};
                    color: ${this.customizedData.fontSettings?.heading?.fontColor};
                    font-size : ${this.customizedData.fontSettings?.heading?.fontSize}px;
                    font-family : ${this.customizedData.fontSettings?.heading?.fontFamily};
                }
                .dividerLine {
                    margin-top: 12px;
                    width: 100%;
                    border-top: 1px solid #E8EAF1;
                }
                .dateRange_typeContainer {
                    display: flex;
                    align-items: center;
                    width: 90%;
                    justify-content: space-between;
                    padding : 10px;
                }
                .pill {
                    border-radius: 6px;
                    padding: 4px 8px;
                    line-height : ${this.customizedData.fontSettings?.body?.fontSize}px;
                    font-size: ${this.customizedData.fontSettings?.body?.fontSize}px;;
                    font-weight: ${this.customizedData.fontSettings?.body?.fontWeight};
                }
                .dateRange {
                    background-color: #F5F5F5;
                    color: #6A77A6;
                }
                .type1 {
                    background-color: #FFF8E6;
                    color: #CE9921;
                }
                .type2 {
                    background-color: #F7E5EE;
                    color: #6750A4;
                }
            </style>

      <a href=${`https://console.eventgeni.com/detailpage?widgetId=${this.customizedData.widgetId}&eventId=${this.event.id}`} target="_blank" class="card">
        <img src=${this.event.bannerUrl} alt="placeholder" class="banner"/>
                <div class="date_location_nameContainer">
                    <div class="dateContainer">
                        <span class="date">${this.day_month.day}</span>
                        <span class="month">${this.day_month.month}</span>
                    </div>
                    <div class="line"></div>
                    <div class="name_locationContainer">
                        <div class="locationContainer">
                            ${this.locationIcon(this.customizedData.fontSettings?.subheading?.fontColor)}
                            <div class="location">${this.event.location_city.substring(0,20)}</div>
                        </div>
                        <div class="eventName">${this.event.name.substring(0,15)}</div>
                    </div>
                </div>
                <div class="dividerLine"></div>
                <div class="dateRange_typeContainer">
                    <div class="pill dateRange">${this.formatDate(this.event.start_date)}-${this.formatDate(this.event.end_date)}</div>
                    <div class="pill type1">Tradeshow</div>
                    <div class="pill type2">Attending</div>
                </div>
      </a>
    `;
    }
    locationIcon(color) {
        return `
    <svg xmlns="http://www.w3.org/2000/svg" height="15px" viewBox="0 -960 960 960" width="15px" fill=${color}><path d="M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 294q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z"/></svg>
    `
    }
}

customElements.define('card-view1', Card1);
