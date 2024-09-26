class HeroBanner2 extends HTMLElement {
    static get observedAttributes() {
        return ['image', 'location', 'eventname', 'startdate', 'enddate', 'type', 'person1', 'person2', 'buttontext'];
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
        const eventName = this.getAttribute('eventname') || 'Hampton Jazz Festival 2024';
        const startDate = this.getAttribute('startdate') || '1st Apr 2024';
        const endDate = this.getAttribute('enddate') || '20th Apr 2024';
        const type = this.getAttribute('type') || 'Tradeshow';
        const person1 = this.getAttribute('person1') || '';
        const person2 = this.getAttribute('person2') || '';
        const buttonText = this.getAttribute('buttontext') || 'Register';

        this.shadowRoot.innerHTML = `
            <style>
                .card {
                    width: 90%;
                    height: 50%;
                    display: flex;
                    gap: 16px;
                    align-items: center;
                    padding: 12px;
                    background-color: white;
                    border-radius: 8px;
                }
                .banner {
                    width: 40%;
                    height: 100%;
                    border-radius: 8px;
                    filter: drop-shadow(1px 1px 4px rgb(109, 109, 109));
                }
                .details {
                    display: flex;
                    flex-direction: column;
                    gap: 21px;
                    width: 60%;
                }
                .eventName {
                    font-weight: 700;
                    font-size: 2.3vw;
                    color: black;
                }
                .location_dateContainer {
                    margin-top: 8px;
                    display: flex;
                    flex-direction: column;
                }
                .locationContainer {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }
                .location {
                    color: #6E6F89;
                    font-size: .9vw;
                    font-weight: 500;
                }
                .dateContainer {
                    margin-top: 8px;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }
                .date {
                    font-size: .9vw;
                    color: #6E6F89;
                    font-weight: 400;
                }
                .type_people_btnContainer {
                    display: flex;
                    align-items: center;
                    width: 100%;
                    justify-content: space-between;
                }
                .type_peopleContainer {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }
                .typeContainer {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }
                .pill {
                    border-radius: 6px;
                    padding: 4px 8px;
                    font-size: .9vw;
                    font-weight: 500;
                }
                .type1 {
                    background-color: #FFF8E6;
                    color: #CE9921;
                }
                .circles {
                    display: flex;
                }
                .circle:hover {
                    transform: scale(1.05);
                    z-index: 1;
                }
                .image {
                    width: 22px;
                    height: 22px;
                }
                .circle {
                    position: relative;
                    cursor: pointer;
                    display: flex;
                    color: black;
                    flex-shrink: 0;
                    align-items: center;
                    padding : 4px;
                    justify-content: center;
                    border-radius: 50%;
                    background-color: #fff;
                    box-shadow: -2px -1px 7px rgba(0, 0, 0, 0.7), 2px 1px 7px rgba(0, 0, 0, 0.7);
                    transition: transform 0.2s ease;
                }
                .circle::before {
                    content: attr(data-name);
                    position: absolute;
                    bottom: 120%;
                    left: 50%;
                    white-space: nowrap;
                    transform: translateX(-50%);
                    background-color: rgba(0, 0, 0, 0.8);
                    color: #fff;
                    padding: 5px 10px;
                    border-radius: 5px;
                    font-size: 14px;
                    opacity: 0;
                    pointer-events: none;
                    transition: opacity 0.2s ease;
                }
                .circle:hover::before {
                    opacity: 1;
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
                <img src="${image}" alt="banner" class="banner" />
                <div class="details">
                    <div class="eventName">${eventName}</div>
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
                    <div class="type_people_btnContainer">
                        <div class="type_peopleContainer">
                            <div class="typeContainer">
                                <div class="pill type1">${type}</div>
                            </div>
                            <div class="circles">
                                <div class="circle" data-name="John Doe">
                                    JD
                                </div>
                                <div class="circle" style="margin-left: -5px;" data-name="Jane Smith">
                                    JD
                                </div>
                                <div class="circle" data-name="John Doe">
                                    JD
                                </div>
                                <div class="circle" style="margin-left: -5px;" data-name="Jane Smith">
                                    JD
                                </div>
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

customElements.define('hero-banner2', HeroBanner2);
