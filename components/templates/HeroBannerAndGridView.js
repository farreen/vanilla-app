class HeroBannerAndGridView extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.imageurl = "https://designshack.net/wp-content/uploads/placeholder-image.png"
    }
    connectedCallback() {
        this.render();
    }
    render(){
        this.shadowRoot.innerHTML = `
            <hero-banner></hero-banner>
            <grid-view></grid-view>
        `;
    }
}
customElements.define('herobannergrid-view', HeroBannerAndGridView);