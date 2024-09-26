class ListCard1 extends HTMLElement {
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
    formatStartDate(dateString) {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const date = new Date(dateString);
        const day = date.getDate();
        const month = months[date.getMonth()];
        return { day, month };
    };
    formatDate(date) {
        const options = { day: '2-digit', month: 'short' };
        return new Date(date).toLocaleDateString('en-US', options);
    };
    render() {
        this.shadowRoot.innerHTML = `
        <style>
            .card {
                overflow: hidden;
                width: 629px;
                min-height: 211px;
                max-height: 211px;
                display: flex;
                gap: 15px;
                padding: 0px 12px 12px 10px;
                background-color: ${this.customizedData.cardBgColor};
                border-radius: ${this.customizedData.cardBorderRadius}px;
                text-decoration : none;
            }
            .bannerContainer{
                min-width: 260px;
                max-width: 260px;
                height: 210px;
                border-bottom-left-radius: 50px;
                border-bottom-right-radius: 50px;
                filter: drop-shadow(1px 1px 4px rgb(109, 109, 109));
                overflow : hidden;
            }
            .banner {
                width : 100%;
                height : 100%;
            }
            .detailsContainer {
                padding : 10px;
                min-width: 57%;
                max-width: 57%;
                display: flex;
                flex-direction: column;
                justify-content : space-between;
            }
            .date_location_nameContainer {
                gap : 10px;
                display: flex;
                align-items: center;
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
                font-size: ${this.customizedData.fontSettings?.heading?.fontSize}px;
                font-family : ${this.customizedData.fontSettings?.heading?.fontFamily};
                font-weight: ${this.customizedData.fontSettings?.heading?.fontWeight};
            }
            .month {
                color: black;
                line-height : ${this.customizedData.fontSettings?.heading?.fontSize}px;
                font-size:${this.customizedData.fontSettings?.heading?.fontSize}px;
                font-family : ${this.customizedData.fontSettings?.heading?.fontFamily};
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
            }
            .eventName {
                line-height : ${this.customizedData.fontSettings?.heading?.fontSize}px;
                color: ${this.customizedData.fontSettings?.heading?.fontColor};
                font-size : ${this.customizedData.fontSettings?.heading?.fontSize}px;
                font-weight: ${this.customizedData.fontSettings?.heading?.fontWeight};
                font-family : ${this.customizedData.fontSettings?.heading?.fontFamily};
            }
            .description {
                line-height : ${this.customizedData.fontSettings?.body?.fontSize}px;
                font-size:${this.customizedData.fontSettings?.body?.fontSize}px;
                color: ${this.customizedData.fontSettings?.body?.fontColor};
                font-family : ${this.customizedData.fontSettings?.body?.fontFamily};
                height: 70px;
                overflow: hidden;
                max-width : 90%; 
                font-weight: ${this.customizedData.fontSettings?.body?.fontWeight};
                word-wrap: break-word;
            }
            .dateRange_typeContainer {
                margin-top: 20px;
                display: flex;
                align-items: center;
                width: 100%;
                gap: 7px;
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
            <div class="bannerContainer">
                <img src=${this.event.bannerUrl} alt="placeholder" class="banner"/>
            </div>
            <div class="detailsContainer">
                <div class="date_location_nameContainer">
                    <div class="dateContainer">
                        <span class="date">${this.day_month.day}</span>
                        <span class="month">${this.day_month.month}</span>
                    </div>
                    <div class="line"></div>
                    <div class="name_locationContainer">
                        <div class="locationContainer">
                            ${this.locationIcon(this.customizedData.fontSettings?.subheading?.fontColor)}
                             <div class="location">${this.event.location_city}</div>
                        </div>
                       <div class="eventName">${this.event.name.substring(0, 20)}</div>
                    </div>
                </div>
                <div class="description">${this.event.description.substring(0, 130)}</div>
                <div class="dateRange_typeContainer">
                    <div class="pill dateRange">${this.formatDate(this.event.start_date)}-${this.formatDate(this.event.end_date)}</div>
                    <div class="pill type1">Tradeshow</div>
                    <div class="pill type2">Attending</div>
                </div>
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

customElements.define('listview-card1', ListCard1);