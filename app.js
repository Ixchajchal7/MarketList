// // // | | | | ENTIDADES | | | | |


class Producto {
    constructor(){
        this.id = '';
        this.titulo = '';
        this.descripcion = '';
        this.precio = '';
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
        this.descripcion = value;
    }
    setPrecio(value){
        this.precio = value;
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

class ListaDeProductos {
    constructor(){
        this.lista = [];
        this.total = 0
    }

    agregarProducto(value){
        this.lista.push(value)
    }
    borrarProducto(value){
        this.lista = this.lista.filter(e => e.id != value)
    }
    mostrarProducto(){
        return this.lista
    }

    imprimirProductos(){

        document.getElementById('tabla').innerHTML = ''

        this.lista.forEach(producto => {

            document.getElementById('tabla').innerHTML += `
            <tr>
                <td>${producto.titulo}</td>
                <td>${producto.descripcion}</td>
                <td>${producto.precio}</td>
                <td id="${producto.id}" class="data-id">X</td>
            </tr>
            `
        });

    }

    costoTotal(){
        let total  = 0

        this.lista.forEach(producto => {
            total += producto.precio
        })
        this.total = total
        document.getElementById('total').textContent = total
        // Mostrar valor en pantalla
    }

    comprarTodo(){
        alert(`Compraste ${this.total}`)
        localStorage.clear()
        this.lista = [];
        this.actualizar()
    }

    actualizarStorage(){
        // local storage
        // aqui cambiamos la logica a texto para que se guarde en local storage
        const listaDeProductosString = JSON.stringify(this.lista)
        localStorage.setItem('productos', listaDeProductosString)

        // CON JSON.parse cambiamos el texto de local storage a logica para mostrarla o usarla
        console.log(JSON.parse(localStorage.getItem('productos')));
    }

    iniciarStorage(){

        if (JSON.parse(localStorage.getItem('productos') != null)) {
            this.lista = JSON.parse(localStorage.getItem('productos'))
            this.actualizar()
        } else {
            this.lista = [];
            this.actualizar()
        }
    }

    actualizar(){
        this.actualizarStorage()
        this.costoTotal()
        this.imprimirProductos()

    }


}

// | | | | ENTIDADES | | | | |

const listaDeProductos = new ListaDeProductos();
// iniciadores de la aplicacion
listaDeProductos.iniciarStorage();

// | | | | EVENTOS | | | | |

document.getElementById('agregar').addEventListener('click', (e)=>{
    e.preventDefault()
    // Crear y guardar la información
    const producto = new Producto()

    producto.setID()

    const titulo = document.getElementById('titulo').value;
    producto.setTitulo(titulo);

    const descripcion = document.getElementById('descripcion').value;
    producto.setDescripcion(descripcion);

    const precio = document.getElementById('precio').value;
    producto.setPrecio(parseInt(precio))

    listaDeProductos.agregarProducto(producto)
    console.log(listaDeProductos);

    listaDeProductos.actualizar()
})

document.addEventListener('click', (e)=>{
    if (e.target.className == "data-id") {
        listaDeProductos.borrarProducto(e.target.id)
        listaDeProductos.actualizar()
    }
})

document.getElementById('comprar').addEventListener('click', ()=>{
    listaDeProductos.comprarTodo()
})
