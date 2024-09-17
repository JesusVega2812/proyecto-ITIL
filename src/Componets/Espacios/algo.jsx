// Actualiza la contraseña del usuario
app.put('/CambiarContrasenia', async(req,res) => {
    try{
        await sql.connect(config);
        const {idUsuario, contrasenia} = req.body;
        await sql.query`UPDATE Usuario SET contrasena = ${contrasenia} WHERE id_usuario = ${idUsuario}`;
        res.status(200).send('Usuario actualizado exitosamente');
    }catch(error){
        res.status(500).send('Error al actualizar usuario');
    }finally{
        await sql.close();
    }
});


// Traer el nombre del departamento que pertenece el usuario
app.get('/SelectDepartamento', async (req, res) => {
    try {
        await sql.connect(config);
        const idDepartamentoPertenece = req.query.id_pertenece; // Cambiar a req.query
        const checkNombreDep = await sql.query`
            select nombre from departamento where id_departamento = ${idDepartamentoPertenece}`;
        const result = checkNombreDep.recordset[0].nombre;
        res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({ error: 'Error al verificar nombre del departamento' });
    } finally {
        await sql.close();
    }
});

// Trae los Edificios
app.get('/SelectEdificios', async(req,res) => {
    try{
        await sql.connect(config);
        const checkEdificio = await sql.query(`select id_edificio, nombre from Edificio`);
        res.status(200).json({edificios: checkEdificio.recordset});
    }catch(error){
        console.error('Error al traer los edificios:', error.message);
        res.status(500).send('Error al traer los edificios');
    }finally{
        await sql.close();
    }
});

// Trae los Edificios segun su departamento
app.get('/SelectEdificiosPorDepartamento', async(req, res) => {
    try{
        await sql.connect(config);
        const id_departamento = req.query.id_departamento;
        const checkEdificioDepartamento = await sql.query(`
            SELECT DISTINCT E.id_edificio, E.nombre
            FROM EDIFICIO E
            JOIN ESPACIOS ES ON E.id_edificio = ES.id_edificio
            WHERE ES.id_departamento = ${id_departamento};
        `);
        res.status(200).json({edificios: checkEdificioDepartamento.recordset});
    }catch(error){
        console.error('Error al traer los edificios por departamento: ', error.message);
        res.status(500).send('Error al traer los edificios');
    }finally{
        await sql.close();
    }
});

// Trae los Espacios segun el edificio
app.get('/SelectEspaciosPorEdificio', async(req,res) => {
    try{
        await sql.connect(config);
        const id_edificio = req.query.id_edificio;
        const id_departamento = req.query.id_departamento;
        console.log('idEdificio: ', id_edificio);
        const checkEspacioEdificio = await sql.query(`
            SELECT DISTINCT TE.id_tipoEspacio, TE.nombre
            FROM TIPO_ESPACIO TE
            JOIN ESPACIOS ES ON TE.id_tipoEspacio = ES.id_tipoEspacio
            WHERE ES.id_edificio = ${id_edificio} AND ES.id_departamento = ${id_departamento};
        `);
        res.status(200).json({tiposEspacios: checkEspacioEdificio.recordset});
    }catch(error){
        console.error('Error al traer los espacios por edificio: ', error.message);
        res.status(500).send('Error al traer los espacios');
    }finally{
        await sql.close();
    }
});

// Trae los nombres de los espacios
app.get('/SelectNombrePorEspacios', async(req,res) => {
    try{
        await sql.connect(config);
        const id_tipoEspacio = req.query.id_tipoEspacio;
        const id_edificio = req.query.id_edificio;
        const id_departamento = req.query.id_departamento;
        console.log('idTipoEspacio ', id_tipoEspacio);
        const checkNombreEspacio = await sql.query(`
            SELECT ES.id_espacio, ES.nombre
            FROM ESPACIOS ES
            WHERE ES.id_tipoEspacio = ${id_tipoEspacio} AND ES.id_edificio = ${id_edificio} AND ES.id_departamento = ${id_departamento};
        `);
        res.status(200).json({nombresEspacio: checkNombreEspacio.recordset});
    }catch(error){
        console.error('Error al traer los nombres de los espacios: ', error.message);
        res.status(500).send('Error al traer los nombres de los espacios');
    }finally{
        await sql.close();
    }
});

// Trae los Tipos de Espacios
app.get('/SelectTipoEspacios', async(req,res) => {
    try{
        await sql.connect(config);
        const checkTipoEspacio = await sql.query(`select * from tipo_espacio`);
        res.status(200).json({tipoEspacios: checkTipoEspacio.recordset});
    }catch(error){
        console.error('Error al traer los tipos de espacios: ', error.message);
        res.status(500).json.send('Error al traer los tipos de espacios');
    }finally{
        await sql.close();
    }
});

// Trae la capacidad y la ubicacion segun el nombre del espacio
/*
app.get('/SelectCapacidadNombre', async(req,res) => {
    try{
        await sql.connect(config);
        const id_espacio = req.query.id_espacio;
        console.log('idEspacio ', id_espacio);
        const checkCapacidadUbicacionEspacio = await sql.query(`select id_espacio, capacidad, ubicacion_esp, nombre from ESPACIOS where id_espacio = ${id_espacio}`);
        const result = checkCapacidadUbicacionEspacio.recordset[0];
        console.log('capacidaaaaaad: ', result);
        res.status(200).json({capacidad: result.capacidad, ubicacion: result.ubicacion_esp, nombreEspacio: result.nombre});
    }catch(error){
        console.error('Error al traer la capacidad y ubicacion: ', error.message);
        res.status(500).json.send('Error al traer la capacidad y la ubicacion');
    }finally{
        await sql.close();
    }
});
*/
app.get('/SelectCapacidadNombre', async (req, res) => {
    try {
        await sql.connect(config);
        const id_espacio = req.query.id_espacio;
        console.log('idEspacio ', id_espacio);
        const request = new sql.Request();
        request.input('id_espacio', sql.Int, id_espacio);
        const result = await request.query('SELECT id_espacio, capacidad, ubicacion_esp, nombre FROM ESPACIOS WHERE id_espacio = @id_espacio');
        const capacidadUbicacion = result.recordset[0];
        console.log('capacidad: ', capacidadUbicacion);
        if (capacidadUbicacion) {
            res.status(200).json({
                capacidad: capacidadUbicacion.capacidad,
                ubicacion: capacidadUbicacion.ubicacion_esp,
                nombreEspacio: capacidadUbicacion.nombre
            });
        } else {
            res.status(404).json({ message: 'Espacio no encontrado' });
        }
    } catch (error) {
        console.error('Error al traer la capacidad y ubicacion: ', error.message);
        res.status(500).send('Error al traer la capacidad y la ubicacion');
    } finally {
        await sql.close();
    }
});

// Da de alta a espacios
app.post('/AltaEspacios', async(req, res) => {
    try{
        await sql.connect(config);
        const{tipoEspacio, edificio, idDepartamentoPertenece, ubicacion, capacidad, nombre} = req.body;
        await sql.query`INSERT INTO espacios(id_tipoEspacio, id_edificio, id_departamento, ubicacion_esp, capacidad, nombre)
            VALUES(${tipoEspacio}, ${edificio}, ${idDepartamentoPertenece}, ${ubicacion}, ${capacidad}, ${nombre});
            `;
        res.status(200).send('Espacio insertado exitosamente');
    }catch(error){
        console.error('Error al insertar el espacio:, ', error.message);
        res.status(500).send('Error al insertar el espacio');
    }finally{
        await sql.close();
    }
});

// Actualiza espacios
app.put('/ActualizaEspacio', async (req, res) => {
    const { tipoEspacio, edificio, idDepartamentoPertenece, ubicacion, capacidad, nombreEspacio, id_espacio } = req.body;
    console.log('Datos recibidos:', {
        tipoEspacio,
        edificio,
        idDepartamentoPertenece,
        ubicacion,
        capacidad,
        nombreEspacio,
        id_espacio
    });
    try {
        await sql.connect(config);
        const request = new sql.Request();
        request.input('id_tipoEspacio', sql.Int, tipoEspacio);
        request.input('id_edificio', sql.Int, edificio);
        request.input('id_departamento', sql.Int, idDepartamentoPertenece);
        request.input('ubicacion_esp', sql.VarChar, ubicacion);
        request.input('capacidad', sql.Int, capacidad);
        request.input('nombre', sql.VarChar, nombreEspacio);
        request.input('id_espacio', sql.Int, id_espacio);
        const result = await request.query(`
            UPDATE Espacios
            SET id_tipoEspacio = @id_tipoEspacio,
                id_edificio = @id_edificio,
                id_departamento = @id_departamento,
                ubicacion_esp = @ubicacion_esp,
                capacidad = @capacidad,
                nombre = @nombre
            WHERE id_espacio = @id_espacio
        `);
        if (result.rowsAffected[0] > 0) {
            res.json({ success: true, message: 'Espacio actualizado correctamente' });
        } else {
            res.json({ success: false, message: 'No se encontró el espacio para actualizar' });
        }
    } catch (error) {
        console.error('Error al actualizar el espacio:', error.message);
        res.status(500).json({ success: false, message: 'Error al actualizar el espacio' });
    } finally {
        await sql.close();
    }
});

// Elimina un espacio
app.delete('/EliminaEspacio', async (req,res) => {
    try{
        await sql.connect(config);
        const id_espacio = req.query.id_espacio;
        const result = await sql.query(`
            delete from ESPACIOS
            where id_espacio = ${id_espacio};
        `)
        if (result.rowsAffected[0] > 0) {
            res.json({ success: true, message: 'Espacio eliminado correctamente, soy servidor' });
        } else {
            res.json({ success: false, message: 'No se encontró el espacio para eliminar' });
        }
    } catch (error) {
        console.error('Error al eliminar el espacio:', error.message);
        res.status(500).json({ success: false, message: 'Error al eliminar el espacio' });
    } finally {
        await sql.close();
    }
});


app.post('/Login', async (req, res) => {
    try {
        await sql.connect(config);
        const { usuario, contra } = req.body;
        const loginCheckResult = await sql.query`
            SELECT * FROM dbo.VerificarUsuario(${usuario}, ${contra});
        `;
        const result = loginCheckResult.recordset[0];
        console.log('lala Resultado de VerificarUsuario:', result.id_usuario);
        if (result.EsValido === 1) {
            res.status(200).json({ esValido: true, idUsuario: result.id_usuario, idDepartamentoPertenece: result.id_departamento_pertenece});
        } else {
            res.status(200).json({ esValido: false });
        }
    } catch (error) {
        console.log('Error al verificar el inicio de sesión: ', error);
        res.status(500).json({ error: 'Error al verificar el inicio de sesión' });
    } finally {
        await sql.close();
    }
});