class MultipleSectionData extends HTMLElement{
    constructor(){
        super()
        this.attachShadow({ mode: 'open' });
        this.imageurl = "https://designshack.net/wp-content/uploads/placeholder-image.png"
    }
    connectedCallback() {
        this.data = JSON.parse(this.getAttribute('data'));
        this.render();
        this.updateLayout(); // Initial layout update
        this.observer = new ResizeObserver(() => {
            this.updateLayout();
        }); 
        this.observer.observe(this.shadowRoot.querySelector('.container')); // Observe changes to the container's size
    }
    
    updateLayout() {
        const cardContainer = this.shadowRoot.querySelector('.cardContainer');
        const containerWidth = cardContainer.offsetWidth;
        let columns = Math.floor(containerWidth / 330); // Assuming each card has a fixed width of 330px
        columns = Math.max(columns, 1); // Ensure there is at least one column
        cardContainer.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
    }

    disconnectedCallback() {
        window.removeEventListener('resize', this.updateLayout.bind(this)); // Remove the event listener when the component is disconnected
    }
    render() {
        this.shadowRoot.innerHTML = `
          <style>
              .container {
                position:relative;
                padding: 50px;
              }
              .blur {
                  height: 100vh;
                  overflow: hidden;
                  filter: blur(3px);
              }
              .heading {
                  font-size: 35px;
                  color: white;
                  font-weight: 900;
              }
              .cardContainer {
                height:100%;
                display: grid;  
                row-gap:30px;
                margin-top: 30px;
                justify-items: center;
              }
              .modal {
                  width : 90%;  
                  position: absolute;
                  left: 50%;
                  top: 100px;
                  transform: translate(-50%, 0%);
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
          </style>

          <div class="container" style="background-color: ${this.data.layoutBgColor};">
              <div class="heading">Your Events</div>
              <div class="cardContainer">
                  ${this.data.eventData.map((item, key) => `
                  <card-component
                    image="${this.imageurl}"
                    date="${item._source.start_date}"
                    eventname="${item._source.name}"
                    location="${item._source.country_name}"
                    description="${item._source.description}"
                    key="${key}"
                    type="${item._source.event_type}"
                 ></card-component>
                  `).join('')}
              </div>    
          </div>  
      `;
    }
}
customElements.define('section-data', MultipleSectionData)
