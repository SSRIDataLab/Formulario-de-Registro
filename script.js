document.addEventListener('DOMContentLoaded', function() {
    // Generar ID único para el registro
    const generateRegistroId = () => {
        const date = new Date();
        const dateString = date.getFullYear().toString() +
                          (date.getMonth() + 1).toString().padStart(2, '0') +
                          date.getDate().toString().padStart(2, '0');
        const randomString = Math.random().toString(36).substring(2, 10);
        return `REG-${dateString}-${randomString}`;
    };

    // Establecer ID al cargar la página
    if (document.getElementById('registro_id')) {
        document.getElementById('registro_id').value = generateRegistroId();
    }

    // Contadores para los items dinámicos
    let formacionCounter = 1;
    let experienciaCounter = 1;

    // Función para añadir un nuevo item de formación académica
    if (document.getElementById('add-formacion')) {
        document.getElementById('add-formacion').addEventListener('click', function() {
            const container = document.getElementById('formacion-container');
            const newItem = document.createElement('div');
            newItem.className = 'forma-item';
            newItem.innerHTML = `
                <div class="colum">
                    <div class="input-box w-33">
                        <label for="grado_${formacionCounter}">Grado Academico*</label>
                        <div class="select-box">
                            <select class="form-select" id="grado_${formacionCounter}" name="grado[]" required>
                                <option hidden>Seleccionar grado</option>
                                <option value="Bachiller">Bachiller</option>
                                <option value="Licenciatura">Licenciatura</option>
                                <option value="Maestría">Maestría</option>
                                <option value="Doctorado">Doctorado</option>
                            </select>
                        </div>
                    </div>
                    <div class="input-box">
                        <label for="institucion_${formacionCounter}">Institución*</label>
                        <input type="text" id="institucion_${formacionCounter}" name="institucion[]" required>
                    </div>
                </div>
                <div class="input-box">
                    <label for="titulo_${formacionCounter}">Título o descripción de grado obtenido*</label>
                    <input type="text" id="titulo_${formacionCounter}" name="titulo[]" required>
                </div>
                <div class="colum">
                    <div class="input-box">
                        <label for="paisgrado_${formacionCounter}">Pais de grado obtenido*</label>
                        <input type="text" id="paisgrado_${formacionCounter}" name="paisgrado[]" required>
                    </div>
                    <div class="input-box">
                        <label for="anioFinGrado_${formacionCounter}">Año obtención de grado*</label>
                        <input type="number" id="anioFinGrado_${formacionCounter}" name="anioFinGrado[]" min="1950" max="2030" required>
                    </div>
                </div>
                <button type="button" class="btn-remove">Eliminar</button>
            `;
            container.appendChild(newItem);
            
            // Añadir event listener al botón de eliminar
            newItem.querySelector('.btn-remove').addEventListener('click', function() {
                container.removeChild(newItem);
            });
            
            formacionCounter++;
        });
    }

    // Función para añadir un nuevo item de experiencia laboral
    if (document.getElementById('add-experiencia')) {
        document.getElementById('add-experiencia').addEventListener('click', function() {
            const container = document.querySelector('.expe-container');
            const newItem = document.createElement('div');
            newItem.className = 'expe-item';
            newItem.innerHTML = `
                <div class="colum">
                    <div class="input-box">
                        <label for="puesto_${experienciaCounter}">Cargo/Puesto*</label>
                        <input type="text" id="puesto_${experienciaCounter}" name="puesto[]" required>
                    </div>
                    <div class="input-box">
                        <label for="paisPuesto_${experienciaCounter}">Pais*</label>
                        <input type="text" id="paisPuesto_${experienciaCounter}" name="paisPuesto[]" required>
                    </div>
                </div>
                <div class="colum">
                    <div class="input-box">
                        <label for="Empresa_${experienciaCounter}">Institución/Empresa*</label>
                        <input type="text" id="Empresa_${experienciaCounter}" name="Empresa[]" required>
                    </div>
                    <div class="input-box w-25">
                        <label for="anioInicioPuesto_${experienciaCounter}">Año Inicio*</label>
                        <input type="month" id="anioInicioPuesto_${experienciaCounter}" name="anioInicioPuesto[]" required>
                    </div>
                    <div class="input-box w-25">
                        <label for="anioFinPuesto_${experienciaCounter}">Año Fin*</label>
                        <input type="month" id="anioFinPuesto_${experienciaCounter}" name="anioFinPuesto[]" required>
                    </div>
                </div>
                <div class="input-box">
                    <label for="descripcionPuesto_${experienciaCounter}">Descripción de puesto*</label>
                    <textarea id="descripcionPuesto_${experienciaCounter}" name="descripcionPuesto[]" rows="5" required></textarea>
                </div>
                <button type="button" class="btn-remove">Eliminar</button>
            `;
            container.appendChild(newItem);
            
            // Añadir event listener al botón de eliminar
            newItem.querySelector('.btn-remove').addEventListener('click', function() {
                container.removeChild(newItem);
            });
            
            experienciaCounter++;
        });
    }

    // Crear un elemento loading
    const loadingDiv = document.createElement('div');
    loadingDiv.id = 'loading';
    loadingDiv.className = 'loading hidden';
    loadingDiv.innerHTML = `
        <div class="loading-spinner"></div>
        <p>Enviando datos...</p>
    `;
    document.querySelector('.container').appendChild(loadingDiv);

    // Estilos para botón eliminar y loading
    const style = document.createElement('style');
    style.textContent = `
        .btn-remove {
            background-color:rgb(207, 92, 79);
            color: white;
            border: none;
            border-radius: 4px;
            padding: 5px 10px;
            cursor: pointer;
            margin-top: 10px;
        }
        .btn-remove:hover {
            background-color:rgb(109, 47, 41);
        }
        .hidden {
            display: none;
        }
        .loading {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.7);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            z-index: 9999;
        }
        .loading p {
            color: white;
            margin-top: 15px;
            font-size: 18px;
        }
        .loading-spinner {
            border: 6px solid #f3f3f3;
            border-top: 6px solid #433673;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            animation: spin 2s linear infinite;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);

    // Manejar el envío del formulario
    if (document.getElementById('submit-form')) {
        document.getElementById('submit-form').addEventListener('click', function(e) {
            e.preventDefault();
            
            const registroId = document.getElementById('registro_id').value;
            const form = document.querySelector('.registro');
            
            // Mostrar pantalla de carga
            document.getElementById('loading').classList.remove('hidden');
            
            // Preparar los datos para las diferentes hojas
            const datosPersonales = {
                registro_id: registroId,
                nombre: form.querySelector('#nombre_0').value,
                apaterno: form.querySelector('#apaterno_0').value,
                amaterno: form.querySelector('#amaterno_0').value,
                tipodoc: form.querySelector('#tipodoc_0').value, // Corregido: Ahora usa tipodoc_0
                nrodoc: form.querySelector('#nrodoc_0').value,
                nrotel: form.querySelector('#nrotel_0').value,
                correo: form.querySelector('#correo_0').value,
                fenac: form.querySelector('#fenac_0').value,
                ciudad: form.querySelector('#ciudad_0').value,
                pais: form.querySelector('#pais_0').value,
                direccion: form.querySelector('#direccion_0').value
            };
            
            // Recopilar datos de formación académica
            const formacionItems = form.querySelectorAll('.forma-item');
            const formacionData = [];
            
            formacionItems.forEach(item => {
                // Verifica si el elemento tiene un grado y otros campos necesarios
                const gradoSelect = item.querySelector('select[id^="grado"]');
                const institucionInput = item.querySelector('input[id^="institucion"]');
                const tituloInput = item.querySelector('input[id^="titulo"]');
                
                if (gradoSelect && institucionInput && tituloInput) {
                    formacionData.push({
                        registro_id: registroId,
                        grado: gradoSelect.value,
                        institucion: institucionInput.value,
                        titulo: tituloInput.value,
                        pais: item.querySelector('input[id^="paisgrado"]')?.value || '',
                        anio: item.querySelector('input[id^="anioFinGrado"]')?.value || ''
                    });
                }
            });
            
            // Recopilar datos de experiencia laboral
            const experienciaItems = form.querySelectorAll('.expe-item');
            const experienciaData = [];
            
            experienciaItems.forEach(item => {
                const puestoInput = item.querySelector('input[id^="puesto"]');
                const empresaInput = item.querySelector('input[id^="Empresa"]');
                
                if (puestoInput && empresaInput) {
                    experienciaData.push({
                        registro_id: registroId,
                        puesto: puestoInput.value,
                        pais: item.querySelector('input[id^="paisPuesto"]')?.value || '',
                        empresa: empresaInput.value,
                        fecha_inicio: item.querySelector('input[id^="anioInicioPuesto"]')?.value || '',
                        fecha_fin: item.querySelector('input[id^="anioFinPuesto"]')?.value || '',
                        descripcion: item.querySelector('textarea[id^="descripcionPuesto"]')?.value || ''
                    });
                }
            });
            
            // Enviar los datos a Google Sheet usando el script web app URL
            // IMPORTANTE: Necesitarás reemplazar esta URL con la de tu propio script desplegado
            const scriptURL = 'https://script.google.com/macros/s/AKfycbzBinH9wf4FPiszYsLjJMhu8k4ip-Xxku1ingvy3CGIhiTVMC6t_DMfa3whQRrq9tPV/exec';
            
            const allData = {
                datosPersonales: datosPersonales,
                formacionData: formacionData,
                experienciaData: experienciaData
            };
            
            console.log('Datos a enviar:', allData);
            
            // Simular un tiempo de carga para demostración (puedes eliminar o ajustar esto)
            setTimeout(() => {
                // Enviar los datos con fetch
                fetch(scriptURL, {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(allData)
                })
                //.then(response => {
                    //console.log('Formulario enviado exitosamente');
                    // Ocultar pantalla de carga
                    //document.getElementById('loading').classList.add('hidden');
                    // Mostrar confirmación
                    //document.getElementById('confirmation-id').textContent = registroId;
                    //document.querySelector('.registro').classList.add('hidden');
                    //document.getElementById('confirmation').classList.remove('hidden');
                //})
                .then(response => {
                    console.log('Formulario enviado exitosamente');
                    // Ocultar pantalla de carga
                    document.getElementById('loading').classList.add('hidden');
                    
                    // Obtener el nombre del usuario
                    const nombreUsuario = document.getElementById('nombre_0').value;
                    
                    // Mostrar confirmación con el nombre
                    document.getElementById('confirmation-name').textContent = nombreUsuario;
                    
                    // Ocultar el formulario y mostrar la confirmación
                    document.querySelector('.registro').classList.add('hidden');
                    document.getElementById('confirmation').classList.remove('hidden');
                })
                .catch(error => {
                    console.error('Error al enviar el formulario:', error);
                    // Ocultar pantalla de carga
                    document.getElementById('loading').classList.add('hidden');
                    alert('Ocurrió un error al enviar el formulario. Por favor, intenta nuevamente.');
                });
            }, 1500); // Simula 1.5 segundos de carga
        });
    }
    
    // Botón para crear un nuevo formulario
    if (document.getElementById('new-form')) {
        document.getElementById('new-form').addEventListener('click', function() {
            // Resetear formulario y generar nuevo ID
            document.querySelector('.registro').reset();
            document.getElementById('registro_id').value = generateRegistroId();
            
            // Limpiar elementos dinámicos excepto el primero
            const formacionItems = document.querySelectorAll('.forma-item:not(:first-child)');
            formacionItems.forEach(item => item.remove());
            
            const experienciaItems = document.querySelectorAll('.expe-item:not(:first-child)');
            experienciaItems.forEach(item => item.remove());
            
            // Resetear contadores
            formacionCounter = 1;
            experienciaCounter = 1;
            
            // Mostrar formulario y ocultar confirmación
            document.querySelector('.registro').classList.remove('hidden');
            document.getElementById('confirmation').classList.add('hidden');
        });
    }
});