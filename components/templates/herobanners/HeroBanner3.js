class HeroBanner3 extends HTMLElement {
    static get observedAttributes() {
        return ['image', 'location', 'eventname', 'startdate', 'enddate', 'type', 'buttontext'];
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    attributeChangedCallback() {
        this.render();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const image = this.getAttribute('image') || 'https://designshack.net/wp-content/uploads/placeholder-image.png';
        const location = this.getAttribute('location') || 'Corpus Christi, USA';
        const eventName = this.getAttribute('eventname') || 'East Midlands Young Planners';
        const startDate = this.getAttribute('startdate') || '1st Apr 2024';
        const endDate = this.getAttribute('enddate') || '20th Apr 2024';
        const type = this.getAttribute('type') || 'Workshop';
        const buttonText = this.getAttribute('buttontext') || 'Register';

        this.shadowRoot.innerHTML = `
            <style>
                .card {
                    width: 90%;
                    height: 228px;
                    display: flex;
                    gap: 22px;
                    align-items: center;
                    padding: 12px;
                    background-color: white;
                    border-radius: 8px;
                }
                .bannerContainer {
                    height: 100%;
                    width: 50%;
                    position: relative;
                }
                .type {
                    position: absolute;
                    padding: 4px 8px;
                    border-radius: 6px;
                    font-size: 12px;
                    color: #6750A4;
                    background-color: #F7EFFF;
                    bottom: 5px;
                    right: 9px;
                }
                .banner {
                    height: 100%;
                    width: 100%;
                    border-radius: 8px;
                }
                .eventDetails {
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                }
                .eventName {
                    color: #6750A4;
                    font-size: 2vw;
                    font-weight: 700;
                }
                .location_date_btnContainer {
                    margin-top: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }
                .locationContainer {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    color: #6E6F89;
                    font-size: 12px;
                    font-weight: 500;
                }
                .dateContainer {
                    margin-top: 6px;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    color: #6E6F89;
                    font-size: 10px;
                    font-weight: 400;
                }
                .registerBtn {
                    color: white;
                    background-color: #6750A4;
                    border-radius: 6px;
                    padding: 4px 8px;
                    font-size: 1.2vw;
                    font-weight: 500;
                }
            </style>
            <div class="card">
                <div class="bannerContainer">
                    <img src="${image}" alt="banner" class="banner" />
                    <div class="type">${type}</div>
                </div>
                <div class="eventDetails">
                    <div class="eventName">${eventName}</div>
                    <div class="location_date_btnContainer">
                        <div class="location_dateContainer">
                            <div class="locationContainer">
                                <img src="path/to/location-icon.png" alt="location" />
                                <div class="location">${location}</div>
                            </div>
                            <div class="dateContainer">
                                ${this.dateIcon()}
                                <div class="date">${startDate} - ${endDate}</div>
                            </div>
                        </div>
                        <button class="registerBtn">${buttonText}</button>
                    </div>
                </div>
            </div>
        `;
    }
    dateIcon() {
        return `
            <svg xmlns="http://www.w3.org/2000/svg" height="15" viewBox="0 -960 960 960" width="15">
                <path d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Zm280 240q-17 0-28.5-11.5T440-440q0-17 11.5-28.5T480-480q17 0 28.5 11.5T520-440q0 17-11.5 28.5T480-400Zm-160 0q-17 0-28.5-11.5T280-440q0-17 11.5-28.5T320-480q17 0 28.5 11.5T360-440q0 17-11.5 28.5T320-400Zm320 0q-17 0-28.5-11.5T600-440q0-17 11.5-28.5T640-480q17 0 28.5 11.5T680-440q0 17-11.5 28.5T640-400ZM480-240q-17 0-28.5-11.5T440-280q0-17 11.5-28.5T480-320q17 0 28.5 11.5T520-280q0 17-11.5 28.5T480-240Zm-160 0q-17 0-28.5-11.5T280-280q0-17 11.5-28.5T320-320q17 0 28.5 11.5T360-280q0 17-11.5 28.5T320-240Zm320 0q-17 0-28.5-11.5T600-280q0-17 11.5-28.5T640-320q17 0 28.5 11.5T680-280q0 17-11.5 28.5T640-240Z" fill="black" />
            </svg>
        `;
    }

}
customElements.define('hero-banner3', HeroBanner3);