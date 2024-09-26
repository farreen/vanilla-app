class Sectionwidget extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.data = null;
        this.customizationData = null;
        this.toggleState = false; // this state is for opening the modal
        this.selectedView = this.getAttribute('selectedCard') || 'horscroll';
        this.sectionid = ""
    }
    connectedCallback() {
        this.sectionid = this.getAttribute('section-id');
        this.fetchData()
        console.log("section widget")
        console.log(this.sectionid)
        this.observeAttributes();
    }
    observeAttributes() {
        // Create a new MutationObserver instance
        this.observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'section-id') {
                    // When 'sticky-id' attribute changes, update the stickyid and fetch new data
                    this.sectionid = mutation.target.getAttribute('section-id');
                    this.fetchData();
                }
            });
        });
        // Observe changes to attributes
        this.observer.observe(this, { attributes: true });
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
            const response = await fetch(`https://api.dev.eventgeni.com/public/widget/${this.sectionid}`);
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
            console.log("selected view : ", this.selectedView)
            if (widgetStatus !== "active") {
                return;
            } else {
                this.render();
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    render() {
        let view;
        switch (this.selectedView) {
            case 'CV':
                view = `<carousel-view data='${JSON.stringify(this.data).replace(/'/g, "&apos;")}' customizeData = '${JSON.stringify(this.customizationData).replace(/'/g, "&apos;")}'></carousel-view>`;
                break;
            case 'HS':
                view =`<horizontalscroll-view data='${JSON.stringify(this.data).replace(/'/g, "&apos;")}' customizeData = '${JSON.stringify(this.customizationData).replace(/'/g, "&apos;")}'></horizontalscroll-view>`;
                break;
            case 'LSR':
                view = `<verticalscroll-view data='${JSON.stringify(this.data).replace(/'/g, "&apos;")}' customizeData = '${JSON.stringify(this.customizationData).replace(/'/g, "&apos;")}'></verticalscroll-view>`;
                break;
            default:
                view = `<carousel-view/>`;
        } 
        this.shadowRoot.innerHTML = `
        <style>
            .body{
                width : 100%;
                height : 100%;
            }
        </style>
        <div class="body">
            ${view}
        </div>
        `;
    }
}
customElements.define('section-widget', Sectionwidget);