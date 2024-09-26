// class Modal extends HTMLElement {
//     constructor() {
//         super();
//         this.attachShadow({ mode: 'open' });
//         this.timeData = ['10:00 am', '11:00 am', '3:00 pm'];
//         this.IsTimeSelected = "";
//         this.Time = "";
//         this.IsFormOpen = false;
//         this.render();
//     }

//     // To accept the incoming props
//     get datanumber() {
//         return this.getAttribute('datanumber');
//     }
//     set datanumber(value) {
//         this.setAttribute('datanumber', value);
//     }

//     connectedCallback() {
//         this.updateTime();
//         this.attachEventListeners();

//     }

//     attachEventListeners() {
//         this.shadowRoot.addEventListener('click', (event) => {
//             const target = event.target;

//             // Check if the clicked element is a time button
//             if (target.classList.contains('time')) {
//                 const time = target.textContent.trim(); // Remove leading and trailing spaces
//                 this.handleTime(time);
//             }
//             // Check if the clicked element is the next button
//             if (target.classList.contains('nextBtn')) {
//                 if (this.IsFormOpen) {
//                     this.handleFormModal(false);
//                 } else {
//                     this.handleFormModal(true);
//                 }
//             }
//             if (target.classList.contains('cancelBtn')) {
//                 const openModalEvent = new CustomEvent('modal-open', {
//                     detail: {
//                         // Optionally pass relevant data to parent component
//                         open: false, // Assuming you have `cardData` defined
//                     },
//                     bubbles: true, // Allow event to bubble up
//                     composed: true, // Allow event to cross shadow DOM boundaries
//                 });
//                 this.dispatchEvent(openModalEvent)
//             }


//         });
//     }

//     handleTime(time) {
//         this.IsTimeSelected = time;
//         this.render();
//     }

//     handleFormModal(value) {
//         this.IsFormOpen = value;
//         this.render();
//     }

//     // attributeChangedCallback(name, oldValue, newValue) {
//     //     if (name === 'dataNumber') {
//     //         this.dataNumber = Number(newValue);
//     //     }
//     // }

//     updateTime() {
//         const date = new Date();
//         this.Time = date.toLocaleTimeString();
//     }

//     handleModal() {
//         this.dispatchEvent(new CustomEvent('modal-closed', { bubbles: true, composed: true }));
//     }

//     render() {
//         this.shadowRoot.innerHTML = `
//             <style>
//             .container {
//                 width:80%;
//                 display: flex;
//                 justify-content: center;
//                 background-color: rgb(238, 238, 238);
//                 padding: 50px;
//                 border-radius: 10px;
//             }
//                 .calendar {
//                     display: flex;
//                     justify-content: space-between;
//                 }

//                 .dateInput {
//                     width: 200px;
//                     height: 30px;
//                     border: 1px solid #ccc;
//                     border-radius: 5px;
//                     padding: 5px;
//                 }
//                 .timeSlots h1 {
//                     font-size: 25px;
//                     color: rgb(96, 63, 240);
//                     font-weight: 700;
//                 }

//                 .timeSlots .time {
//                     font-size: 15px;
//                     border: 1px solid rgb(96, 63, 240);
//                     border-radius: 5px;
//                     padding: 10px 60px;
//                     margin: 10px;
//                     cursor: pointer;
//                 }

//                 .timeSlots .time:hover {
//                     transition-duration: .3s;
//                     background-color: rgb(96, 63, 240);
//                     color: white;
//                 }

//                 .timeSlots .selectedTime {
//                     background-color: rgb(96, 63, 240);
//                     color: white;
//                 }

//                 .timeSlots .nextBtn {
//                     background-color: silver;
//                     width: fit-content;
//                     padding: 5px 10px;
//                     font-size: 20px;
//                     border-radius: 5px;
//                     margin-top: 30px;
//                     margin-left: 10px;
//                     border: none;
//                     cursor: pointer;
//                 }

//                 .timeSlots .cancelBtn {
//                     background-color: transparent;
//                     border: 1px solid silver;
//                     width: fit-content;
//                     padding: 5px 10px;
//                     font-size: 20px;
//                     border-radius: 5px;
//                     margin-top: 30px;
//                     margin-left: 10px;
//                     cursor: pointer;
//                     color: grey;
//                 }

//                 .ist {
//                     display: flex;
//                     margin-top: 10px;
//                 }
//             </style>
//             ${!this.IsFormOpen ? `
//                     <div class="container">
//                         <div class="calendar">
//                             <input type="date" class="dateInput" />
//                         </div>
//                         <div class="timeSlots">
//                             <h1>Time Slots</h1>
//                             ${this.timeData.map((item) =>
//             '<div class="time ' + (this.IsTimeSelected === item ? 'selectedTime' : '') + '">' + item + '</div>'
//         ).join('')}
                            
//                             <div class="btns">
//                                 <button class="nextBtn">Next</button>
//                                 <button class="cancelBtn">x</button>
//                             </div>
//                         </div>
//                     </div>
//                 ` :
//                 `<register-form datanumber="${this.datanumber}" class="container"></register-form>`
//             }
//         `;
//     }
// }

// customElements.define('modal-component', Modal);
