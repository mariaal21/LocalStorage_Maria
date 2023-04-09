//seleccionar elementos del HTML
let products = document.querySelector("#productos");
let storedItems = document.querySelector("#selecionados");
let vaciar = document.querySelector("#vaciar");


//para que la lista esté vacía
let fragment = document.createDocumentFragment();

//array de productos
const arrayProductos = [
    { id: "nata",
    product: "Nata" },

    { id: "azucar",
    product: "Azúcar" },

    { id: "chocolate",
    product: "Chocolate" },

    { id: "arroz",
    product: "Arroz" },

    { id: "carne", 
    product: "Carne" },

    { id: "sal", 
    product: "Sal" },
];

let seleciones = JSON.parse(localStorage.getItem("shopping")) || [];


//pintar la lista con todos los productos
const dibujarlista = () => {
    arrayProductos.forEach(({ id, product }) => {
        const listElement = document.createElement("LI");
        listElement.id = id;
        listElement.innerHTML = `${product}
                                  <button class="add">Añadir</button>`;

        fragment.append(listElement);
    });
    products.append(fragment);
};

//Pintar lista local
const dibujarListaStorage = () => {
    storedItems.innerHTML = "";
    const productsToPrint = getLocal();
    productsToPrint.forEach((item) => {
        const articulosAñadir = document.createElement("li");
        articulosAñadir.id = item.id;
        articulosAñadir.innerHTML = `${item.count}x ${item.product}<button class="eliminar">Eliminar</button>`;
        fragment.append(articulosAñadir)

    });
    storedItems.append(fragment);
}


vaciar.addEventListener("click", () => {
    deleteAll();
});

//añadir el mismo producto
const AñadirmismoProducto = (id) => {
    const productFound = arrayProductos.find((item) => item.id == id).product;
    const productAlready = seleciones.find((item) => item.id == id);
    if (!productAlready) {
        seleciones.push({ id: id, product: productFound, count: 1 });
        setLocal();
    } else {
        productAlready.count++;
        setLocal();
    }
};




//elimar de la lista
const EliminarDeLaLista = (id) => {
    const productFound = seleciones.find((item) => item.id === id);
    if (productFound.count > 1) {
        productFound.count--;
        setLocal();
    } else {
        const elementIndex = seleciones.findIndex((item) => item.id === id);
        if (elementIndex !== -1) {
            seleciones.splice(elementIndex, 1);
            setLocal();
        }
    }
};


//añadir y eliminar
document.addEventListener("click", ({ target }) => {
    if (target.matches(".add")) {
        const id = target.parentElement.id;
        AñadirmismoProducto(id);
        dibujarListaStorage();
    } if (target.matches(".eliminar")) {
        const id = target.parentElement.id;
        EliminarDeLaLista(id);
        dibujarListaStorage();
    }
});


let setLocal = () => {
    return localStorage.setItem("shopping", JSON.stringify(seleciones));
};

let getLocal = () => {
    return JSON.parse(localStorage.getItem("shopping")) || [];
};

const deleteAll = () => {
    seleciones.forEach((item) => {
        item.count = 1;
    });

    localStorage.clear();
    seleciones = [];

    dibujarListaStorage([]);
};

dibujarlista();

