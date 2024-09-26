class PorPopupview extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.currentIndex = 0;
        this.selectedCard = "";
        this.data = JSON.parse(this.getAttribute('data'));
        this.customizeData = JSON.parse(this.getAttribute('customizeData'));
        this.value = this.getAttribute('value');
        console.log("portrait data", this.data)
        console.log("customize data", this.customizeData)
        this.banners = [];
    }
    connectedCallback() {
        console.log("portrait popup view")
        this.selectedCard = this.customizeData.selectedCard  
        this.render();
    }
    createBanner(event) {
        let element;
        switch (this.selectedCard) {
            case 'style1':
                element = document.createElement('popupportrait-view1');
                break;
            case 'style2':
                element = document.createElement('popupportrait-view2');
                break;
            default:
                element = document.createElement('popupportrait-view3');
        }
        element.setAttribute('event',  JSON.stringify(event).replace(/'/g, "&apos;") || "");
        element.setAttribute('customizedData',  JSON.stringify(this.customizeData).replace(/'/g, "&apos;") || "");
        return element;
    }
    render() {
        this.banner = this.createBanner(this.data);
        this.shadowRoot.innerHTML = `
        <style>
            .body{
                width : 100%;
                height : 100%;
            }
        </style>
        <div class="body">
            ${this.banner.outerHTML}
        </div>
        `;
    }
}
customElements.define('porpopup-view', PorPopupview);