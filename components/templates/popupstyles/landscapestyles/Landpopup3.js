class Landpopup3 extends HTMLElement{
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        // Initialize properties if needed
        this.event = JSON.parse(this.getAttribute('event'))
        this.customizedData = JSON.parse(this.getAttribute('customizedData'))
        this.widgetid = JSON.parse(this.getAttribute('widgetid'));
        console.log("card data : ", this.event)
        console.log("customized data : ", this.customizedData)
        this.render();
    }
    formatDate(date) {
        const dateObj = new Date(date);
        const day = dateObj.getDate();
        const month = dateObj.toLocaleString('en-US', { month: 'short' });
        const year = dateObj.getFullYear();

        // Function to get the appropriate suffix for the day
        const getDayWithSuffix = (day) => {
            const suffixes = ['th', 'st', 'nd', 'rd'];
            const value = day % 100;
            return day + (suffixes[(value - 20) % 10] || suffixes[value] || suffixes[0]);
        };

        return `${getDayWithSuffix(day)} ${month} ${year}`;
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
    height:380px;
    display: flex;
    gap: 22px;
    align-items: center;
    overflow: hidden;
    padding: 12px;
    border-radius:  ${this.customizedData.cardBorderRadius}px;
    background-color:${this.customizedData.cardBgColor};
}
.bannerContainer{
    height: 100%;
    width: 400px;
    position: relative;
}
.type{
    position: absolute;
    padding: 4px 8px;
    border-radius: 6px;
    font-size: 15px;
    color: #6750A4;
    background-color: #F7EFFF;
    bottom: 5px;
    right: 9px;
}
.banner{
    height: 100%;
    width: 400px;
    border-radius: 8px;
}
.eventDetails{
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-width: 48%;
    max-width: 48%;
    word-wrap: break-word;
}
.eventName{
    min-height: 80px;
    max-height: 80px;
    overflow: hidden;
    line-height : ${this.customizedData.fontSettings?.heading?.fontSize}px;
    font-family : ${this.customizedData.fontSettings?.heading?.fontFamily};
    font-size: ${this.customizedData.fontSettings?.heading?.fontSize}px;
    font-weight: ${this.customizedData.fontSettings?.heading?.fontWeight};
    color:  ${this.customizedData.fontSettings?.heading?.fontColor};
}
.locationContainer{
    display: flex;
    align-items: center;
    gap: 8px;
    line-height : ${this.customizedData.fontSettings?.subheading?.fontSize}px;
    font-family : ${this.customizedData.fontSettings?.subheading?.fontFamily};
    color: ${this.customizedData.fontSettings?.subheading?.fontColor};
    font-size: ${this.customizedData.fontSettings?.subheading?.fontSize}px;;
    font-weight: ${this.customizedData.fontSettings?.subheading?.fontWeight};
}
.dateContainer{
    margin-top: 6px;
    display: flex;
    align-items: center;
    gap: 8px;
    line-height : ${this.customizedData.fontSettings?.subheading?.fontSize}px;
    font-family : ${this.customizedData.fontSettings?.subheading?.fontFamily};
    color: ${this.customizedData.fontSettings?.subheading?.fontColor};
    font-size: ${this.customizedData.fontSettings?.subheading?.fontSize}px;
    font-weight: ${this.customizedData.fontSettings?.subheading?.fontWeight};
}
.description{
    line-height: 10px;
    word-wrap : break-word;
    min-height: 130px;
    max-height: 130px;
    overflow: hidden;
    line-height : ${this.customizedData.fontSettings?.body?.fontSize}px;
    font-family : ${this.customizedData.fontSettings?.body?.fontFamily};
    color: ${this.customizedData.fontSettings?.body?.fontColor};
    font-size: ${this.customizedData.fontSettings?.body?.fontSize}px;
    font-weight: ${this.customizedData.fontSettings?.body?.fontWeight};
}
.btn{
    font-size:${this.customizedData.fontSettings?.subheading?.fontSize}px;
    line-height : ${this.customizedData.fontSettings?.subheading?.fontSize}px;
    background-color: ${buttonSettings.buttonColor};
    border-radius: ${buttonSettings.borderRadius}px;
    color: ${buttonSettings.fontColor};
    border: 1px solid ${buttonSettings.borderColor};
    padding: 10px 20px;
    text-decoration:none;
    text-align : center;
}  
.closebtn{
    margin-top : 8px;
    background:none;
    color: black;
    border: none;
    cursor: pointer;
        }
</style>
    <div class="body">
          <div class="card">
        <div class="bannerContainer">
          <img src=${this.event.bannerUrl} alt="placeholder" class="banner" />
          <div class="type">Workshop</div>
        </div>
        <div class="eventDetails">
          <div class="eventName">${this.event.name.substring(0,40)}</div>
          <div class="location_dateContainer">
            <div class="locationContainer">
            ${this.locationIcon(this.customizedData.fontSettings?.subheading?.fontColor)}
            <div class="location">${this.event.location_city}</div>
            </div>
            <div class="dateContainer">
                ${this.dateIcon(this.customizedData.fontSettings?.subheading?.fontColor)}
                <div class="date">${this.formatDate(this.event.start_date)}-${this.formatDate(this.event.end_date)}</div>
            </div>
          </div>
          <div class="description" innerHTML ={{ __html: ${this.event.description.substring(0,250)} }}></div>
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
    dateIcon(color) {
        return `
  <svg xmlns="http://www.w3.org/2000/svg" height="15" viewBox="0 -960 960 960" width="15"><path d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Zm280 240q-17 0-28.5-11.5T440-440q0-17 11.5-28.5T480-480q17 0 28.5 11.5T520-440q0 17-11.5 28.5T480-400Zm-160 0q-17 0-28.5-11.5T280-440q0-17 11.5-28.5T320-480q17 0 28.5 11.5T360-440q0 17-11.5 28.5T320-400Zm320 0q-17 0-28.5-11.5T600-440q0-17 11.5-28.5T640-480q17 0 28.5 11.5T680-440q0 17-11.5 28.5T640-400ZM480-240q-17 0-28.5-11.5T440-280q0-17 11.5-28.5T480-320q17 0 28.5 11.5T520-280q0 17-11.5 28.5T480-240Zm-160 0q-17 0-28.5-11.5T280-280q0-17 11.5-28.5T320-320q17 0 28.5 11.5T360-280q0 17-11.5 28.5T320-240Zm320 0q-17 0-28.5-11.5T600-280q0-17 11.5-28.5T640-320q17 0 28.5 11.5T680-280q0 17-11.5 28.5T640-240Z" fill=${color} /></svg>
`
    }
}

customElements.define('popuplandscape-view3', Landpopup3);