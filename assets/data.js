const productsData = [
  {
    id: 1,
    name: "Lancome",
    precio: "$ 58.900",
    category: "femeninas",
    img: "./assets/imagenes/productos/la nuit tresor.jpg",
    descriptionProduct: "La Nuit Tresor Fleur de Nuit EDP",
    cuotas: "$9.817",
  },
  {
    id: 2,
    name: "Armani",
    precio: "$ 59.900",
    category: "femeninas",
    img: "./assets/imagenes/productos/armani.jpg",
    descriptionProduct: "My Way EDP",
    cuotas: "$9.983",
  },
  {
    id: 3,
    name: "Calvin Klein",
    precio: "$ 50.300",
    category: "unisex",
    img: "./assets/imagenes/productos/calvin klein.jpg",
    descriptionProduct: "CK Everyone EDP",
    cuotas: "$8.383",
  },
  {
    id: 4,
    name: "Paco Rabanne",
    precio: "$ 54.650",
    category: "masculinas",
    img: "./assets/imagenes/productos/paco rabanne.jpg",
    descriptionProduct: "Phantom EDT 100 ml + Elixir Bolso",
    cuotas: "$9.100",
  },
  {
    id: 5,
    name: "Cher",
    precio: "$ 12.990",
    category: "femeninas",
    img: "./assets/imagenes/productos/cher.jpg",
    descriptionProduct: "Iris EDP",
    cuotas: "$2.165",
  },
  {
    id: 6,
    name: "Lancome",
    precio: "$ 58.000",
    category: "femeninas",
    img: "./assets/imagenes/productos/la vie est belle.jpg",
    descriptionProduct: "La Vie Est Belle EDP",
    cuotas: "$9.667",
  },
  {
    id: 7,
    name: "Dior",
    precio: "$ 92.900",
    category: "masculinas",
    img: "./assets/imagenes/productos/christian dior sauvage.jpg",
    descriptionProduct: "Sauvage EDP",
    cuotas: "$15.483",
  },
];

const productsData2 = [
  {
    id: 1,
    name: "Lancome",
    precio: "$ 14.590",
    img: "./assets/imagenes/productos/eyeliner lancome.jpg",
    descriptionProduct: "Liner Idole Waterproof",
    cuotas: "$2.432",
  },
  {
    id: 2,
    name: "Iconic London",
    precio: "$ 11.060",
    img: "./assets/imagenes/productos/iconic gloss.jpg",
    descriptionProduct: "Lip Plumping Gloss",
    cuotas: "$1.843",
  },
  {
    id: 3,
    name: "Mac",
    precio: "$ 16.488",
    img: "./assets/imagenes/productos/powder fundation.jpg",
    descriptionProduct: "Studio Fix Powder Plus Fundation",
    cuotas: "$2.748",
  },
];

// f dividir array de productos por partes
const divideProductsSize = (size) => {
  let productsList = [];
  for (let i = 0; i < productsData.length; i += size)
    productsList.push(productsData.slice(i, i + size));
  return productsList;
};


// f Estado
const appState = {
  products: divideProductsSize(3),
  currentProductsIndex: 0,
  productsLimit: divideProductsSize(3).length,
  activeFilter: null
};