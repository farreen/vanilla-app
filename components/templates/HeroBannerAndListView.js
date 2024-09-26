class HeroBannerAndListView extends HTMLElement {
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
            <list-view></list-view>
        `;
    }
}
customElements.define('herobannerlist-view', HeroBannerAndListView);