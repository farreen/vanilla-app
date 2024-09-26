class GridView extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.currentIndex = 0;
        this.selectedCard = "";
        this.data = JSON.parse(this.getAttribute('data'));
        this.customizeData = JSON.parse(this.getAttribute('customizeData'));
        this.widgetid = JSON.parse(this.getAttribute('widgetid'));
        console.log("event data", this.data)
        console.log("customize data", this.customizeData)
        console.log("widget id", this.widgetid)
        this.banners = [];
    }
    connectedCallback() {
        console.log("grid view")
        this.selectedCard = this.customizeData.selectedCard
        this.render();
    }

    createBanner(event) {
        let element;
        switch (this.selectedCard) {
            case 'style1':
                element = document.createElement('card-view1');
                break;
            case 'style2':
                element = document.createElement('card-view2');
                break;
            default:
                element = document.createElement('card-view3');
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
            .cardContainer {
                height:100%;
                display: grid;  
                row-gap:30px;
                margin-top: 30px;
                grid-template-columns: repeat(3, 1fr);
                justify-items: center;
              }
            
            @media screen and (max-width: 1560px) {
                .cardContainer {
                    grid-template-columns: repeat(3, 1fr); /* Two columns in each row when screen width is at most 1200px */
                }
            }
            
              @media screen and (max-width: 1200px) {
                .cardContainer {
                    grid-template-columns: repeat(2, 1fr); /* Two columns in each row when screen width is at most 1200px */
                }
            }       
            @media screen and (max-width: 800px) {
                .cardContainer {
                    grid-template-columns: repeat(1, 1fr); /* Two columns in each row when screen width is at most 1200px */
                }
            }   
          </style>
            <div class="cardContainer">
                ${this.banners.map((banner, index) => `<div class="card">${banner.outerHTML}</div>`).join('')}
            </div>  
        
      `;
    }
}

customElements.define('grid-view', GridView);
