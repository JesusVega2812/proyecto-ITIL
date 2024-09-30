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
            SELECT id_equipo, clave 
            FROM EQUIPO 
            WHERE id_espacio = ${id_espacio}
            AND id_espacio IN (
                SELECT id_espacio 
                FROM ESPACIOS 
                WHERE id_tipoEspacio = ${id_tipoEspacio} 
                AND id_edificio = ${id_edificio}
            );
        `);
        console.log('clave:', checkEquiposEspacios.recordset[0].clave);
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
    }
});

//Trae los tipos de impresoras
app.get('/SelectTipoImpresora', async (req, res) => {
    try {
        await sql.connect(config);
        const request = new sql.Request();
        const result = await request.query('SELECT * from tipo_impresora');    
        res.status(200).json(result.recordset);
    } catch (error) {
        console.error('Error al obtener los tipos de impresora', error.message);
        res.status(500).send('Error al obtener los tipos de impresora');
    }
});

//Trae los tipos de escaner
app.get('/SelectTipoEscaner', async (req, res) => {
    try {
        await sql.connect(config);
        const request = new sql.Request();
        const result = await request.query('SELECT * from tipo_escaner');    
        res.status(200).json(result.recordset);
    } catch (error) {
        console.error('Error al obtener los tipos de escaner', error.message);
        res.status(500).send('Error al obtener los tipos de escaner');
    }
});

//Inserta Computadora
app.post('/AltaComputadora',async(req,res) => {
    try{
        await sql.connect(config);
        const {numeroSerie, fechaCompra, costo, id_usuario, modelo, garantia, estado, tipo, procesador, RAM, memoria, tarjetaGrafica, sistemaOperativo, tarjetaRed, softwares} = req.body;
        console.log('Datos recibidos:', {
            numeroSerie, fechaCompra, costo, id_usuario, modelo, garantia, estado, tipo, procesador, RAM, memoria, tarjetaGrafica, sistemaOperativo, tarjetaRed, softwares
        });
        console.log('llegue a altacomputadora');
       // Inserción en la tabla EQUIPO
        const resultEquipo = await sql.query`
            DECLARE @InsertedIds TABLE (id_equipo INT);
            INSERT INTO EQUIPO (numero_serie, fecha_compra, valor_compra, id_usuario, id_modelo, id_garantia, estado_equipo)
            OUTPUT INSERTED.id_equipo INTO @InsertedIds
            VALUES (${numeroSerie}, ${fechaCompra}, ${costo}, ${id_usuario}, ${modelo}, ${garantia}, ${estado});
            
            SELECT id_equipo FROM @InsertedIds;
        `;

        // Obtener el ID del equipo insertado
        const idEquipoInsertado = resultEquipo.recordset[0].id_equipo;
        // Inserción en la tabla COMPUTADORA
        await sql.query`INSERT INTO COMPUTADORA (id_computadora, id_tipoComputadora, procesador, memoria_RAM, almacenamiento, tarjeta_grafica, sistema_operativo, configuracion_red)
        VALUES (${idEquipoInsertado}, ${tipo}, ${procesador}, ${RAM}, ${memoria}, ${tarjetaGrafica}, ${sistemaOperativo}, ${tarjetaRed});`;

        // Insertar en la tabla SOFTWARE_COMPUTADORA
        if (softwares && softwares.length > 0) {
            for (const softwareId of softwares) {
                await sql.query`INSERT INTO SOFTWARE_COMPUTADORA (
                    id_software,
                    id_computadora
                ) VALUES (
                    ${softwareId},
                    ${idEquipoInsertado}
                );`;
            }
        }
        console.log(idEquipoInsertado)
        res.status(200).json({id: idEquipoInsertado});
    }catch(error){
        console.error('Error al insertar el equipo-computadora:', error.message);
        // Enviar una respuesta de error
        res.status(500).send('Error al insertar el equipo-computadora');
    }finally{
        await sql.close();
    }
});

//Inserta Servidor
app.post('/AltaServidor',async(req,res) => {
    try{
        await sql.connect(config);
        const {numeroSerie, fechaCompra, costo, id_usuario, modelo, garantia, estado, procesador, RAM, memoria, tarjetaGrafica, sistemaOperativo, tarjetaRed} = req.body;
        console.log('Datos recibidos:', {
            numeroSerie, fechaCompra, costo, id_usuario, modelo, garantia, estado, procesador, RAM, memoria, tarjetaGrafica, sistemaOperativo, tarjetaRed
        });
        console.log('llegue a altaservidor');
       // Inserción en la tabla EQUIPO
        const resultEquipo = await sql.query`
            DECLARE @InsertedIds TABLE (id_equipo INT);
            INSERT INTO EQUIPO (numero_serie, fecha_compra, valor_compra, id_usuario, id_modelo, id_garantia, estado_equipo)
            OUTPUT INSERTED.id_equipo INTO @InsertedIds
            VALUES (${numeroSerie}, ${fechaCompra}, ${costo}, ${id_usuario}, ${modelo}, ${garantia}, ${estado});
            
            SELECT id_equipo FROM @InsertedIds;
        `;

        // Obtener el ID del equipo insertado
        const idEquipoInsertado = resultEquipo.recordset[0].id_equipo;
        // Inserción en la tabla SERVIDOR
        await sql.query`INSERT INTO SERVIDOR (id_servidor, procesador, memoria_RAM, almacenamiento, tarjeta_grafica, sistema_operativo, configuracion_red)
        VALUES (${idEquipoInsertado}, ${procesador}, ${RAM}, ${memoria}, ${tarjetaGrafica}, ${sistemaOperativo}, ${tarjetaRed});`;

        res.status(200).send({ id: idEquipoInsertado });
    }catch(error){
        console.error('Error al insertar el equipo-servidor:', error.message);
        // Enviar una respuesta de error
        res.status(500).send('Error al insertar el equipo-servidor');
    }finally{
        await sql.close();
    }
});

//Inserta Impresora
app.post('/AltaImpresora',async(req,res) => {
    try{
        await sql.connect(config);
        const {numeroSerie, fechaCompra, costo, id_usuario, modelo, garantia, estado, tipoImpresora, resolucion, velocidad, conectividad} = req.body;
        console.log('Datos recibidos:', {
            numeroSerie, fechaCompra, costo, id_usuario, modelo, garantia, estado, tipoImpresora, resolucion, velocidad, conectividad
        });
        console.log('llegue a altaimpresora');
       // Inserción en la tabla EQUIPO
        const resultEquipo = await sql.query`
            DECLARE @InsertedIds TABLE (id_equipo INT);
            INSERT INTO EQUIPO (numero_serie, fecha_compra, valor_compra, id_usuario, id_modelo, id_garantia, estado_equipo)
            OUTPUT INSERTED.id_equipo INTO @InsertedIds
            VALUES (${numeroSerie}, ${fechaCompra}, ${costo}, ${id_usuario}, ${modelo}, ${garantia}, ${estado});
            
            SELECT id_equipo FROM @InsertedIds;
        `;

        // Obtener el ID del equipo insertado
        const idEquipoInsertado = resultEquipo.recordset[0].id_equipo;
        // Inserción en la tabla impresora
        await sql.query`INSERT INTO IMPRESORA (id_impresora, id_tipoImpresora, resolucion, velocidad_impresion, conectividad)
        VALUES (${idEquipoInsertado}, ${tipoImpresora}, ${resolucion}, ${velocidad}, ${conectividad});`;

        res.status(200).send({ id: idEquipoInsertado });
    }catch(error){
        console.error('Error al insertar el equipo-impresora:', error.message);
        // Enviar una respuesta de error
        res.status(500).send('Error al insertar el equipo-impresora');
    }finally{
        await sql.close();
    }
});

//Inserta Switch
app.post('/AltaSwitch',async(req,res) => {
    try{
        await sql.connect(config);
        const {numeroSerie, fechaCompra, costo, id_usuario, modelo, garantia, estado, numPuertos, velocidad_backplane, tipoSwitch, capacidad, consEnergia} = req.body;
        console.log('Datos recibidos:', {
            numeroSerie, fechaCompra, costo, id_usuario, modelo, garantia, estado, numPuertos, velocidad_backplane, tipoSwitch, capacidad, consEnergia
        });
        console.log('llegue a altaswitch');
       // Inserción en la tabla EQUIPO
        const resultEquipo = await sql.query`
            DECLARE @InsertedIds TABLE (id_equipo INT);
            INSERT INTO EQUIPO (numero_serie, fecha_compra, valor_compra, id_usuario, id_modelo, id_garantia, estado_equipo)
            OUTPUT INSERTED.id_equipo INTO @InsertedIds
            VALUES (${numeroSerie}, ${fechaCompra}, ${costo}, ${id_usuario}, ${modelo}, ${garantia}, ${estado});
            
            SELECT id_equipo FROM @InsertedIds;
        `;

        // Obtener el ID del equipo insertado
        const idEquipoInsertado = resultEquipo.recordset[0].id_equipo;
        // Inserción en la tabla switch
        await sql.query`INSERT INTO SWITCH (id_switch, numero_puertos, velocidad_backplane, tipo_switch, capacidad_switching, consumo_energia)
        VALUES (${idEquipoInsertado}, ${numPuertos}, ${velocidad_backplane}, ${tipoSwitch}, ${capacidad}, ${consEnergia});`;

        res.status(200).send({ id: idEquipoInsertado });
    }catch(error){
        console.error('Error al insertar el equipo-switch:', error.message);
        // Enviar una respuesta de error
        res.status(500).send('Error al insertar el equipo-switch');
    }finally{
        await sql.close();
    }
});

//Inserta Router
app.post('/AltaRouter',async(req,res) => {
    try{
        await sql.connect(config);
        const {numeroSerie, fechaCompra, costo, id_usuario, modelo, garantia, estado, tipo_conexion, soporte_vpn, numGigFas, numSeriales, frecuencia, protocolos, capacidad, consEnergia} = req.body;
        console.log('Datos recibidos:', {
            numeroSerie, fechaCompra, costo, id_usuario, modelo, garantia, estado, tipo_conexion, soporte_vpn, numGigFas, numSeriales, frecuencia, protocolos, capacidad, consEnergia
        });
        console.log('llegue a altarouter');
       // Inserción en la tabla EQUIPO
        const resultEquipo = await sql.query`
            DECLARE @InsertedIds TABLE (id_equipo INT);
            INSERT INTO EQUIPO (numero_serie, fecha_compra, valor_compra, id_usuario, id_modelo, id_garantia, estado_equipo)
            OUTPUT INSERTED.id_equipo INTO @InsertedIds
            VALUES (${numeroSerie}, ${fechaCompra}, ${costo}, ${id_usuario}, ${modelo}, ${garantia}, ${estado});
            
            SELECT id_equipo FROM @InsertedIds;
        `;
        // Obtener el ID del equipo insertado
        const idEquipoInsertado = resultEquipo.recordset[0].id_equipo;
        // Inserción en la tabla switch
        await sql.query`INSERT INTO ROUTER (id_router, tipo_conexion, soporte_vpn, numero_interfaces_giga_fast, numero_seriales, frecuencia_ruta, protocolos_ruta, capacidad_ruta, consumo_energia)
        VALUES (${idEquipoInsertado}, ${tipo_conexion}, ${soporte_vpn}, ${numGigFas}, ${numSeriales}, ${frecuencia}, ${protocolos}, ${capacidad}, ${consEnergia});`;

        res.status(200).send({ id: idEquipoInsertado });
    }catch(error){
        console.error('Error al insertar el equipo-router:', error.message);
        // Enviar una respuesta de error
        res.status(500).send('Error al insertar el equipo-router');
    }finally{
        await sql.close();
    }
});

//Inserta Escaner
app.post('/AltaEscaner',async(req,res) => {
    try{
        await sql.connect(config);
        const {numeroSerie, fechaCompra, costo, id_usuario, modelo, garantia, estado, velocidad, tipoEscaner} = req.body;
        console.log('Datos recibidos:', {
            numeroSerie, fechaCompra, costo, id_usuario, modelo, garantia, estado, velocidad, tipoEscaner
        });
        console.log('llegue a altaescaner');
       // Inserción en la tabla EQUIPO
        const resultEquipo = await sql.query`
            DECLARE @InsertedIds TABLE (id_equipo INT);
            INSERT INTO EQUIPO (numero_serie, fecha_compra, valor_compra, id_usuario, id_modelo, id_garantia, estado_equipo)
            OUTPUT INSERTED.id_equipo INTO @InsertedIds
            VALUES (${numeroSerie}, ${fechaCompra}, ${costo}, ${id_usuario}, ${modelo}, ${garantia}, ${estado});
            
            SELECT id_equipo FROM @InsertedIds;
        `;
        // Obtener el ID del equipo insertado
        const idEquipoInsertado = resultEquipo.recordset[0].id_equipo;
        // Inserción en la tabla escaner
        await sql.query`INSERT INTO ESCANER (id_escaner, velocidad, id_tipoEscaner)
        VALUES (${idEquipoInsertado}, ${velocidad}, ${tipoEscaner});`;

        res.status(200).send(idEquipoInsertado);
    }catch(error){
        console.error('Error al insertar el equipo-escaner:', error.message);
        // Enviar una respuesta de error
        res.status(500).send('Error al insertar el equipo-escaner');
    }finally{
        await sql.close();
    }
});

app.get('/NombreEquipo', async (req, res) => {
    try {
        await sql.connect(config);
        const id_equipo = req.query.id_equipo;  // Cambiado a req.query
        const result = await sql.query(`SELECT Nombre FROM Equipo WHERE id_equipo = ${id_equipo}`);
        res.status(200).json(result.recordset[0]);
    } catch (error) {
        console.error('Error al traer el nombre del equipo: ', error.message);
        res.status(500).send('Error al traer el nombre del equipo');
    } finally {
        await sql.close();
    }
});

//------------28 de Septiembre-------------

//Trae las computadoras
app.get('/SelectComputadora', async (req, res) => {
    try {
        await sql.connect(config);
        const request = new sql.Request();
        const result = await request.query(`
            SELECT e.id_equipo, e.nombre
            FROM EQUIPO e
            JOIN COMPUTADORA c ON e.id_equipo = c.id_computadora
            WHERE e.id_espacio IS NULL 
            AND e.estado_equipo = 'disponible'
        `);    
        res.status(200).json(result.recordset);
    } catch (error) {
        console.error('Error al obtener las computadoras', error.message);
        res.status(500).send('Error al obtener los computadoras');
    }
});

//Trae las impresoras
app.get('/selectImpresora', async (req, res) => {
    try {
        await sql.connect(config);
        const request = new sql.Request();
        const result = await request.query(`
            SELECT e.id_equipo, e.nombre
            FROM EQUIPO e
            JOIN IMPRESORA i ON e.id_equipo = i.id_impresora
            WHERE e.id_espacio IS NULL 
            AND e.estado_equipo = 'disponible'
        `);    
        res.status(200).json(result.recordset);
    } catch (error) {
        console.error('Error al obtener las impresoras', error.message);
        res.status(500).send('Error al obtener los impresoras');
    }
});

//Trae los servidores
app.get('/selectServidor', async (req, res) => {
    try {
        await sql.connect(config);
        const request = new sql.Request();
        const result = await request.query(`
            SELECT e.id_equipo, e.nombre
            FROM EQUIPO e
            JOIN SERVIDOR s ON e.id_equipo = s.id_servidor
            WHERE e.id_espacio IS NULL 
            AND e.estado_equipo = 'disponible'
        `);    
        res.status(200).json(result.recordset);
    } catch (error) {
        console.error('Error al obtener los servidores', error.message);
        res.status(500).send('Error al obtener los servidores');
    }
});

//Trae los switch
app.get('/selectSwitch', async (req, res) => {
    try {
        await sql.connect(config);
        const request = new sql.Request();
        const result = await request.query(`
            SELECT e.id_equipo, e.nombre
            FROM EQUIPO e
            JOIN SWITCH s ON e.id_equipo = s.id_switch
            WHERE e.id_espacio IS NULL 
            AND e.estado_equipo = 'disponible'
        `);    
        res.status(200).json(result.recordset);
    } catch (error) {
        console.error('Error al obtener los switch', error.message);
        res.status(500).send('Error al obtener los switch');
    }
});

//Trae los routers
app.get('/selectRouter', async (req, res) => {
    try {
        await sql.connect(config);
        const request = new sql.Request();
        const result = await request.query(`
            SELECT e.id_equipo, e.nombre
            FROM EQUIPO e
            JOIN ROUTER r ON e.id_equipo = r.id_router
            WHERE e.id_espacio IS NULL 
            AND e.estado_equipo = 'disponible'
        `);    
        res.status(200).json(result.recordset);
    } catch (error) {
        console.error('Error al obtener los routers', error.message);
        res.status(500).send('Error al obtener los routes');
    }
});

//Trae los escaner
app.get('/selectEscaner', async (req, res) => {
    try {
        await sql.connect(config);
        const request = new sql.Request();
        const result = await request.query(`
            SELECT e.id_equipo, e.nombre
            FROM EQUIPO e
            JOIN ESCANER es ON e.id_equipo = es.id_escaner
            WHERE e.id_espacio IS NULL 
            AND e.estado_equipo = 'disponible'
        `);    
        res.status(200).json(result.recordset);
    } catch (error) {
        console.error('Error al obtener los escaners', error.message);
        res.status(500).send('Error al obtener los escaners');
    }
});

// Alta equipo en espacio
app.put('/AltaEquipoEnEspacio', async (req, res) => {
    const { id_equipo, id_espacio, fecha_instalacion, id_usuario, clave } = req.body;

    console.log('Datos recibidos:', {
        id_equipo, id_espacio, fecha_instalacion, id_usuario, clave
    });
    try {
        await sql.connect(config);
        const request = new sql.Request();
        request.input('id_espacio', sql.Int, id_espacio);
        request.input('fecha_instalacion', sql.DateTime, fecha_instalacion);
        request.input('id_usuario', sql.Int, id_usuario);
        request.input('clave', sql.VarChar, clave);
        request.input('id_equipo', sql.Int, id_equipo);
        const result = await request.query(`
            UPDATE EQUIPO
            SET id_espacio = @id_espacio,
                fecha_instalacion = @fecha_instalacion,
                id_usuario = @id_usuario,
                estado_equipo = 'En uso',
                CLAVE = @clave
            WHERE id_equipo = @id_equipo
        `)

        if (result.rowsAffected[0] > 0) {
            res.json({ success: true, message: 'Equipo dado de alta en espacio' });
        } else {
            res.json({ success: false, message: 'No se encontró el equipo para actualizar' });
        }
    } catch (error) {
        console.error('Error al dar de alta el equipo en el espacio:', error.message);
        res.status(500).json({ success: false, message: 'Error al dar de alta el equipo en el usuario' });
    } finally {
        await sql.close();
    }
});