class EventGeni extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.data = null;
        this.fetchData();
    }

    async fetchData() {
        try {
            // const response = await fetch("http://127.0.0.1:8080/configurationsPage.json");
            // const response = await fetch("http://127.0.0.1:8080/configurationsSticky.json");
            const response = await fetch("http://127.0.0.1:8080/configurationsSection.json");
            this.data = await response.json();
            this.render();
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    render() {
        if (!this.data) {
            // Data not loaded yet, show loading indicator or fallback content
            this.shadowRoot.innerHTML = `<div>Loading...</div>`;
            return;
        }
    
        const widgetType = this.data.widget;
    
        this.shadowRoot.innerHTML = `
            ${widgetType === 'page' ? `<page-widget data='${JSON.stringify(this.data)}'></page-widget>` :
               widgetType === 'section' ? `<section-widget data='${JSON.stringify(this.data)}'></section-widget>` :
               `<sticky-widget data='${JSON.stringify(this.data)}'></sticky-widget>`}
        `;
    }
    
}

customElements.define('event-geni', EventGeni);
