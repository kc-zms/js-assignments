var tables= [{
    tableNumber: 1,
    rate: 0,
    items: []
},
{
    tableNumber: 2,
    rate: 0,
    items:  []
},
{
    tableNumber: 3,
    rate: 0,
    items:  []
},
{
    tableNumber: 4,
    rate: 0,
    items:  []
},
{
    tableNumber: 5,
    rate: 0,
    items:  []
},
{
    tableNumber: 6,
    rate: 0,
    items:  []
},
];

var items = [
    {
        itemName: "Jeera Rice",
        price: 150,
        type:"Rice"
    },

    {
        itemName: "Paneer Chatpata",
        price: 350,
        type:"Main Course"
    },
    {
        itemName: "Veg Manchuria",
        price: 250,
        type:"Starters"
    },
    {
        itemName: "Veg Biryani",
        price: 200,
        type:"Rice"
    },
    {
        itemName: "Schezwan Fried Rice",
        price: 200,
        type:"Rice"
    },
    {
        itemName: "Paneer Butter Masala",
        price: 240,
        type:"Main Course"
    },
    {
        itemName: "Ginger Gobi",
        price: 260,
        type:"Main Course"
    },

    {
        itemName: "Baby Corn Manchuria",
        price: 320,
        type:"Starters"
    },

    {
        itemName: "Thumsup",
        price: 30,
        type:"Drinks"
    },
    
    {
        itemName: "Butterscotch Ice Cream",
        price: 60,
        type:"Desserts"
    },

    {
        itemName: "Coke",
        price: 50,
        type:"Drinks"
    },

    {
        itemName: "Pepsi",
        price: 40,
        type:"Drinks"
    },

    {
        itemName: "Chilli Paneer",
        price: 220,
        type:"Starters"
    },

    {
        itemName: "Mexican Brownie",
        price: 80,
        type:"Desserts"
    },
];

function displayTables(){

    for (const table of tables){

        let tableComponent = document.createElement('div');
        tableComponent.className='tableComponent';
        tableComponent.id=`${table.tableNumber}`;

        tableComponent.addEventListener('drop', function (event) { 
            event.preventDefault();
            var data = event.dataTransfer.getData("text");
            let a = data.split('-');
            let item_name = a[0];
            let item_price = a[1];
            
            let table_id =  event.target.id;

            console.log(item_name);
            console.log(item_price);
            console.log(table_id);

            updateTableState(item_name,item_price,table_id);
            updateTable(table_id);
         });
        
        tableComponent.addEventListener('dragover', function (event) { event.preventDefault();});

        tableComponent.addEventListener('click', function () { displayBill(this) });
        let tableName = document.createElement('h2');
        tableName.className = 'tableName';
        tableName.innerHTML = `Table - ${table.tableNumber}`;

        tableComponent.appendChild(tableName);

        let priceAndTotalItems = document.createElement('p');
        
        let price = document.createElement('span');
        price.className = 'bill';
        price.innerHTML = `Rs. ${table.rate} | `;
        price.id = `table-${table.tableNumber}-amount`;

        let totalItems = document.createElement('span');
        totalItems.className = 'totalItems';
        totalItems.id = `table-${table.tableNumber}-items`;
        totalItems.innerHTML = `Total items : ${table.items.length}`;

        priceAndTotalItems.appendChild(price);
        priceAndTotalItems.appendChild(totalItems);

        tableComponent.appendChild(priceAndTotalItems);

        document.getElementById('table').appendChild(tableComponent);

    }
}

function displayItems(){
    for(const item of items){
        let itemComponent = document.createElement('div');
        itemComponent.addEventListener('dragstart',function(event){
            event.dataTransfer.setData("text", event.target.id);
        });
        itemComponent.draggable='true';
       
        let itemName = document.createElement('h2');
        itemName.className = 'itemName';
        itemName.innerHTML = item.itemName;
        itemComponent.appendChild(itemName);
        itemName.style.fontSize = '24px';

        let itemCost = document.createElement('h3');
        itemCost.className = 'itemCost';
        itemCost.innerHTML = `Rs. ${item.price}/-`;
        itemCost.id=`${item.price}`;
        itemComponent.appendChild(itemCost);

        let itemType = document.createElement('span');
        itemType.className = 'itemType';
        itemType.innerHTML =  `(${item.type})`;
        itemComponent.appendChild(itemType);


        itemComponent.className = `${item.itemName}`;
        itemComponent.id = `${item.itemName}-${item.price}-${item.type}`;
        itemComponent.classList.add('itemComponent');
        document.getElementById('item').appendChild(itemComponent);
    }
    fetch("./js/home-menu/items.json")
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
    });

}

function updateTableState(item_name,item_price,table_id){
    var flag=0;
    for(const element of tables[table_id-1].items){
        if(element.food === item_name){
            element.count++;
            flag=1;
            break;
        }
    }

    if(flag==0){
        var tempItem = {
            food : item_name,
            price : item_price,
            count : 1
        }

        tables[table_id-1].items.push(tempItem);
    }  
}

function updateTable(table_id){
    let totalAmount = 0;
    let totalItems = 0;
    for(const element of tables[table_id-1].items){
        totalAmount+= element.price*element.count;
        totalItems+=element.count;
    }

    tables[table_id-1].rate=totalAmount;
    document.getElementById(`table-${table_id}-amount`).innerHTML = `Rs. ${totalAmount} `;
    document.getElementById(`table-${table_id}-items`).innerHTML = `Total Items: ${totalItems}`;
}

function searchTable(){
    let tableSearch = document.getElementById('tableSearch').value;
    let searchedTableComponent = document.getElementsByClassName("tableComponent");

    if(tableSearch!=" "){
        for(let i=0;i<searchedTableComponent.length;i++){
            if(searchedTableComponent[i].id.indexOf(tableSearch)!=-1){
                console.log(searchedTableComponent[i].style.display);
                searchedTableComponent[i].style.display = 'block';
            }
            else
                searchedTableComponent[i].style.display = 'none';
        }
    }
}

function searchItem(){
    let itemSearch = document.getElementById('itemSearch').value;
    let searchedItemComponent = document.getElementsByClassName("itemComponent");

    for(let i=0;i<searchedItemComponent.length;i++){
        if(searchedItemComponent[i].className.toLowerCase().indexOf(itemSearch.toLowerCase())!=-1)
            searchedItemComponent[i].style.display='block';
        else
            searchedItemComponent[i].style.display = 'none';
    }
}

var visible=false;
var currentId;
function displayBill(ele){
    if(visible === true){
        document.getElementById("modal").style.display="none";
        document.getElementById('app').style.filter="none";
        visible=false;
        document.getElementById(currentId).style.backgroundColor="white";
    }
    else{
        visible=true;
        document.getElementById('modal').style.display="block";
        document.getElementById('app').style.filter="blur(5px)";
        document.getElementById("modalHeading").innerHTML ="Table - "+ ele.id + " | Order Details";
        currentId=ele.id;
        updateBill(currentId); 
        document.getElementById(currentId).style.backgroundColor="#8E6117";
    }
}

function updateBill(table_id){
    document.getElementById('table-bill').innerHTML=` <tr >
        <th>S-no</th>
        <th>Item</th>
        <th>Price</th>
        <th>Quantity</th>
    </tr>`;
        let mycount=0;
        for(let i=0;i<tables[table_id-1].items.length;i++){
            
          if(tables[table_id-1].items[i].count!=0){
          document.getElementById('table-bill').innerHTML+=`
          <tr>
            <td> ${++mycount} </td>
            <td>${tables[table_id-1].items[i].food}</td>
            <td>${tables[table_id-1].items[i].price}</td>
            <td>
                <input type='number' 
                    class="quantity" 
                    min='1' max'20' 
                    value = '${tables[table_id-1].items[i].count}' 
                    onchange='updateValue(${table_id},${i},this)' />         
            </td>
            <td>
                <button style="float: right;" onclick="deleteItem(${table_id},${i})" > 
                    <p class="material-icons" style="font-size: 24px;margin: 0px;">delete_forever</p>  
                </button>
            </td>
          </tr>
          `;
          }
        }
        let total =0;
        for(let i=0;i<tables[table_id-1].items.length;i++){
            total += (tables[table_id-1].items[i].count * tables[table_id-1].items[i].price);
        }
        document.getElementById('displaytotal').innerHTML = total;
        updateTable(table_id);
}

function generateBill(){
    alert("Bill generated and session closed.");
    tables[currentId-1].items=[];
    document.getElementById(`table-${currentId}-amount`).innerHTML=`Rs. 0 | `;
    document.getElementById(`table-${currentId}-items`).innerHTML=`items: 0`;
    updateBill(currentId);
    displayBill();
}

 function updateValue(table_id,index,ev){
        tables[table_id-1].items[index].count = parseInt(ev.value);
        updateBill(table_id);
}


function deleteItem(table_id,index ){
    tables[table_id-1].items[index] = {
        food : "",
        price : 0,
        count : 0,
    };
    updateBill(table_id);
}


function sortItemsAsc(){
    let a = [];
    let ic =[];
    
    let sortItemComponent = document.getElementsByClassName("itemComponent");
    console.log(typeof(sortItemComponent));
    for(let i =0;i<sortItemComponent.length;i++){
        let data = sortItemComponent[i].id;
        let arr = data.split('-');
        a.push(parseInt(arr[1]));
        ic.push(sortItemComponent[i]); 
    }
    console.log(a);
    let temp;
    for (let i=0;i<a.length-1;i++){
        for(let j=i+1;j<a.length;j++){
            if(a[j]<a[i]){
                temp=a[i];
                a[i]=a[j];
                a[j]=temp;

                temp=ic[i];
                ic[i]=ic[j];
                ic[j]=temp;
            }
        }
    }
    for(let i=0;i<ic.length;i++){
        document.getElementById('item').appendChild(ic[i]);
    }
   
    console.log(a);
    console.log(ic);

}

function sortItemsDesc(){
    let a = [];
    let ic =[];
    
    let sortItemComponent = document.getElementsByClassName("itemComponent");
    console.log(typeof(sortItemComponent));
    for(let i =0;i<sortItemComponent.length;i++){
        let data = sortItemComponent[i].id;
        let arr = data.split('-');
        a.push(parseInt(arr[1]));
        ic.push(sortItemComponent[i]); 
    }
    console.log(a);
    let temp;
    for (let i=0;i<a.length-1;i++){
        for(let j=i+1;j<a.length;j++){
            if(a[j]>a[i]){
                temp=a[i];
                a[i]=a[j];
                a[j]=temp;

                temp=ic[i];
                ic[i]=ic[j];
                ic[j]=temp;
            }
        }
    }
    for(let i=0;i<ic.length;i++){
        document.getElementById('item').appendChild(ic[i]);
    }
   
    console.log(a);
    console.log(ic);

}
function selectType(){
    var option = document.getElementById("category");
    var value = option.options[option.selectedIndex].value;
    let searchedItemComponent = document.getElementsByClassName("itemComponent");
  
    if(value.toLowerCase() == "all"){
        for(let i=0;i<searchedItemComponent.length;i++)
            searchedItemComponent[i].style.display='block';
    }
    else{
        for(let i=0;i<searchedItemComponent.length;i++){
            let data = searchedItemComponent[i].id;
            let val = data.split('-');
            val = val[2];
            console.log(val , value);

            if(val.toLowerCase().indexOf(value.toLowerCase())!=-1)
                searchedItemComponent[i].style.display='block';
            else
                searchedItemComponent[i].style.display = 'none';
        }
   }
    
}
