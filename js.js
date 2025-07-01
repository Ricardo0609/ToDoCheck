const contenedorListas = document.getElementById('listas-container');
    const btnNuevaLista = document.getElementById('btn-nueva-lista');
    const inputNuevaLista = document.getElementById('input-nueva-lista');

    let listas = JSON.parse(localStorage.getItem('listas')) || [];

    function guardarListas() {
      localStorage.setItem('listas', JSON.stringify(listas));
    }

    function crearElementoLista(lista, indexLista) {
      const details = document.createElement('details');

      details.innerHTML = `
        <summary>
          ${lista.nombre}
          <button class="elim">x</button>
        </summary>
        <section class="tareas"></section>
        <div class="agrmas">
          <input placeholder="Añadir Tarea" type="text" class="inpagrmas">
          <div class="btnc">Añadir</div>
        </div>
      `;

      const btnEliminarLista = details.querySelector('summary .elim');
      btnEliminarLista.addEventListener('click', () => {
        listas.splice(indexLista, 1);
        guardarListas();
        renderListas();
      });

      const inputTarea = details.querySelector('.agrmas input');
      const btnTarea = details.querySelector('.agrmas .btnc');
      const contenedorTareas = details.querySelector('.tareas');

      function renderTareas() {
        contenedorTareas.innerHTML = '';
        lista.tareas.forEach((tarea, indexTarea) => {
          const div = document.createElement('div');
          div.className = 'artenlistcomp';
          div.innerHTML = `
            <input class="inpcheck" type="checkbox" ${tarea.completada ? 'checked' : ''}>
            <span class="nmbrecheck" style="color: ${tarea.completada ? 'gray' : 'black'}">${tarea.texto}</span>
            <button class="elim">x</button>
          `;

          div.querySelector('.inpcheck').addEventListener('change', e => {
            tarea.completada = e.target.checked;
            guardarListas();
            renderTareas();
          });

          div.querySelector('.elim').addEventListener('click', () => {
            lista.tareas.splice(indexTarea, 1);
            guardarListas();
            renderTareas();
          });

          contenedorTareas.appendChild(div);
        });
      }

      btnTarea.addEventListener('click', () => {
        const texto = inputTarea.value.trim();
        if (texto === '') return;
        lista.tareas.push({ texto, completada: false });
        guardarListas();
        renderTareas();
        inputTarea.value = '';
      });

      renderTareas();
      contenedorListas.appendChild(details);
    }

    function renderListas() {
      contenedorListas.innerHTML = '';
      listas.forEach((lista, index) => {
        crearElementoLista(lista, index);
      });
    }

    btnNuevaLista.addEventListener('click', () => {
      const nombre = inputNuevaLista.value.trim();
      if (nombre === '') return;
      listas.push({ nombre, tareas: [] });
      guardarListas();
      renderListas();
      inputNuevaLista.value = '';
    });

    renderListas();