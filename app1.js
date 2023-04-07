class Producto{
    constructor(){
        this.id = ''
        this.titulo = ''
        this.descripcion = ''
        this.precio = ''
    }

    setID(){
        const getRandomInt = (min, max)=>{
            min = Math.ceil(min)
            max = Math.floor(max)
            return Math.floor(Math.random() * (max - min) + min);
        }
        this.id = getRandomInt(0, 1000000000)
    }

    setTitulo(value){
        this.titulo = value;
    }

    setDescripcion(value){
        this.descripcion = value
    }

    setPrecio(value){
        this.precio = value
    }

    getAll(){
        return{
            id: this.id,
            titulo: this.titulo,
            descripcion: this.descripcion,
            precio: this.precio,
        }
    }

}

class ListaDeProductos{
    constructor(){
        this.lista = [];
        this.precio = 0;
    }

    getProduct(value){
        this.lista.push(value)
    }

    deleteProducto(value){
        this.lista = this.lista.filter(e => e.id != value)
    }

    showProducto(){
        return this.lista
    }

    editProducto(value){
        const producto = this.lista.find(e => e.id === value)
        producto.precio = parseInt(prompt(`Ingresa el valor nuevo:`))

        this.lista = this.lista.filter(e => e.id != value)

        this.lista.push(producto)

        this.updateStates()

    }

    printProducts(){
        document.getElementById('tabla').innerHTML = ``

        this.lista.forEach(producto => {
            document.getElementById('tabla').innerHTML += `
            <tr>
            <td>${producto.titulo}</td>
            <td>${producto.descripcion}</td>
            <td>${producto.precio}</td>
            <td>${parseInt(producto.precio / JSON.parse(localStorage.getItem('dolar')).venta)}</td>
            <td id="${producto.id}" class="data-id-delete" style="color:red">X</td>
            <td id="E${producto.id}" class="data-id-edit" style="color:green">E</td>
        </tr>
            `
        })
    }



    updateLocalStorage(){
        const listaDeProductosString = JSON.stringify(this.lista)
        localStorage.setItem('productos', listaDeProductosString)

        console.log(JSON.parse(localStorage.getItem('productos')));
    }

    initLocalStorage(){
        if (JSON.parse(localStorage.getItem('productos') != null)) {
            this.lista = JSON.parse(localStorage.getItem('productos'))
        } else {
            this.lista = []
        }
    }

    totalPrice(){
        let total = 0

        this.lista.forEach(producto =>{
            total += producto.precio
        })
        
        this.total = total
        let ventaDolar = JSON.parse(localStorage.getItem('dolar')).venta
        console.log(ventaDolar);
        document.getElementById('total').textContent = `
        Total en pesos Argentinos = ${total} y Total en USD = ${total / ventaDolar}
    `
    }

    buyAll(){
        alert(`Compraste ${this.total}`)
        localStorage.clear()
        this.lista = []
        this.updateLocalStorage()
    }

    updateStates(){
        this.updateLocalStorage()
        this.printProducts()
        this.totalPrice()
    }
}

let dolar = ''
if (localStorage.getItem('dolar') == null) {
    let dolarVenta = 0
    let dolarCompra = 0

    dolar = {
        compra: dolarCompra,
        venta: dolarVenta
    }
    
}else{
    dolar = {
        compra: JSON.parse(localStorage.getItem('dolar')).compra,
        venta: JSON.parse(localStorage.getItem('dolar')).venta
    }
}

localStorage.setItem('dolar', (JSON.stringify(dolar)))

const listaDeProductos = new ListaDeProductos()
listaDeProductos.initLocalStorage()

document.getElementById('agregar').addEventListener('click', (e)=>{
    e.preventDefault()
    const product = new Producto()
    product.setID()

    const titulo = document.getElementById('titulo').value;
    product.setTitulo(titulo)

    const descripcion = document.getElementById('descripcion').value
    product.setDescripcion(descripcion)

    const precio = document.getElementById('precio').value
    product.setPrecio(parseInt(precio))

    listaDeProductos.getProduct(product)

    listaDeProductos.updateStates()

    console.log(product);
    console.log(listaDeProductos);
})

document.addEventListener('click', (e)=>{
    if (e.target.className == 'data-id-delete') {
        listaDeProductos.deleteProducto(e.target.id)
        listaDeProductos.updateStates()
    }else if(e.target.className == 'data-id-edit'){
        const id = e.target.id
        const idPlano = parseInt(id.slice(1))
        listaDeProductos.editProducto(idPlano)

    }
})



document.getElementById('comprar').addEventListener('click', ()=>{
    listaDeProductos.buyAll()
    listaDeProductos.updateStates()
})

const actualizacionDeCotizacion = (dolar)=>{
    document.getElementById('dolarHoy').textContent = `Dolar Blue 'Compra' = ${dolar[1]['casa'].compra} -- Dolar Blue 'Venta' = ${dolar[1]['casa'].venta}`

    const dolarStorage = JSON.parse(localStorage.getItem('dolar'))
    dolarStorage.compra = parseInt(dolar[1]['casa'].compra)
    dolarStorage.venta = parseInt(dolar[1]['casa'].venta)

    localStorage.setItem('dolar', JSON.stringify(dolarStorage))
}

const peticion = ()=>{
    fetch(('https://www.dolarsi.com/api/api.php?type=valoresprincipales'))
    .then(response => response.json())
    .then(data => actualizacionDeCotizacion(data))
}

peticion()