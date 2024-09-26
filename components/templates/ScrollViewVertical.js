class ScrollViewVertical extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.currentIndex = 0; // Used to track the current number of events loaded
        this.selectedCard = "";
        this.data = JSON.parse(this.getAttribute('data'));
        this.customizeData = JSON.parse(this.getAttribute('customizeData'));
        console.log("scroll data", this.data)
        console.log("customize data", this.customizeData)
        this.banners = [];
    }

    connectedCallback() {
        console.log("vertical scroll view");
        this.selectedCard = this.customizeData.selectedCard;
        this.render()
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
        return element;
    }
    render() {
        this.banners = this.data.map(event => this.createBanner(event));
        this.shadowRoot.innerHTML = `
            <style>
                .topBody {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    justify-content: flex-start;
                }
                .verticalScroll {
                    padding: 10px;
                    display: flex;
                    flex-direction: column;
                    height: 100%;
                    gap: 20px;
                    overflow-y: auto;
                    overflow-x: hidden;
                }
            </style>

            <div class='topBody'>
                <div class='verticalScroll'>
                ${this.banners.map((banner) => `<div class="card">${banner.outerHTML}</div>`).join('')}
                </div>
            </div>
        `;
    }
}

customElements.define('verticalscroll-view', ScrollViewVertical);
