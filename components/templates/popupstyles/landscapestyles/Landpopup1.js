class Landpopup1 extends HTMLElement {
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
    connectedCallback() {
        if (!localStorage.getItem('popupShown')) {
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


    render() {
        const buttonSettings = this.customizedData.selectedBtn === "primary" ? 
        this.customizedData.buttonSettings.primary : 
        this.customizedData.buttonSettings.secondary;
        this.shadowRoot.innerHTML = `
        <style>
            .body{
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
.card{
    width: 800px;
    height:400px;
    display: flex;
    gap: 10px;
    padding-left: 10px;
    overflow : hidden;
    border-radius: ${this.customizedData.cardBorderRadius}px;
    background-color: ${this.customizedData.cardBgColor};
}
.banner{
    width: 380px;
    height: 385px;
    border-bottom-left-radius: 100px;
    border-bottom-right-radius: 100px;
    filter: drop-shadow(1px 1px 4px rgb(109, 109, 109));
}
.details{
    display: flex;
    flex-direction: column;
    padding: 10px;
    min-width: 43%;
    max-width: 43%;
    word-wrap: break-word;
}
.date_location_nameContainer{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.dateContainer{
    background-color: #F6F6F6;
    border-radius: 9px;
    width: 60px;
    height: 78px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.date{
    color: black;
    line-height : ${this.customizedData.fontSettings?.heading?.fontSize}px;
    font-size: ${this.customizedData.fontSettings?.heading?.fontSize}px;
    font-weight: ${this.customizedData.fontSettings?.heading?.fontWeight};
}
.month{
    color: black;
    line-height : ${this.customizedData.fontSettings?.heading?.fontSize}px;
    font-size: ${this.customizedData.fontSettings?.heading?.fontSize}px;
    font-weight: ${this.customizedData.fontSettings?.heading?.fontWeight};
}
.line{
    height: 70px;
    border-left: 1px solid #F6F6F6;
}
.name_locationContainer{
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: 70%;
}
.locationContainer{
    display: flex;
    align-items: center;
    gap: 8px;
}
.location{
    line-height : ${this.customizedData.fontSettings?.subheading?.fontSize}px;
    font-size:${this.customizedData.fontSettings?.subheading?.fontSize}px;
    color: ${this.customizedData.fontSettings?.subheading?.fontColor};
    font-family : ${this.customizedData.fontSettings?.subheading?.fontFamily};
    font-weight: ${this.customizedData.fontSettings?.subheading?.fontWeight};
}
.eventName{
    line-height : ${this.customizedData.fontSettings?.heading?.fontSize}px;
    font-weight: ${this.customizedData.fontSettings?.heading?.fontWeight};
    color: ${this.customizedData.fontSettings?.heading?.fontColor};
    font-family : ${this.customizedData.fontSettings?.heading?.fontFamily};
    font-size : ${this.customizedData.fontSettings?.heading?.fontSize}px;
}
.description{
    margin-top : 10px;
    line-height : ${this.customizedData.fontSettings?.body?.fontSize}px;
    font-size:${this.customizedData.fontSettings?.body?.fontSize}px;
    color: ${this.customizedData.fontSettings?.body?.fontColor};
    font-family : ${this.customizedData.fontSettings?.body?.fontFamily};
    font-weight: 500;
    line-height: 20px;
    overflow: hidden;
    min-height : 160px;
    max-height: 160px;
    word-wrap : break-word;
}
.dateRange_typeContainer{
    margin-top: 10px;
    display: flex;
    align-items: center;
    width: 100%;
    gap: 7px;
}
.pill{
    border-radius: 6px;
    padding: 4px 8px;
    line-height : ${this.customizedData.fontSettings?.body?.fontSize}px;
    font-size: ${this.customizedData.fontSettings?.body?.fontSize}px;
    font-weight: 500;
}
.dateRange{
    background-color: #F5F5F5;
    color: #6A77A6;
}
.type1{
    background-color: #FFF8E6;
    color: #CE9921;
}
.type2{
    background-color: #F7E5EE;
    color: #6750A4;
}
.btn{
    font-size : ${this.customizedData.fontSettings?.subheading?.fontSize}px;
    line-height : ${this.customizedData.fontSettings?.subheading?.fontSize}px;
    background-color: ${buttonSettings.buttonColor};
    border-radius: ${buttonSettings.borderRadius}px;
    color: ${buttonSettings.fontColor};
    border: 1px solid ${buttonSettings.borderColor};
    padding: 10px 20px;
    text-decoration:none;
    margin-top : 10px;
    width: 100%;
    text-align : center;
}
    .closebtn{
    color : black;
    margin-top : 10px;
    background:none;
    border: none;
    cursor: pointer;
}
        </style>
    <div class="body">
        <div class="card">
            <img src=${this.event.bannerUrl} alt="placeholder" class="banner"/>
            <div class = "details">
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
                <div class="description" innerHTML ={{ __html: ${this.event.description.substring(0,360)} }}></div>
                <div class="dateRange_typeContainer">
                    <div class="pill dateRange">${this.formatDate(this.event.start_date)}-${this.formatDate(this.event.end_date)}</div>
                    <div class="pill type1">Tradeshow</div>
                    <div class="pill type2">Attending</div>
                </div>
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

customElements.define('popuplandscape-view1', Landpopup1);