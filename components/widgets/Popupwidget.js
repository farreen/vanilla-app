class Popupwidget extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.data = null;
        this.nearestEvent = null
        this.customizationData = null;
        this.toggleState = false; // this state is for opening the modal
        this.selectedView = this.getAttribute('selectedCard') || 'horscroll';
        this.popupid = ""
    }
    connectedCallback() {
        this.popupid = this.getAttribute('popup-id');
        this.fetchData()
        console.log("popup widget")
        console.log(this.popupid)
        this.observeAttributes();
    }
    asciiToString(ascii) {
        let convertedValue = ascii.toString();
        let str = '';
        for (let i = 0; i < convertedValue.length; i += 2) {
            const code = convertedValue.substring(i, i + 2);
            str += String.fromCharCode(parseInt(code, 10));
        }
        return str;
    };
    async fetchData() {
        try {
            const response = await fetch(`https://api.dev.eventgeni.com/public/widget/${this.popupid}`);
            const responseData = await response.json();
            const otherDataEvents = responseData.data.widgetData.otherdata.event;
            const eventData = responseData.data.eventData;
            this.customizationData = responseData.data.widgetData.customizationData

            const widgetId = responseData.data.widgetData.id; // assuming the widgetId is available here
            this.customizationData.widgetId = widgetId;
            // Combine otherDataEvents and eventData based on matching IDs
            this.data = eventData.map(event => {
                // Find the matching event in otherDataEvents based on id
                const matchingOtherDataEvent = otherDataEvents.find(otherEvent => otherEvent.id === event.id);
                // Return the combined object (event + matchingOtherDataEvent)
                return {
                    ...event, // eventData properties
                    ...matchingOtherDataEvent // otherData properties (this will override any matching properties)
                };
            });
            console.log("Combined Data:", this.data);
            console.log("customize Data:", this.customizationData);
            const widgetStatus = responseData.data.widgetData.status
            this.selectedView = this.asciiToString(responseData.data.widgetData.templatePublicId)
            console.log("selected view  is :", this.selectedView)
            if (widgetStatus !== "active") {
                return;
            } else {
                this.getUserLocation()
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
                    const userLat = position.coords.latitude;
                    const userLong = position.coords.longitude;
                    this.nearestEvent = this.findClosestEvent(userLat, userLong);
                    if (this.nearestEvent) {
                        this.render();
                    }
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
            const response = await fetch('https://ipinfo.io/json?token=74ad0ca9b6d5ad');
            const data = await response.json();
            console.log('User IP location:', data);
            const [lat, long] = data.loc.split(',').map(Number);
            this.findClosestEvent(lat, long);
        } catch (error) {
            console.error('Error fetching location by IP:', error);
        }
    }
    findClosestEvent(userLat, userLong) {
        let closestEvent = null;
        let shortestDistance = Infinity;

        this.data.forEach(event => {
            const distance = this.haversineDistance(userLat, userLong, event.latitude, event.longitude);
            if (distance < shortestDistance) {
                shortestDistance = distance;
                closestEvent = event;
            }
        });
        if (closestEvent) {
            console.log('Closest event:', closestEvent.name, `at ${shortestDistance.toFixed(2)} km away`);
            return closestEvent;
        } else {
            console.log('No events found');
            return null
        }
    }

    haversineDistance(lat1, lon1, lat2, lon2) {
        const toRad = (x) => x * Math.PI / 180;
        const R = 6371; // Earth radius in km
        const dLat = toRad(lat2 - lat1);
        const dLon = toRad(lon2 - lon1);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }
    observeAttributes() {
        // Create a new MutationObserver instance
        this.observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'popup-id') {
                    this.popupid = mutation.target.getAttribute('popup-id');
                    this.fetchData();
                }
            });
        });
        // Observe changes to attributes
        this.observer.observe(this, { attributes: true });
    }
    render() {
        let view;
        switch (this.selectedView) {
            case 'PUVP':
                view = `<porpopup-view data='${JSON.stringify(this.nearestEvent).replace(/'/g, "&apos;")}' customizeData ='${JSON.stringify(this.customizationData).replace(/'/g, "&apos;")}'/>`;
                break;
            case 'PUVL':
                view = `<landpopup-view data='${JSON.stringify(this.nearestEvent).replace(/'/g, "&apos;")}' customizeData ='${JSON.stringify(this.customizationData).replace(/'/g, "&apos;")}'/>`;
                break;
            default:
                view = `<carousel-view/>`;
        }
        this.shadowRoot.innerHTML = `
            ${view}
        `
    }
}

customElements.define('popup-widget', Popupwidget);