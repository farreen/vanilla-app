class CaraouselAndGridView extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.data = JSON.parse(this.getAttribute('data'));
        this.customizeData = JSON.parse(this.getAttribute('customizeData'));
        this.widgetid = JSON.parse(this.getAttribute('widgetid'));
        this.promotedEvents = this.data.filter(event => event.promoted === "true");
        this.normalEvents = this.data.filter(event => event.promoted === "false");

        console.log("event data", this.data)
        console.log("customize data", this.customizeData)
        console.log("widget id", this.widgetid)
    }
    connectedCallback() {
        console.log("Carousel and List view")
        this.render();
    }
    render(){
        this.shadowRoot.innerHTML = `
        <style>
        </style>
        <div class="carouselView">
            <carousel-view data='${JSON.stringify(this.promotedEvents).replace(/'/g, "&apos;")}' customizeData = '${JSON.stringify(this.customizeData).replace(/'/g, "&apos;")}'></carousel-view>
        </div>
        <div class="gridView">
            <grid-view data='${JSON.stringify(this.normalEvents).replace(/'/g, "&apos;")}' customizeData = '${JSON.stringify(this.customizeData).replace(/'/g, "&apos;")}'></grid-view> 
        </div>
        `;
    }
}
customElements.define('caraouselgrid-view', CaraouselAndGridView);