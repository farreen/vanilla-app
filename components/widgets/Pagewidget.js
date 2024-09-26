class Pagewidget extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.data = null;
        this.customizationData = null;
        this.selectedView = ""
        this.pageid = ""
    }
    connectedCallback() {
        this.pageid = this.getAttribute('page-id');
        this.fetchData()
        console.log("page widget")
        console.log(this.pageid)
        this.observeAttributes();
    }
    observeAttributes() {
        // Create a new MutationObserver instance
        this.observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'page-id') {
                    // When 'sticky-id' attribute changes, update the stickyid and fetch new data
                    this.pageid = mutation.target.getAttribute('page-id');
                    this.fetchData();
                }
            });
        });
        // Observe changes to attributes
        this.observer.observe(this, { attributes: true });
    }
    asciiToString(ascii) {
        let convertedValue = ascii.toString();
        let str = '';
        for (let i = 0; i < convertedValue.length; i += 2) {
            const code = convertedValue.substring(i, i + 2);
            str += String.fromCharCode(parseInt(code, 10));
        }
        return str;
    };

    async fetchData() {
        try {
            const response = await fetch(`https://api.dev.eventgeni.com/public/widget/${this.pageid}`);
            const responseData = await response.json();
            console.log("data is : ", responseData)
            const otherDataEvents = responseData.data.widgetData.otherdata.event;
            const eventData = responseData.data.eventData;
            this.customizationData = responseData.data.widgetData.customizationData

            const widgetId = responseData.data.widgetData.id; // assuming the widgetId is available here
            this.customizationData.widgetId = widgetId;
            // Combine otherDataEvents and eventData based on matching IDs
            this.data = eventData.map(event => {
                // Find the matching event in otherDataEvents based on id
                const matchingOtherDataEvent = otherDataEvents.find(otherEvent => otherEvent.id === event.id);
                // Return the combined object (event + matchingOtherDataEvent)
                return {
                    ...event, // eventData properties
                    ...matchingOtherDataEvent // otherData properties (this will override any matching properties)
                };
            });
            console.log("Combined Data:", this.data);
            const widgetStatus = responseData.data.widgetData.status
            this.selectedView = this.asciiToString(responseData.data.widgetData.templatePublicId)
            if (widgetStatus !== "active") {
                return;
            } else {
                this.render();
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    render() {
        let activeContent;
        switch (this.selectedView) {
            case 'LS':
                activeContent = `<list-view data='${JSON.stringify(this.data).replace(/'/g, "&apos;")}' customizeData = '${JSON.stringify(this.customizationData).replace(/'/g, "&apos;")}'></list-view>`;
                break;
            case 'GS':
                activeContent = `<grid-view data='${JSON.stringify(this.data).replace(/'/g, "&apos;")}' customizeData = '${JSON.stringify(this.customizationData).replace(/'/g, "&apos;")}'></grid-view>`;
                break;
            case 'CVL':
                activeContent = `<caraousellist-view data='${JSON.stringify(this.data).replace(/'/g, "&apos;")}' customizeData = '${JSON.stringify(this.customizationData).replace(/'/g, "&apos;")}'></caraousellist-view>`;
                break;
            case 'CVG':
                activeContent = `<caraouselgrid-view data='${JSON.stringify(this.data).replace(/'/g, "&apos;")}' customizeData = '${JSON.stringify(this.customizationData).replace(/'/g, "&apos;")}'></caraouselgrid-view>`;
                break;
            default:
                activeContent = `<grid-view data='${JSON.stringify(this.data)}'></grid-view>`;
        }
        this.shadowRoot.innerHTML = `
        <style>
            .body{
                display : flex;
                flex-direction : column;
                align-items: center;
                background-color : #1a1a1a;
                padding : 10px;
                min-height : 100vh; 
            }
            .ownerEditBtn{
                position : absolute;
                left : 0;
                
            }
            .ownerEditBtn div{
                color : white;
                font-size : 10px;
            }
            .editBtn{
                padding : 5px 10px;
                font-size : 12px;
                background-color : red;
                border-radius : 5px;
                color : white;
            }
            
            .navbarBtns{
                width : 100%;
                display : flex;
                justify-content : space-evenly;
            }
            .dropdown {
                position : relative;
            }
            .dropbtn{
                background-color : black;
                border-radius : 4px;
                padding : 5px 24px;
                color : white;
                cursor : pointer;
                border : none;
                width : 100%;

            }
            .dropdown-content {
                display: none;
                position: absolute;
                background-color: white;
                box-shadow: 0px 8px 16px rgba(0,0,0,0.2);
                z-index: 1;
                width : 100%;
            }
            .dropdown:hover .dropdown-content {
                display: block;
            }
            .dropdown-content div {
                padding: 8px 16px;
                cursor: pointer;
            }
            .dropdown-content div:hover {
                background-color: #f1f1f1;
            }
            .viewBtns{
                display : flex;
                align-items : center;
                gap : 8px;
                background-color : black;
                padding : 5px;
                border-radius : 5px;
                width : fit-content;
            }
            .viewBtn{
                border-radius : 4px;
                padding : 5px 12px;
                color : white;
                cursor : pointer;
            }
            .active{
                background-color : #6750a4;
            }
            .view{
                margin-top : 20px;
                width : 100%;
                height : fit-content;
            }
            .heading{
                font-size : 25px;
                margin-top : 25px;
                margin-bottom : 20px;
                color : white;
            }
        </style>
        <div class="body">
            <div class="ownerEditBtn">
                <div>This pannel is only visible to the owner</div>
                <a class="editBtn" href="https://console.eventgeni.com/templates/edit/3763g?preview=sehb" target="_blank">Edit</a>
            </div>
            <div class="navbarBtns">
                <div class="dropdown">
                    <button class="dropbtn">Participation Filter</button>
                    <div class="dropdown-content">
                        <div class="filterOption" data-filter="Speaking">Speaking</div>
                        <div class="filterOption" data-filter="Exhibiting">Exhibiting</div>
                        <div class="filterOption" data-filter="Sponsoring">Sponsoring</div>
                        <div class="filterOption" data-filter="Attending">Attending</div>
                        <div class="filterOption" data-filter="All">All</div>
                    </div>
                </div>
                <div class="viewBtns">
                    <div class="viewBtn ${this.activeView === 'Your View' ? 'active' : ''}">Your View</div>
                    <div class="viewBtn ${this.activeView === 'Map' ? 'active' : ''}">Map</div>
                    <div class="viewBtn ${this.activeView === 'Calendar' ? 'active' : ''}">Calendar</div>
                </div>
                <div class="sortContainer">
                    <input type="date"/>
                </div>
            </div>

            <div class="heading">Meet us here</div>

            <div class="view">
                ${activeContent}
            </div>
        </div>

`
    }

}
customElements.define('page-widget', Pagewidget);