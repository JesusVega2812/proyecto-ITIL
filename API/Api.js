const express = require('express');
const sql = require('mssql');
const cors = require('cors');
const port = 3000;

const app = express();
app.use(cors());
app.use(express.json());

// Configuración de conexión a SQL Server
const config = {
    user: 'sa',
    password: '1234',
    server: 'localhost', // Ejemplo: localhost
    database: 'proyectoITIL',
    options: {
        encrypt: false, // Si usas Azure
        trustServerCertificate: true // Si usas SQL Server local
    }
};


// Conexión a la base de datos
sql.connect(config, err => {
    if (err) {
        console.error('Error de conexión a la base de datos:', err);
        return;
    }
    console.log('Conectado a SQL Server');

    // Ejemplo de una ruta que realiza una consulta a la base de datos
    app.get('/api/datos', async (req, res) => {
        try {
            const result = await sql.query('SELECT * FROM USUARIO'); // Reemplaza 'tuTabla' con el nombre de tu tabla
            //console.log(result)
            res.json(result.recordset);
        } catch (err) {
            console.error('Error en la consulta:', err);
            res.status(500).send('Error en la consulta');
        }
    });
});

//Inserta departamentos
app.post('/AltaDepartamentos',async(req,res) => {
    try{
        
        await sql.connect(config);
        const {nombre,departamentoPadre,correo,telefono,ubicacion} = req.body;
        await sql.query`EXEC InsertDepartamento
        @nombre = ${nombre},
        @departamentoPadreNombre = ${departamentoPadre},
        @correo = ${correo},
        @telefono = ${telefono},
        @ubicacion = ${ubicacion};`
         // Enviar una respuesta de éxito
        res.status(200).send('Departamento insertado exitosamente');
    }catch(error){
        console.error('Error al insertar el departamento:', error.message);
        // Enviar una respuesta de error
        res.status(500).send('Error al insertar el departamento');
    }finally{
        await sql.close();
    }
});

//Trae departamentos 
app.get('/SelectDepartamentos', async(req,res) => {
    try{
        await sql.connect(config);
        const result = await sql.query(`select * from departamento`);
        res.status(200).json(result.recordset);
    }catch(error){
        console.error('Error al traer los departamentos:', error.message);
        // Enviar una respuesta de error
        res.status(500).send('Error al traer los departamentos');
    }finally{
        await sql.close();
    }
});

app.get('/ObtenerIdDepartamentoPadre/:departamentoPadre', async (req, res) => {
    try {
        await sql.connect(config);
        const { departamentoPadre } = req.params;
        console.log("imprime en obtener id: ", { departamentoPadre });

        // Crear una nueva instancia de solicitud SQL
        const request = new sql.Request();

        // Definir el parámetro de entrada y ejecutar la consulta parametrizada
        const result = await request
            .input('departamentoPadre', sql.NVarChar, departamentoPadre) // Definir el parámetro limpio
            .query('SELECT id_departamento FROM departamento WHERE nombre = @departamentoPadre');

        console.log("Resultado de la consulta: ", result.recordset[0]);
        res.status(200).json(result.recordset[0]);
    } catch (error) {
        console.error('Error al obtener el ID del departamento padre:', error.message);
        res.status(500).send('Error al obtener el ID del departamento padre');
    } finally {
        await sql.close();
    }
});

app.put('/ActualizarDepartamento', async (req, res) => {
    try {
        await sql.connect(config);

        // Extraer parámetros del body
        const { id_departamento, nombre, correo, telefono, ubicacion_dep, id_departamentoPadre } = req.body;

        // Crear una nueva instancia de solicitud SQL para ejecutar el procedimiento almacenado
        const request = new sql.Request();

        // Ejecutar el procedimiento almacenado con los parámetros proporcionados
        await request
            .input('id_departamento', sql.Int, id_departamento)
            .input('nombre', sql.NVarChar, nombre)
            .input('correo', sql.NVarChar, correo)
            .input('telefono', sql.NVarChar, telefono)
            .input('ubicacion_dep', sql.NVarChar, ubicacion_dep)
            .input('id_departamentoPadre', sql.Int, id_departamentoPadre)
            .execute('ActualizarDepartamento'); // Ejecutar el procedimiento almacenado

        res.status(200).send('Departamento actualizado exitosamente');
    } catch (error) {
        console.error('Error al actualizar el departamento:', error.message);
        res.status(500).send('Error al actualizar el departamento');
    } finally {
        await sql.close();
    }
});

app.delete('/EliminarDepartamento/:id', async (req, res) => {
    try {
        await sql.connect(config);
        const { id } = req.params;
        console.log("Eliminando departamento con ID:", id);

        // Crear una nueva instancia de solicitud SQL
        const request = new sql.Request();

        // Ejecutar la consulta para eliminar el departamento
        const result = await request
            .input('id', sql.Int, id)
            .query('DELETE FROM departamento WHERE id_departamento = @id');

        if (result.rowsAffected[0] === 0) {
            res.status(404).send('Departamento no encontrado');
        } else {
            res.status(200).send('Departamento eliminado exitosamente');
        }
    } catch (error) {
        console.error('Error al eliminar el departamento:', error.message);
        res.status(500).send('Error al eliminar el departamento');
    } finally {
        await sql.close();
    }
});


app.get('/TraeNombreDep/:id_departamentoPadre', async (req, res) => {
    console.log('Conectado a SQL Server');
    try {
        await sql.connect(config);
        const { id_departamentoPadre } = req.params; // Obtener el parámetro de la URL
        console.log(id_departamentoPadre); // Corregido el nombre de la variable
        const result = await sql.query`SELECT nombre FROM departamento WHERE id_departamento = ${id_departamentoPadre}`;
        
        console.log(result.recordset);
        res.status(200).json(result.recordset[0]); 
    } catch (error) {
        console.error('Error al traer nombre del departamento', error.message);
        res.status(500).send('Error al traer nombre del departamento');
    } finally {
        await sql.close();
    }
});


// Permisos del usuario
app.post('/Permisos', async(req,res) => {
    try {
        await sql.connect(config);

        const {usuario} = req.body;

        const permisosCheckResult = await sql.query`
        SELECT dbo.VerificarPermisos(${usuario}) AS Permisos;`

        const permisos = permisosCheckResult.recordset[0].Permisos;
        console.log(permisos);
        res.status(200).json({permisos});
    } catch (error) {
        console.log('error al verificar el inicio de sesion: ',error);
        res.status(500).json({error: 'error al verificar inicio de sesion'});
    }finally{
        await sql.close();
    }
});

app.listen(port, () => {
    console.log(`La API está escuchando en http://localhost:${port}`);
});

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

//---------------------------------------------------
app.get('/SelectUsuario', async (req, res) => {
    try {
        await sql.connect(config);
        const request = new sql.Request();
        const result = await request.query('SELECT id_usuario, nombre + \' \' + apellido AS Nombre, nombre, apellido,id_departamento_pertenece, id_jefe, correo, telefono, permisos FROM USUARIO where status = 1');        
        const Usuario = result.recordset; 
        res.status(200).json(Usuario); // Devuelve los datos correctamente
    } catch (error) {
        console.error('Error al traer los usuarios', error.message);
        res.status(500).send('Error al traer los usuarios');
    } finally {
        await sql.close();
    }
});

//Inserta Usuarios
app.post('/AltaUsuarios',async(req,res) => {
    try{
        
        await sql.connect(config);
        const {nombre,apellido,departamento,jefe,correo,telefono,permisos,contrasenia} = req.body;
        await sql.query`INSERT INTO usuario(nombre, apellido, id_departamento_pertenece, id_jefe, correo, telefono, contrasena, permisos, status)
            VALUES(${nombre}, ${apellido}, ${departamento}, ${jefe}, ${correo}, ${telefono}, ${contrasenia}, ${permisos}, ${1})`;
         // Enviar una respuesta de éxito
        res.status(200).send('Departamento insertado exitosamente');
    }catch(error){
        console.error('Error al insertar el departamento:', error.message);
        // Enviar una respuesta de error
        res.status(500).send('Error al insertar el departamento');
    }finally{
        await sql.close();
    }
});

// Actualiza usuarios
app.put('/ActualizaUsuarios', async (req, res) => {
    console.log('Llego ajua')
    const { id_usuario, nombre, apellido, departamento_pertenece, jefe, correo, telefono, permisos } = req.body;
    //const id_usuario = req.query.id_usuario;
    console.log('Datos recibidos:', {
        id_usuario,
        nombre,
        apellido,
        departamento_pertenece,
        jefe,
        correo,
        telefono,
        permisos
    });
    try {
        await sql.connect(config);
        const request = new sql.Request();
        request.input('id_usuario', sql.Int, id_usuario);
        request.input('nombre', sql.VarChar, nombre);
        request.input('apellido', sql.VarChar, apellido);
        request.input('departamento_pertenece', sql.Int, departamento_pertenece);
        request.input('jefe', sql.Int, jefe);
        request.input('correo', sql.VarChar, correo);
        request.input('telefono', sql.VarChar, telefono);
        request.input('permisos', sql.Int, permisos);
        const result = await request.query(`
            UPDATE Usuario
            SET nombre = @nombre,
                apellido = @apellido,
                id_departamento_pertenece = @departamento_pertenece,
                id_jefe = @jefe,
                correo = @correo,
                telefono = @telefono,
                permisos = @permisos
            WHERE id_usuario = @id_usuario
        `);
        if (result.rowsAffected[0] > 0) {
            res.json({ success: true, message: 'Usuario actualizado correctamente' });
        } else {
            res.json({ success: false, message: 'No se encontró el usuario para actualizar' });
        }
    } catch (error) {
        console.error('Error al actualizar el usuario:', error.message);
        res.status(500).json({ success: false, message: 'Error al usuario el espacio' });
    } finally {
        await sql.close();
    }
});

//Baja usuarios
app.put('/BajaUsuarios', async (req,res) => {
    const {id_usuario} = req.body;
    const per = 0;
    try{
        await sql.connect(config);
        const request = new sql.Request();
        request.input('id_usuario', sql.Int, id_usuario);
        request.input('status', sql.Bit, per);
        const result = await request.query(`
            UPDATE Usuario
            SET status = @status
            WHERE id_usuario = @id_usuario
        `);
        if (result.rowsAffected[0] > 0) {
            res.json({ success: true, message: 'Usuario dado de baja correctamente' });
        } else {
            res.json({ success: false, message: 'No se encontró el usuario para actualizar' });
        }
    } catch (error) {
        console.error('Error al dar de baja el usuario:', error.message);
        res.status(500).json({ success: false, message: 'Error al usuario el espacio' });
    } finally {
        await sql.close();
    }
});

// Trae los equipos segun el espacio
app.get('/SelectEquiposPorEspacio', async (req, res) => {
    try{
        await sql.connect(config);
        const id_espacio = req.query.id_espacio;
        const id_edificio = req.query.id_edificio;
        const id_tipoEspacio = req.query.id_tipoEspacio;

        console.log('idEspacio en equipo:', id_espacio);
        const checkEquiposEspacios = await sql.query(`
            SELECT id_equipo, numero_serie 
            FROM EQUIPO 
            WHERE id_espacio = ${id_espacio}
            AND id_espacio IN (
                SELECT id_espacio 
                FROM ESPACIOS 
                WHERE id_tipoEspacio = ${id_tipoEspacio} 
                AND id_edificio = ${id_edificio}
            );
        `);
        console.log('numero_serie:', checkEquiposEspacios.recordset[0].numero_serie);
        res.status(200).json({equipos: checkEquiposEspacios.recordset})
    } catch (error) {
        console.error('Error al obtener los equipos:', error.message);
        res.status(500).send({ error: 'Error al obtener los equipos' });
    }finally{
        await sql.close();
    }
});

// Trae los Espacios segun el edificio para ADMON
app.get('/SelectEspaciosPorEdificioADMON', async(req,res) => {
    try{
        await sql.connect(config);
        const id_edificio = req.query.id_edificio;
        console.log('idEdificio: ', id_edificio);
        const checkEspacioEdificio = await sql.query(`
            SELECT DISTINCT TE.id_tipoEspacio, TE.nombre
            FROM TIPO_ESPACIO TE
            JOIN ESPACIOS ES ON TE.id_tipoEspacio = ES.id_tipoEspacio
            WHERE ES.id_edificio = ${id_edificio}
        `);
        res.status(200).json({tiposEspacios: checkEspacioEdificio.recordset});
    }catch(error){
        console.error('Error al traer los espacios por edificio ADMON: ', error.message);
        res.status(500).send('Error al traer los espacios ADMIN');
    }finally{
        await sql.close();
    }
});

// Trae los nombres de los espacios ADMON
app.get('/SelectNombrePorEspaciosADMON', async(req,res) => {
    try{
        await sql.connect(config);
        const id_tipoEspacio = req.query.id_tipoEspacio;
        const id_edificio = req.query.id_edificio;
        console.log('idTipoEspacio ', id_tipoEspacio);
        const checkNombreEspacio = await sql.query(`
            SELECT ES.id_espacio, ES.nombre
            FROM ESPACIOS ES
            WHERE ES.id_tipoEspacio = ${id_tipoEspacio} AND ES.id_edificio = ${id_edificio};
        `);
        res.status(200).json({nombresEspacio: checkNombreEspacio.recordset});
    }catch(error){
        console.error('Error al traer los nombres de los espacios ADMON: ', error.message);
        res.status(500).send('Error al traer los nombres de los espacios ADMON');
    }finally{
        await sql.close();
    }
});

// Da de alta a Edificio
app.post('/AltaEdificio', async(req, res) => {
    try{
        await sql.connect(config);
        const{nombre, ubicacion_edificio} = req.body;
        await sql.query`INSERT INTO EDIFICIO(nombre, ubicacion_edificio)
            VALUES(${nombre}, ${ubicacion_edificio});
            `;
        res.status(200).send('Edificio insertado exitosamente');
    }catch(error){
        console.error('Error al insertar edificio:, ', error.message);
        res.status(500).send('Error al insertar edificio');
    }finally{
        await sql.close();
    }
});

// Actualizar datos de edificio
app.put('/ActualizarEdificio', async (req, res) => {
    try {
        await sql.connect(config);

        // Extraer parámetros del body
        const { id_edificio, nombre, ubicacion_edificio} = req.body;

        // Crear una nueva instancia de solicitud SQL para ejecutar el procedimiento almacenado
        const request = new sql.Request();

        // Ejecutar el procedimiento almacenado con los parámetros proporcionados
        await request
            .input('id_edificio', sql.Int, id_edificio)
            .input('nombre', sql.NVarChar, nombre)
            .input('ubicacion_edificio', sql.NVarChar, ubicacion_edificio)
            .execute('ActualizarEdificio'); // Ejecutar el procedimiento almacenado
        res.status(200).send('Edificio actualizado exitosamente');
    } catch (error) {
        console.error('Error al actualizar el edificio:', error.message);
        res.status(500).send('Error al actualizar el edificio');
    } finally {
        await sql.close();
    }
});

// Elimina un edificio
app.delete('/EliminaEdificio', async (req, res) => {
    try {
        await sql.connect(config);
        const id_edificio = req.query.id_edificio;

        // Usar consulta parametrizada para evitar inyección SQL
        const result = await sql.query(`
            delete from EDIFICIO
            where id_edificio = @id_edificio;
        `, {
            id_edificio: sql.Int, value: id_edificio
        });

        if (result.rowsAffected[0] > 0) {
            res.json({ success: true, message: 'Edificio eliminado correctamente' });
        } else {
            res.json({ success: false, message: 'No se encontró el edificio para eliminar' });
        }
    } catch (error) {
        console.error('Error al eliminar el edificio:', error.message);
        res.status(500).json({ success: false, message: 'Error al eliminar el edificio' });
    } finally {
        await sql.close();
    }
});

//-------------------------------------------------------------------------
//Desmadre de equipos
//Trae los modelos de equipos
app.get('/SelectModelos', async (req, res) => {
    try {
        await sql.connect(config);
        const request = new sql.Request();
        const result = await request.query('SELECT * from Modelo');        
        res.status(200).json(result.recordset); // Devuelve los datos correctamente
    } catch (error) {
        console.error('Error al traer los usuarios', error.message);
        res.status(500).send('Error al traer los usuarios');
    } finally {
        await sql.close();
    }
});

//Trae los tipos de computadoras
app.get('/selectTipoComputadora', async (req, res) => {
    try {
        await sql.connect(config);
        const request = new sql.Request();
        const result = await request.query('SELECT * from Tipo_Computadora');       
        res.status(200).json(result.recordset); // Devuelve los datos correctamente
    } catch (error) {
        console.error('Error al traer los usuarios', error.message);
        res.status(500).send('Error al traer los usuarios');
    } finally {
        await sql.close();
    }
});

//Trae los procesadores
app.get('/selectProcesador', async (req, res) => {
    try {
        await sql.connect(config);
        const request = new sql.Request();
        const result = await request.query('SELECT * from Procesador');       
        res.status(200).json(result.recordset); // Devuelve los datos correctamente
    } catch (error) {
        console.error('Error al traer los usuarios', error.message);
        res.status(500).send('Error al traer los usuarios');
    } finally {
        await sql.close();
    }
});

//Trae las tarjetas graficas
app.get('/SelectGrafica', async (req, res) => {
    try {
        await sql.connect(config);
        const request = new sql.Request();
        const result = await request.query('SELECT * from Tarjeta_Grafica');       
        res.status(200).json(result.recordset); // Devuelve los datos correctamente
    } catch (error) {
        console.error('Error al obtener las tarjetas graficas', error.message);
        res.status(500).send('Error al obtener las tarjetas graficas');
    } finally {
        await sql.close();
    }
});

//Trae los sistemas operativos
app.get('/SelectSistemasOperativos', async (req, res) => {
    try {
        await sql.connect(config);
        const request = new sql.Request();
        const result = await request.query('SELECT * from sistema_operativo');    
        res.status(200).json(result.recordset); // Devuelve los datos correctamente
    } catch (error) {
        console.error('Error al obtener los sietamas operativos', error.message);
        res.status(500).send('Error al obtener los sietamas operativos');
    } finally {
        await sql.close();
    }
});

//Trae las configuraciones de red
app.get('/ConfiguracionRed', async (req, res) => {
    try {
        await sql.connect(config);
        const request = new sql.Request();
        const result = await request.query('SELECT * from tarjeta_red');    
        res.status(200).json(result.recordset); // Devuelve los datos correctamente
    } catch (error) {
        console.error('Error al obtener las configuraciones de red', error.message);
        res.status(500).send('Error al obtener las configuraciones de red');
    } finally {
        await sql.close();
    }
});

//Trae los softwares
app.get('/SelectSoftwares', async (req, res) => {
    try {
        await sql.connect(config);
        const request = new sql.Request();
        const result = await request.query('SELECT * from software');    
        res.status(200).json(result.recordset); // Devuelve los datos correctamente
    } catch (error) {
        console.error('Error al obtener las los softwares', error.message);
        res.status(500).send('Error al obtener los softwares');
    } finally {
        await sql.close();
    }
});

//Inserta Computadora
app.post('/AltaComputadora',async(req,res) => {
    try{
        
        await sql.connect(config);
        const {numeroSerie, costo, modelo, garantia, estado, tipo, procesador, RAM, memoria, tarjetaGrafica, sistemaOperativo, tarjetaRed, softwares} = req.body;
    
        // Puedes hacer lo que necesites con los datos extraídos, como guardarlos en una base de datos
        console.log('Datos recibidos:', {
            numeroSerie, costo, modelo, garantia, estado, tipo, procesador, RAM, memoria, tarjetaGrafica, sistemaOperativo, tarjetaRed, softwares
        });
        // Inserción en la tabla 'equipo'
    await sql.query`INSERT INTO equipo(numero_serie, costo, modelo, garantia, estado, tipo, procesador, RAM, memoria, tarjeta_grafica, sistema_operativo, tarjeta_red) VALUES (
    ${numeroSerie}, ${costo}, ${modelo}, ${garantia}, ${estado}, ${tipo}, ${procesador}, ${RAM}, ${memoria}, ${tarjetaGrafica}, ${sistemaOperativo}, ${tarjetaRed})`;// Enviar una respuesta de éxito
        res.status(200).send('Departamento insertado exitosamente');

        // Obtener el id de la última computadora insertada
    const computadoraId = result.recordset[0].id;

    // Insertar en la tabla SOFTWARE_COMPUTADORA
    if (softwares && softwares.length > 0) {
        for (const softwareId of softwares) {
            await sql.query`INSERT INTO SOFTWARE_COMPUTADORA (
                id_software,
                id_computadora
            ) VALUES (
                ${softwareId},
                ${computadoraId}
            );`;
        }
    }
    res.status(200).send('Equipo insertado exitosamente');
    }catch(error){
        console.error('Error al insertar el departamento:', error.message);
        // Enviar una respuesta de error
        res.status(500).send('Error al insertar el departamento');
    }finally{
        await sql.close();
    }
});