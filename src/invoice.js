import "./index.css";
const products = [
  {
    id: 1,
    name: "Domain",
    price: 13,
  },
  {
    id: 2,
    name: "Hosting",
    price: 60,
  },
  {
    id: 3,
    name: "Design Package",
    price: 250,
  },
  {
    id: 4,
    name: "Web Development",
    price: 500,
  },
];

const app = document.querySelector("#app");
const addRecord = app.querySelector("#addRecord");
const productSelect = app.querySelector("#productSelect");
const recordList = app.querySelector("#recordList");
const costTotal = app.querySelector(".cost-total");
const serviceList = app.querySelector("#serviceList");
const addService = app.querySelector("#addService");
const manageServiceBtn = app.querySelector("#manageServiceBtn");
const closeBtn = app.querySelector("#closeBtn");
const managementBox = app.querySelector("#managementBox");
const printBtn = app.querySelector("#printBtn");

// products.forEach(({name,price})=> {
// })

const createService = (id,name,price) => {
  const serviceRow = document.createElement("div");
  serviceRow.innerHTML =`
  <div class="w-full mb-5 flex items-center justify-between border border-gray-700 p-2">
          <h1>${name}</h1>
          <p>$<span>${price}</span></p>
        </div>`;
  return serviceRow;
};

products.forEach(({id,name,price}) => {
  productSelect.append(new Option(name,id));
  serviceList.append(createService(id,name,price));

});

const createRecordRow = (id,name, price, quantity) => {
  const recordRow = document.createElement("tr");
  recordRow.className = "border-b  border-neutral-200 group";
  recordRow.classList.add("record-row");
  recordRow.setAttribute("product-id",id)
  recordRow.innerHTML = `<td class="p-3"></td>
    <td class="p-3">${name}</td>
    <td class="record-row-price p-3 text-end">${price}</td>
    <td class="p-3 text-end ">
    <button class="record-quantity-decrement p-1 bg-gray-500 opacity-0 group-hover:opacity-100 duration-300 -translate-x-3 group-hover:translate-x-0 pointer-events-none group-hover:pointer-events-auto">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" class="w-4 h-4 stroke-white stroke-2  pointer-events-none">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
    </svg>
    
    </button>
    <span class="record-quantity">${quantity}</span>
    <button class="record-quantity-increment p-1 bg-gray-500 opacity-0 group-hover:opacity-100 duration-300 translate-x-3 group-hover:translate-x-0 pointer-events-none group-hover:pointer-events-auto">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" class="w-4 h-4 stroke-white stroke-2 pointer-events-none">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
      </svg>
    </button>
    </td>
    <td class="p-3 text-end  record-list-cost relative">
      <span>${price * quantity} </span>
      <button class="del p-2 bg-gray-500 right-0 opacity-0 group-hover:opacity-100 duration-300 translate-x-[120%] group-hover:translate-x-full h-full pointer-events-none group-hover:pointer-events-auto top-0 aspect-square flex justify-center items-center absolute">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokewidth="{1.5}" stroke="currentColor" class="w-4 h-4 stroke-white pointer-event-none stroke-2">
                    <path strokelinecap="round" strokelinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                  </svg>
                </button>
      </button>
    </td>`;

  return recordRow;
};

const recordTotal = () => {
  // const recordListCosts = document.querySelectorAll(".record-list-cost");

  costTotal.innerText = [...app.querySelectorAll(".record-list-cost")].reduce(
    (pv, cv) => pv + parseFloat(cv.innerText),
    0
  );
};

const recordIncrementHandler = (productId,quantity =1) => {
  const recordRow = app.querySelector(`[product-id= "${productId}"]`);
  const recordQuantity = recordRow.querySelector(".record-quantity");
  const cost = recordRow.querySelector(".record-list-cost");
  const price = recordRow.querySelector(".record-row-price");

  recordQuantity.innerText = parseInt(recordQuantity.innerText) + parseInt(quantity);
  cost.innerText= recordQuantity.innerText * price.innerText;
  recordTotal();

};
const recordDecrementHandler = (event) => {
  const recordRow = event.target.closest(".record-row");
  const quantity = recordRow.querySelector(".record-quantity");
  const cost = recordRow.querySelector(".record-list-cost");

  const price = recordRow.querySelector(".record-row-price");
  if(quantity.innerText > 1 ){
    quantity.innerText = parseInt(quantity.innerText) - 1;
  }
  
  cost.innerText= quantity.innerText * price.innerText;
  recordTotal();
};
const recordDelHandler = (event) => {
  const recordRow = event.target.closest(".record-row");
  recordRow.remove();
  recordTotal();
};

const addRecordHandler = (event) => {
  event.preventDefault();
  const formData = new FormData(addRecord);
  const { name, price } = products.find(
    (product) => product.id == formData.get("product_id")
  );

  // console.log(formData.get("product_id"));
  const isExitRow = [...app.querySelectorAll("[product-id]")].find((el) => el.getAttribute("product-id") == formData.get("product_id"))
  if(isExitRow){
     recordIncrementHandler(formData.get("product_id"),formData.get("quantity"))
  }else {
    
  recordList.append(createRecordRow(formData.get("product_id"),name, price, formData.get("quantity")));
  
  };
  
  addRecord.reset();
  recordTotal();
};

const manageServiceHandler = () => {
  managementBox.classList.toggle("translate-x-full");
}

const addServiceHandler = (event) => {
  event.preventDefault();

  const formData = new FormData(addService);
  const currentId = products[products.length-1].id + 1;
  const newService = {
    id : currentId,
    name: formData.get("new-name"),
    price: formData.get("new-price")
  }

  products.push(newService);
  productSelect.append(new Option(formData.get("new-name"),currentId));
  serviceList.append(createService(currentId,formData.get("new-name"),formData.get("new-price")))

  addService.reset()

  

};

const printHandler =() => {
  const rows = app.querySelectorAll(".record-row");
  const recordData = [...rows].map(row => {
    return {
      serverId : row.getAttribute("product-id"),
      price : parseInt(row.querySelector(".record-row-price").innerText),
      cost: parseInt(row.querySelector(".record-list-cost").innerText)
    }
  });
  
  console.log(recordData);

  window.print()
  rows.forEach(row => row.remove());
  app.querySelector(".cost-total").innerText = 0;
};


addRecord.addEventListener("submit", addRecordHandler);
recordList.addEventListener("click", (event) => {
  if (event.target.classList.contains("del")) {
    recordDelHandler(event);
  }
});

recordList.addEventListener("click",(event) => {
  const currentRecordRow = event.target.closest(".record-row")
  if(event.target.classList.contains("record-quantity-increment")){
    recordIncrementHandler(currentRecordRow.getAttribute("product-id"))
  }else if(event.target.classList.contains("record-quantity-decrement")){
    recordDecrementHandler(event)
  }
})

addService.addEventListener("submit",addServiceHandler);
manageServiceBtn.addEventListener("click",manageServiceHandler);
closeBtn.addEventListener("click",manageServiceHandler);
printBtn.addEventListener("click",printHandler);