const men=[
    {
        brand : 'Diverse',
        name  : 'Cashual Shirt',
        cost  : 679,
        src   : 'shirt'
    },
    {
        brand : 'Wild Horn',
        name  : 'Hunter Leather Wallet',
        cost  : 425,
        src   : 'wallet'
    },
    {
        brand : 'University Trendz',
        name  : 'Leather Beads Bracelet',
        cost  : 138,
        src   : 'bracelet'
    },
    {
        brand : 'urban Forest',
        name  : 'Leather Belt',
        cost  : 499,
        src   : 'belt'
    },
    {
        brand : 'Scott International',
        name  : 'Pack of 3 T-Shirt',
        cost  : 419,
        src   : 't-shirt'
    },
    {
        brand : 'Wooum',
        name  : 'Laptop Bag',
        cost  : 449,
        src   : 'bag'
    }
];

const kids=[
    {
        brand : 'Luicy',
        name  : 'Hand Free Umbrella',
        cost  : 449,
        src   : 'umbrella'
    },
    {
        brand : 'Hopescotch',
        name  : "Boy's Tees",
        cost  : 330,
        src   : 't-shirt'
    },
    {
        brand : 'Pinkit',
        name  : 'Warm Winter Face Mask',
        cost  : 445,
        src   : 'mask'
    },
    {
        brand : 'Hopscotch',
        name  : 'Boys Top & Pant Set',
        cost  : 609,
        src   : 'dress'
    },
    {
        brand : 'Book My Costume',
        name  : 'Kids Fancy Dress',
        cost  : 449,
        src   : 'costume'
    },
    {
        brand : 'Shocknshop',
        name  : 'Watch',
        cost  : 259,
        src   : 'watch'
    }
];

const women=[
    {
        brand : 'Deva Fashions',
        name  : 'Gold Stylish Jewellery',
        cost  : 210,
        src   : 'jewell'
    },
    {
        brand : 'Anni Desinger',
        name  : 'Cotton Blend Kurta',
        cost  : 699,
        src   : 'kurta'
    },
    {
        brand : 'Beta',
        name  : 'Deva Fashions',
        cost  : 599,
        src   : 'sandal'
    },
    {
        brand : 'Mirchi Fashion',
        name  : 'Bandhani Saree',
        cost  : 399,
        src   : 'saree'
    },
    {
        brand : 'SXF Fashion',
        name  : 'Speed X Fashion',
        cost  : 561,
        src   : 'hand-bag'
    },
    {
        brand : 'Louis Devin',
        name  : 'Analogue Watch',
        cost  : 369,
        src   : 'watch'
    }
];

const collections={
    women : women,
    men : men,
    kids : kids
}

const btns=document.querySelectorAll('.button')
const cards=document.querySelector('.cards');
const initialBtn=document.getElementById('men');
const productDiv=document.querySelector('.product-detail');
const cartHead=document.querySelector('.cart-head');
const cartSection=document.querySelector('.cart-section');
const totalCost=document.querySelector('span');
console.log(productDiv.hasChildNodes());
let cartBtns;
let names=[];
let totalPrice=0;

// initial display of cards
createCards(men, 'men')
initialBtn.style.backgroundColor="#1f6105";

// function to load different section of cards
function loadCards(){
    btns.forEach(btn =>{
        btn.addEventListener('click', ()=>{
           let arr=collections[btn.id]
           createCards(arr, btn.id);
           btn.style.backgroundColor="#1f6105"
        })
    })
};

// function to create cards of different section
function createCards(arr, name){
    loadCards();
    // changing the background color of active section
    btns.forEach((btn)=>{
        btn.style.backgroundColor="#1b61b1"
    });
    cards.innerHTML="";
    arr.forEach(e => {
        // creating elements for each card
        const div=document.createElement('div');
        const img=document.createElement('img');
        const h2=document.createElement('h2');
        const h3=document.createElement('h3');
        const h4=document.createElement('h4');
        const button=document.createElement('button');

        div.setAttribute('class', 'card');
        div.append(img, h2, h3, h4, button);
        cards.appendChild(div);
        
        // set values for each card
        img.src=`./images/${name}/${e.src}.jpg`
        h2.textContent=e.brand;
        h3.textContent=e.name;
        h4.textContent=`₹${e.cost}`;
        button.textContent="ADD TO CART";
        let qt=0;
        // create a object that holds value of a card
        const obj={
          q: qt,
          source: img.src,
          name: h3.textContent,
          cost: e.cost
        };
        // add event listener to addtocart button
        button.addEventListener('click', ()=>{
            obj.q++;
            addToCart(obj);
            setTimeout(()=>{
                alert('PRODUCT SUCCESSFULLY ADDED TO CART 😊');
            }, 200)
        })
    });
};

// function to add card details to cart section
function addToCart(obj){
    cartHead.style.display='block';
    cartSection.style.display='flex';
    let price;
    // creating elements for cart section
    // when a card to be added first time
    if(obj.q<=1){
        const div1=document.createElement('div');
        const img1=document.createElement('img');
        const h41=document.createElement('h4');
        const h42=document.createElement('h4');
        const h43=document.createElement('h4');
        const h44=document.createElement('h4');
        const h45=document.createElement('h4');
        div1.setAttribute('class', 'product');
        h41.setAttribute('class', 'p-name');
        div1.append(img1, h41, h42, h43, h44, h45);
        productDiv.appendChild(div1);

        img1.src=obj.source;
        h41.textContent=obj.name;
        h42.textContent=obj.q;
        h43.innerHTML='<i class="fa-solid fa-plus"></i>';
        h44.innerHTML='<i class="fa-solid fa-xmark"></i>';
   
       // update value of price for an element
       price=eval(obj.q*obj.cost);
       h45.textContent=`₹${price}`;
    
      // add event listener to (×) to remove a product from added list
       h44.addEventListener('click', ()=>{
          if(h42.textContent==1){
             obj.q=0;
             productDiv.removeChild(div1);
             if(!(productDiv.hasChildNodes())){
               cartHead.style.display='none';
               cartSection.style.display='none';
              }
            }else if(h42.textContent>=2){
                h42.textContent--;
               obj.q--;
            }
           price=eval(obj.q*obj.cost);
           h45.textContent=`₹${price}`;
          totalPrice=eval(totalPrice-obj.cost);
          totalCost.textContent=`₹${totalPrice}`;
        });

        // add event listener to(+) to increase the quantity of added product
        h43.addEventListener('click', ()=>{
          h42.textContent++;
          obj.q++;
          price=eval(obj.q*obj.cost);
          h45.textContent=`₹${price}`;
          totalPrice=eval(totalPrice+obj.cost);
          totalCost.textContent=`₹${totalPrice}`;
        });
    }else{
        // when a card to be added second time
        const qArr=productDiv.querySelectorAll('.p-name');
        qArr.forEach(el =>{
           if(el.innerText==obj.name){
              (el.nextElementSibling).textContent=obj.q;
              price=eval(obj.q*obj.cost);
              ((el.parentElement).lastElementChild).textContent=`₹${price}`
            }
        }) 
    };
    // update total price value
    totalPrice=eval(totalPrice+obj.cost);
    console.log(totalPrice);
    totalCost.textContent=`₹${totalPrice}`;
};


