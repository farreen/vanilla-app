class ListView extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.currentIndex = 0;
    this.selectedCard = "";
    this.data = JSON.parse(this.getAttribute('data'));
    this.customizeData = JSON.parse(this.getAttribute('customizeData'));
    this.widgetid = JSON.parse(this.getAttribute('widgetid'));
    console.log("evvent data", this.data)
    console.log("customize data", this.customizeData)
    this.banners = [];
  }
  connectedCallback() {
    console.log("list view")
    this.selectedCard = this.customizeData.selectedCard
    this.render();
  }
  createBanner(event) {
    let element;
    switch (this.selectedCard) {
      case 'style1':
        element = document.createElement('listview-card1');
        break;
      case 'style2':
        element = document.createElement('listview-card2');
        break;
      default:
        element = document.createElement('listview-card3');
    }

    element.setAttribute('event', JSON.stringify(event).replace(/'/g, "&apos;") || "");
    element.setAttribute('customizedData', JSON.stringify(this.customizeData).replace(/'/g, "&apos;") || "");
    element.setAttribute('widgetid', this.widgetid)
    return element;
  }
  render() {
    this.banners = this.data.map(event => this.createBanner(event));
    this.shadowRoot.innerHTML = `
          <style>
            .container{
                display: flex;
                flex-direction: column;
                align-items: center;
                gap:20px;
                width: 100%;
                height: 100%;
                background-color : #1a1a1a;
            }
          </style>
          <div class="container">   
          ${this.banners.map((banner, index) => `<div class="card">${banner.outerHTML}</div>`).join('')}
          </div>  
        
      `;
  }


}

customElements.define('list-view', ListView);