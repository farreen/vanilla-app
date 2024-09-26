class Porpopup1 extends HTMLElement {
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
        if (!localStorage.getItem('popupShown')) {
            console.log("popup")
            this.render();
            this.addEventListeners(); // Add event listeners after rendering
        }
    }
    addEventListeners() {
        this.shadowRoot.querySelector('.closebtn').addEventListener('click', () => this.closePopup());
    }
    closePopup() {
        // Setting it true so that it can know that popup was already shown once
        localStorage.setItem('popupShown', 'true');
        this.remove(); // Remove the popup from the DOM
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
        const buttonSettings = this.customizedData.selectedBtn === "primary" ? 
        this.customizedData.buttonSettings.primary : 
        this.customizedData.buttonSettings.secondary;
        this.shadowRoot.innerHTML = `
        <style>
            .body{
            box-sizing :border-box;
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 999;
        }
            .card {
                min-width: 450px;
                max-width: 450px;
                max-height: 480px;
                min-height: 480px;
                border-radius: ${this.customizedData.cardBorderRadius}px;
                background-color: ${this.customizedData.cardBgColor};
                display: flex;
                flex-direction: column;
                align-items: center;
                overflow: hidden;
            }
            .banner {
                width: 95%;
                height: 220px;
                border-bottom-left-radius: 50px;
                border-bottom-right-radius: 50px;
                filter: drop-shadow(1px 1px 4px rgb(111, 111, 111));
            }
            .date_location_nameContainer {
                padding: 10px 14px 0px 14px;
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: space-evenly;
            }
            .dateContainer {
                background-color: #e3e2e1;
                border-radius: 9px;
                width: 60px;
                height: 78px;
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
                border-left: 1px solid #e3e2e1;
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
                word-wrap: break-word;
                min-height: 60px;
                max-height: 60px;
                overflow: hidden;
                line-height : ${this.customizedData.fontSettings?.heading?.fontSize}px;
                font-family : ${this.customizedData.fontSettings?.heading?.fontFamily};
                font-weight: ${this.customizedData.fontSettings?.heading?.fontWeight};
                color: ${this.customizedData.fontSettings?.heading?.fontColor};
                font-size : ${this.customizedData.fontSettings?.heading?.fontSize}px;
            }
            .dividerLine {
                margin-top: 8px;
                width: 100%;
                border-top: 1px solid #E8EAF1;
            }
            .dateRange_typeContainer {
                margin-top : 5px;
                display: flex;
                align-items: center;
                width: 95%;
                gap: 8px;
                padding-left: 10px;
                padding-right: 10px;
            }
            .pill {
                border-radius: 6px;
                padding: 4px 8px;
                line-height : ${this.customizedData.fontSettings?.body?.fontSize}px;
                font-family : ${this.customizedData.fontSettings?.body?.fontFamily};
                font-size: ${this.customizedData.fontSettings?.body?.fontSize}px;
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
            .desc {
                line-height : 10px;
                min-height: 55px;
                max-height: 55px;
                width: 95%;
                padding-left: 10px;
                padding-right: 10px;
                word-wrap: break-word;
                overflow: hidden;
                font-family : ${this.customizedData.fontSettings?.body?.fontFamily};
                font-size:${this.customizedData.fontSettings?.body?.fontSize}px;
                color: ${this.customizedData.fontSettings?.body?.fontColor};
                font-weight: ${this.customizedData.fontSettings?.body?.fontWeight};
            }
.btnContainer{
    margin-top: 10px;
    width: 100%;
    display: flex;
    flex-direction : column;
   align-items : center;
   gap : 5px; 
}
.btn{
    background-color: ${buttonSettings.buttonColor};
    font-size:${this.customizedData.fontSettings?.subheading?.fontSize}px;
    line-height : ${this.customizedData.fontSettings?.subheading?.fontSize}px;
    border-radius: ${buttonSettings.borderRadius}px;
    color: ${buttonSettings.fontColor};
    width : fit-content;
    border: 1px solid ${buttonSettings.borderColor};
    padding: 10px 20px;
    text-decoration:none;
}
.closebtn{
    width : fit-content;
    background:none;
    color: black;
    border: none;
    cursor: pointer;
}
        </style>
        <div class="body">
            <div class="card">
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
                            <div class="location">${this.event.location_city}</div>
                        </div>
                        <div class="eventName">${this.event.name.substring(0,20)}</div>
                    </div>
                </div>
                <div class="dividerLine"></div>
                <div class="dateRange_typeContainer">
                    <div class="pill dateRange">${this.formatDate(this.event.start_date)}-${this.formatDate(this.event.end_date)}</div>
                    <div class="pill type1">Tradeshow</div>
                    <div class="pill type2">Attending</div>
                </div>
                <div class="desc">${this.event.description.substring(0,150)}</div>
                <div class="btnContainer">
                    <a class="btn" href=${`https://console.eventgeni.com/detailpage?widgetId=${this.customizedData.widgetId}&eventId=${this.event.id}`} target="_blank">${buttonSettings.buttonText}</a>
                    <button class="closebtn">Close</button>
                </div>
            </div>
        </div>
        `;
    }
    locationIcon(color) {
        return `
    <svg xmlns="http://www.w3.org/2000/svg" height="15px" viewBox="0 -960 960 960" width="15px" fill=${color}><path d="M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 294q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z"/></svg>
    `
    }
}

customElements.define('popupportrait-view1', Porpopup1);