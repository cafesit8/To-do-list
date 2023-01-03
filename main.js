const dia = document.getElementById('dia')
const numero = document.getElementById('numero')
const mes = document.getElementById('mes')
const ano = document.getElementById('ano')

const date = new Date()
dia.textContent = date.toLocaleString('es', {weekday:'long'})
numero.textContent = date.toLocaleString('es', {day: 'numeric'})
mes.textContent = date.toLocaleDateString('es', {month: 'long'})
ano.textContent = date.toLocaleDateString('es', {year: 'numeric'})

const tarea = document.getElementById('tarea')
const btnAgregar = document.getElementById('agregar')
const contenedor = document.querySelector('.contenedor__tareas')
tarea.focus()

let tareas = []

btnAgregar.addEventListener('click', ()=>{
    if (tarea.value.length === 0  || tarea.value.length > 90) {
        return
    }else{
        const item = {
            tarea: `${tarea.value}`
        }
        tareas.push(item)
        localStorage.setItem('tarea-todolist', JSON.stringify(tareas))
        crearItem(tareas)
        tarea.value= ''
        tarea.focus()
    }
})

const crearItem=(tareas)=>{
    contenedor.innerHTML = ''
    tareas.forEach((ele,i) => {
        const div = document.createElement('div')
        div.classList.add('item')
        div.innerHTML += `
            <ion-icon id="check" name="ellipse"></ion-icon>
            <div class="texto">
                <p>${ele.tarea}</p>
            </div>
            <ion-icon id="eliminar" name="trash"></ion-icon>
        `
        contenedor.appendChild(div)
        contenedor.style = 'margin-top: 20px'
        validar(div)
        eliminar(div,i)
    });
}

const validar=(div)=>{
    const check = div.querySelector('#check')
    check.addEventListener('click', ()=>{
        check.classList.toggle('checked')
        if (check.classList.contains('checked')) {
            check.setAttribute('name', 'checkmark-circle')
        }else{
            check.setAttribute('name', 'ellipse')
        }
    })
}

const eliminar=(div,i)=>{
    const trash = div.querySelector('#eliminar')
    trash.addEventListener('click', ()=>{
        tareas.splice(i,1)
        contenedor.removeChild(div)
        console.log(tareas)
        localStorage.setItem('tarea-todolist', JSON.stringify(tareas))
    })
}

const list = JSON.parse(localStorage.getItem('tarea-todolist'))
crearItem(list)
tareas = [...list]