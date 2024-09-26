class ScrollViewHorizontal extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.currentIndex = 0; // Used to track the current number of events loaded
        this.selectedCard = "";
        this.data = JSON.parse(this.getAttribute('data'));
        this.customizeData = JSON.parse(this.getAttribute('customizeData'));
        console.log("scroll data", this.data)
        console.log("customize data", this.customizeData)
        this.eventsPerPage = 5; // Number of events to load per page (initially 5)
        this.banners = [];
        this.isLoading = false;
    }

    connectedCallback() {
        console.log("horizontal scroll view");
        this.selectedCard = this.customizeData.selectedCard;
        this.renderInitial();

        // Set up scroll listener
        this.setupScrollLoading();
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

    renderInitial() {
        // Render the first batch of events
        const initialEvents = this.data.slice(0, this.eventsPerPage);
        this.banners = initialEvents.map(event => this.createBanner(event));

        this.shadowRoot.innerHTML = `
            <style>
                .topBody {
                    width: 100%;
                }
                .horizontalScroll {
                    padding: 10px;
                    display: flex;
                    overflow-x: auto;
                    gap: 20px;
                }
            </style>

            <div class='topBody'>
                <div class='horizontalScroll'>
                    ${this.banners.map((banner) => `<div class="card">${banner.outerHTML}</div>`).join('')}
                </div>
            </div>
        `;
    }

    loadMoreEvents() {
        if (this.isLoading || this.currentIndex >= this.data.length) {
            return; // Prevent additional loading if no more events are available
        }

        this.isLoading = true;
        this.currentIndex += this.eventsPerPage;

        // Load the next batch of events
        const nextEvents = this.data.slice(this.currentIndex, this.currentIndex + this.eventsPerPage);
        const newBanners = nextEvents.map(event => this.createBanner(event));
        this.banners.push(...newBanners);

        const horizontalScroll = this.shadowRoot.querySelector('.horizontalScroll');
        newBanners.forEach(banner => {
            const bannerDiv = document.createElement('div');
            bannerDiv.classList.add('card');
            bannerDiv.innerHTML = banner.outerHTML;
            horizontalScroll.appendChild(bannerDiv);
        });

        this.isLoading = false;
    }

    setupScrollLoading() {
        const scrollContainer = this.shadowRoot.querySelector('.horizontalScroll');
        scrollContainer.addEventListener('scroll', () => {
            // Check if the user is near the end of the scrollable area
            if (scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth - 200) {
                // Load more events when the user is close to the end (200px from the right end)
                this.loadMoreEvents();
            }
        });
    }
}

customElements.define('horizontalscroll-view', ScrollViewHorizontal);
