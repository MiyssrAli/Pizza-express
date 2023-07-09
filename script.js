let menus = [
  {
    name: "Pizza Margherita",
    menuImage: "./pizza-imgs/magehrita.jpg",
    zutatenBeschreibung:
      "Der klassiker läuft immer gut, machen ordentlich knete damit, äähh ich meine es schmeckt gut",
    preis: 8,
    größe: " Wahl aus: Medium (ø 28cm), Classic (ø 25cm) oder Large (ø 32cm).",
  },
  {
    name: "Pizza Salami",
    menuImage: "./pizza-imgs/diablo.jpg",
    zutatenBeschreibung:
      "schön frische salami aus hand gepflückt vom salami baum  immer wieder ein genuss",
    preis: 10,
    größe: " Wahl aus: Medium (ø 28cm), Classic (ø 25cm) oder Large (ø 32cm).",
  },
  {
    name: "Pizza Tonno",
    menuImage: "./pizza-imgs/thunfisch.jpg",
    zutatenBeschreibung:
      "der thunfisch kommt direkt aus italien in einem aldi und dann zu uns bis er reduzierrt ist",
    preis: 10.5,
    größe: " Wahl aus: Medium (ø 28cm), Classic (ø 25cm) oder Large (ø 32cm).",
  },
  {
    name: "Pizza chicken",
    menuImage: "./pizza-imgs/chicken.jpg",
    zutatenBeschreibung:
      "Hünchdn mit Reis! protein bombe für wenn man den teig weg lässt die soße und den käse. geheimtipp",
    preis: 15.5,
    größe: " Wahl aus: Medium (ø 28cm), Classic (ø 25cm) oder Large (ø 32cm).",
  },
  {
    name: "Pizza Olive",
    menuImage: "./pizza-imgs/olive.jpg",
    zutatenBeschreibung:
      "oliven komme auch aus italien hab ich eben gegoogelt, schmecken ganz gut",
    preis: 20.5,
    größe: " Wahl aus: Medium (ø 28cm), Classic (ø 25cm) oder Large (ø 32cm).",
  },
  {
    name: "Pizza hawaii",
    menuImage: "./pizza-imgs/hawaii.jpg",
    zutatenBeschreibung:
      "die einen hassen es die anderen lieben es, ich sag dazu nix",
    preis: 2.5,
    größe: " Wahl aus: Medium (ø 28cm), Classic (ø 25cm) oder Large (ø 32cm).",
  },
  {
    name: "Pizza kiwi",
    menuImage: "./pizza-imgs/kiwi.jpg",
    zutatenBeschreibung: "obst soll ja gesund sein aber das geht zu weit ",
    preis: 1.5,
    größe: " Wahl aus: Medium (ø 28cm), Classic (ø 25cm) oder Large (ø 32cm).",
  },
  {
    name: "Pizza lachs",
    menuImage: "./pizza-imgs/lachs.png",
    zutatenBeschreibung:
      "Lachs der couseng vom thunfisch schmecken gut und proteinreich",
    preis: 17.2,
    größe: " Wahl aus: Medium (ø 28cm), Classic (ø 25cm) oder Large (ø 32cm).",
  },
  {
    name: "Pizza schinken",
    menuImage: "./pizza-imgs/schinken.jpg",
    zutatenBeschreibung: "ist nicht so meins aber die leute lieben es ",
    preis: 9.2,
    größe: " Wahl aus: Medium (ø 28cm), Classic (ø 25cm) oder Large (ø 32cm).",
  },
];



function changeImg() { // Herz icon wechselt seine farbe
  
  let image = document.getElementById("picture");

  if (image.src.match("./img/herz.png")) {
    image.src = "./img/herz-rot.png";
  } else {
    image.src = "./img/herz.png";
  }
}


let pizzaName = [];
let price = [];
let amount = [];


function render() { // rendert meine speisekarte, daten holt er sich vom JSON array
  
  let content = document.getElementById("content");
  content.innerHTML = "";

  for (let i = 0; i < menus.length; i++) {
    const menu = menus[i];
    content.innerHTML += `<div class="card">
      <h2>${menu.name}</h2>
      <h4>${menu.zutatenBeschreibung}</h4>
      <h3>${menu.preis.toFixed(2).replace(".", ",")}€</h3>
      <div class="menuImage"> <img src="${menu.menuImage}" alt="" /></div>
      <p>${menu.größe}</p>
      <button onclick="addToBasket(${i})">+</button>
    </div>`;
  }
}


function addToBasket(i) {  // das [+] in der speise karte fügt mit .push die werte in den warenkorb bzw. updatet sie erstmal
 
  const pizza = menus[i];

  let index = pizzaName.indexOf(pizza.name);
  if (pizzaName.indexOf(pizza.name) === -1) {
    pizzaName.push(pizza.name);
    price.push(pizza.preis);
    amount.push(1);
  } else {
    amount[index]++;
  }
  renderbasket();
}


function renderbasket() { // hier werden jetz die werte in dem warenkorb angezeigt die vorher geupdatet waren
  
  let basketContainer = document.getElementById("basket");
  basketContainer.innerHTML = "";
  for (let i = 0; i < pizzaName.length; i++) {
    const item = pizzaName[i];
    const prices = price[i];
    const amounts = amount[i];
    basketContainer.innerHTML += `
    <div class ="basketclass">
  ${amounts}x ${item}: ${prices.toFixed(2).replace(".",",")}€
  <div class ="plus" onclick="addtocart(${i})"><b>+</b></div> <div class ="minus" onclick="removeFromBasket(${i})"><b>-</b></div>
</div>`;
  }
  totalprice();
}

function addtocart(i) {
  // erhöht die menge von den Pizzen im warenkorb
  amount[i]++;
  renderbasket(); // diese funktion upadtet sie wieder um es im warenkorb zu sehen (siehe funktion)
  totalprice();
}


function totalprice() {
  // der gesamt preis wird berechnet summe * menge
  let sum = 0;
  for (let i = 0; i < price.length; i++) {
    sum += price[i] * amount[i];
  }
  let totalContainer = document.getElementById("gesamt");
  if (!totalContainer) {
    // Überprüft, ob das Element existiert.
    totalContainer = document.createElement("div"); // Erstellt ein neues <div> Element.
    totalContainer.id = "gesamt"; // gibt dem element eine neue id
    totalContainer.classList.add("gesamt"); // gibt dem element die classe hinzu für das style
    document.getElementById("basket").appendChild(totalContainer); // Fügt das Gesamtpreis-Element dem Warenkorb-Container hinzu.
  } else {
    totalContainer.innerHTML = ""; //
  }
  totalContainer.innerHTML = `<div class ="gesamtpreis"><span><b>Gesamtpreis:<b> ${sum.toFixed(2).replace(".", ",")}€
  </span><button onclick="payMenus()">Bezahlen</button></div>`;
}


function removeFromBasket(i) {
  // die menge wird reduziert
  amount[i]--;
  if (amount[i] < 1) {
    pizzaName.splice(i, 1);
    price.splice(i, 1);
    amount.splice(i, 1);
  }
  renderbasket(); // jetzt wird die reduzierte menge aktualiesiert und angezeigt
  if (pizzaName.length === 0) {
    let totalContainer = document.getElementById("gesamt");
    if (totalContainer) {
      totalContainer.remove();
      let basketContainer = document.getElementById("basket");
      basketContainer.innerHTML = basketTemplate();
    }
  }
}


function basketTemplate(){
return `
<div class="basketname">
 
</div>
<div id="basket" class="shoppingCartLeer">
  <img src="./img/bag.png" alt="" />
  <h3>Fülle deinen Warenkorb</h3>
  <span>
    Füge einige leckere Gerichte aus der<br />
    Speisekarte hinzu und bestelle dein Essen
  </span>
</div>
`;
}

function payMenus(i){
  amount[i]--;
  
  pizzaName.splice(i, 9);
  price.splice(i, 9);
  amount.splice(i, 9);
alert('danke für ihren einkauf, ihre bestellung kommt in 4 minuten');
  renderbasket();
  if (pizzaName.length === 0) {
    let totalContainer = document.getElementById("gesamt");
    if (totalContainer) {
      totalContainer.remove();
      let basketContainer = document.getElementById("basket");
      basketContainer.innerHTML = basketTemplate();
    }
  }

}

function showMiniBasket() { /// zeigt mir den shoppingcart im handy modus bzw. in responiv
  let element = document.getElementById("myDiv");

  if (element.classList.contains("showCartInResponse")) {
    element.classList.remove("showCartInResponse");
    element.classList.add("shoppingCart");
  } else {
    element.classList.add("showCartInResponse");
    element.classList.remove("shoppingCart");
  }
}

function changeMiniBasketIcon(){

  let image = document.getElementById("basketPicture");

  if (image.src.match("./img/logoWarenkorb.png")) {
    image.src = "./img/Close.png";
  } else {
    image.src = "./img/logoWarenkorb.png";
  }

}