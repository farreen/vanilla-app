class Stickynavbarwidget extends HTMLElement{
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.data = null;
        this.fetchData();
        this.stickyid = "";
    }
    async fetchData() {
        try {
            const response = await fetch(`https://api.eventgeni.com/widget/cm01z061a0009rr9ojn8w582a`);
            const currData = await response.json();
            const finalData = currData.data
            console.log("Sticky Data posted", finalData)
            const activeState = finalData.active
            if(activeState === "false"){
                this.data = null;
            }else{
                this.data = finalData;
                this.render();
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    getUserLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    console.log('User position:', position);
                    console.log('Latitude:', position.coords.latitude);
                    console.log('Longitude:', position.coords.longitude);
                },
                (error) => {
                    console.warn('Geolocation failed or was denied:', error);
                    this.getLocationByIP(); // Fallback to IP-based location
                }
            );
        } else {
            console.warn('Geolocation is not supported by this browser.');
            this.getLocationByIP(); // Fallback to IP-based location
        }
    }

    async getLocationByIP() {
        try {
            // Replace with a real IP geolocation API URL
            const response = await fetch('https://ipinfo.io/json?token=74ad0ca9b6d5ad');
            const data = await response.json();
            console.log('User IP location:', data);
            console.log('City:', data.city);
            console.log('Region:', data.region);
            console.log('Country:', data.country);
            console.log('Latitude and Longitude:', data.loc); 
        } catch (error) {
            console.error('Error fetching location by IP:', error);
        }
    }
    connectedCallback() {
        this.stickyid = this.getAttribute('sticky-id'); // Set initial stickyid
        this.fetchData();
        this.getUserLocation();
        this.observeAttributes(); // Start observing attribute changes
        this.render(); // Initial render
    }
    observeAttributes() {
        // Create a new MutationObserver instance
        this.observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'sticky-id') {
                    // When 'sticky-id' attribute changes, update the stickyid and fetch new data
                    this.stickyid = mutation.target.getAttribute('sticky-id');
                    this.fetchData();
                }
            });
        });
        // Observe changes to attributes
        this.observer.observe(this, { attributes: true });
    }

    disconnectedCallback() {
        // Disconnect the observer when the element is removed from the DOM
        if (this.observer) {
            this.observer.disconnect();
        }
    }

    render() {
        this.shadowRoot.innerHTML = `
        <style>
            .navbar{
                position: sticky;
                top: 0;
                width:100%;
                display:flex;
                align-items:center;
                justify-content:center;
                background-color: ${this.data.bgColor};
                color:${this.data.fgColor};
                height:${`${this.data.height}px`}; 
              
            }
            .eventname{
                font-size:${`${this.data.fontSize}px`};
            }
        </style>
            <div class="navbar">
                <div class="eventname">${this.data.event}</div>
            </div>
        `
    }
}

customElements.define('sticky-widget', Stickynavbarwidget);