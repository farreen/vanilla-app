class CarouselView extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.currentIndex = 0;
        this.selectedCard = "";
        this.data = JSON.parse(this.getAttribute('data'));
        this.customizeData = JSON.parse(this.getAttribute('customizeData'));
        this.value = this.getAttribute('value');
        console.log("carousel data", this.data)
        console.log("customize data", this.customizeData)
        this.banners = [];
    }
    connectedCallback() {
        console.log("crousel view")
        this.selectedCard = this.customizeData.selectedCard  
        this.render();
    }

    disconnectedCallback() {
        this.shadowRoot.querySelector('.prevButton').removeEventListener('click', this.handlePrev);
        this.shadowRoot.querySelector('.nextButton').removeEventListener('click', this.handleNext);
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

        element.setAttribute('event',  JSON.stringify(event).replace(/'/g, "&apos;") || "");
        element.setAttribute('customizedData',  JSON.stringify(this.customizeData).replace(/'/g, "&apos;") || "");
        return element;
    }

    handleNext = () => {
        if (this.currentIndex < this.banners.length - 1) {
            this.currentIndex += 1;
        }
        console.log("current index : ", this.currentIndex)
        this.updateView();
    };

    handlePrev = () => {
        if (this.currentIndex > 0) {
            this.currentIndex -= 1;
        }
        console.log("current index : ", this.currentIndex)
        this.updateView();
    };


    updateView() {
        const banners = this.shadowRoot.querySelectorAll('.card');
        banners.forEach((banner, index) => {
            banner.classList.remove('active', 'left', 'right');

            if (index === this.currentIndex) {
                banner.classList.add('active');
            } else if (this.currentIndex != 0 && index === this.currentIndex - 1) {
                banner.classList.add('left');
            } else if (this.currentIndex < banners.length && index === this.currentIndex + 1) {
                banner.classList.add('right');
            }
        });
        // Disable buttons based on index
        const prevButton = this.shadowRoot.querySelector('.prevButton');
        const nextButton = this.shadowRoot.querySelector('.nextButton');

        prevButton.disabled = this.currentIndex === 0;
        nextButton.disabled = this.currentIndex === this.banners.length - 1;
    }

    render() {
        this.banners = this.data.map(event => this.createBanner(event));

        this.shadowRoot.innerHTML = `
            <style>
                .sliderContainer {
                    display: flex;
                    gap: 10px;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                    width: 95%;
                    height : 500px;
                    z-index: 1;
                }
                .cards {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    overflow: hidden;
                    width: 100%;
                    position: relative;
                    height: 100%;
                }
                .card {
                    transition: transform 0.5s ease, opacity 0.2s ease;
                    position: absolute;
                    opacity: 0;
                }
                .card.active {
                    filter: drop-shadow(1px 1px 2px rgb(67, 67, 67));
                    z-index: 2;
                    opacity: 1;
                }
                .card.left {
                    transform: translateX(-70%) scale(0.8);
                    z-index: 1;
                    opacity: 0.5;
                }
                .card.right {
                    transform: translateX(70%) scale(0.8);
                    z-index: 1;
                    opacity: 0.5;
                }
                .navButton {
                    cursor: pointer;
                    position: absolute;
                    top: 54%;
                    transform: translateY(-50%);
                    border: none;
                    z-index: 999;
                    height: 50px;
                    width: 50px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background-color: white;
                    border-radius: 50px;
                    filter: drop-shadow(1px 1px 2px rgb(23, 23, 23));
                }
                .navButton:first-of-type {
                    left: 1px;
                }
                .navButton:last-of-type {
                    right: 1px;
                }
            </style>
            <div class="sliderContainer">
                <button class="navButton prevButton">&lt;</button>
                <div class="cards">
                    ${this.banners.map((banner, index) => `<div class="card">${banner.outerHTML}</div>`).join('')}
                </div>
                <button class="navButton nextButton"}>&gt;</button>
            </div>
        `;
        this.shadowRoot.querySelector('.prevButton').addEventListener('click', this.handlePrev);
        this.shadowRoot.querySelector('.nextButton').addEventListener('click', this.handleNext);

        this.updateView();
    }
}

customElements.define('carousel-view', CarouselView);
