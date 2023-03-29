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

    printProducts(){
        document.getElementById('tabla').innerHTML = ``

        this.lista.forEach(producto => {
            document.getElementById('tabla').innerHTML += `
            <tr>
            <td>${producto.titulo}</td>
            <td>${producto.descripcion}</td>
            <td>${producto.precio}</td>
            <td id="${producto.id}" class="data-id">X</td>
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
        document.getElementById('total').textContent = total
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

const listaDeProductos = new ListaDeProductos()
listaDeProductos.initLocalStorage()

document.getElementById('agregar').addEventListener('click', (e)=>{
    e.preventDefault()
    console.log(e.target.value);
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
    if (e.target.className == 'data-id') {
        listaDeProductos.deleteProducto(e.target.id)
        listaDeProductos.updateStates()
    }
})

document.getElementById('comprar').addEventListener('click', ()=>{
    listaDeProductos.buyAll()
    listaDeProductos.updateStates()
})