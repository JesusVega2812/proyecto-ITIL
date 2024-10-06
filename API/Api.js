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
        const checkEdificio = await sql.query(`select id_edificio, nombre from Edificio where estatus = 1`);
        res.status(200).json({edificios: checkEdificio.recordset});
    }catch(error){
        console.error('Error al traer los edificios:', error.message);
        res.status(500).send('Error al traer los edificios');
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
            WHERE ES.id_departamento = ${id_departamento} and estatus = 1;
        `);
        res.status(200).json({edificios: checkEdificioDepartamento.recordset});
    }catch(error){
        console.error('Error al traer los edificios por departamento: ', error.message);
        res.status(500).send('Error al traer los edificios');
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
            SELECT ES.id_espacio, ES.nombre, responsable = u.nombre+' '+u.apellido
            FROM ESPACIOS ES
            LEFT JOIN usuario u on u.id_usuario = es.responsable
            WHERE ES.id_tipoEspacio = ${id_tipoEspacio} AND ES.id_edificio = ${id_edificio} AND ES.id_departamento = ${id_departamento};
        `);
        if(!checkNombreEspacio){
        
        }
        console.log(checkNombreEspacio.recordset)
        res.status(200).json({nombresEspacio: checkNombreEspacio.recordset});
    }catch(error){
        console.error('Error al traer los nombres de los espacios: ', error.message);
        res.status(500).send('Error al traer los nombres de los espacios');
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
    }
});

app.get('/SelectCapacidadNombre', async (req, res) => {
    try {
        await sql.connect(config);
        const id_espacio = req.query.id_espacio;
        console.log('idEspacio ', id_espacio);
        const request = new sql.Request();
        request.input('id_espacio', sql.Int, id_espacio);
        const result = await request.query('SELECT id_espacio, capacidad, ubicacion_esp, nombre, responsable FROM ESPACIOS WHERE id_espacio = @id_espacio');
        const capacidadUbicacion = result.recordset[0];
        console.log('capacidad: ', capacidadUbicacion);
        if (capacidadUbicacion) {
            res.status(200).json({
                capacidad: capacidadUbicacion.capacidad,
                ubicacion: capacidadUbicacion.ubicacion_esp,
                nombreEspacio: capacidadUbicacion.nombre,
                responsable: capacidadUbicacion.responsable
            });
        } else {
            res.status(404).json({ message: 'Espacio no encontrado' });
        }
    } catch (error) {
        console.error('Error al traer la capacidad y ubicacion: ', error.message);
        res.status(500).send('Error al traer la capacidad y la ubicacion');
    }
});

// Da de alta a espacios
app.post('/AltaEspacios', async(req, res) => {
    try{
        await sql.connect(config);
        const{tipoEspacio, edificio, idDepartamentoPertenece, ubicacion, capacidad, nombre, usuario} = req.body;
        await sql.query`INSERT INTO espacios(id_tipoEspacio, id_edificio, id_departamento, ubicacion_esp, capacidad, nombre, responsable)
            VALUES(${tipoEspacio}, ${edificio}, ${idDepartamentoPertenece}, ${ubicacion}, ${capacidad}, ${nombre}, ${usuario});
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
    const { tipoEspacio, edificio, idDepartamentoPertenece, ubicacion, capacidad, nombreEspacio, id_espacio, usuario } = req.body;
    console.log('Datos recibidos:', {
        tipoEspacio,
        edificio,
        idDepartamentoPertenece,
        ubicacion,
        capacidad,
        nombreEspacio,
        id_espacio,
        usuario
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
        request.input('responsable',sql.Int, usuario)
        const result = await request.query(`
            UPDATE Espacios
            SET id_tipoEspacio = @id_tipoEspacio,
                id_edificio = @id_edificio,
                id_departamento = @id_departamento,
                ubicacion_esp = @ubicacion_esp,
                capacidad = @capacidad,
                nombre = @nombre,
                responsable = @responsable
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
//Trae todos los usuarios
app.get('/SelectUsuario', async (req, res) => {
    try {
        await sql.connect(config);
        const request = new sql.Request();
        const result = await request.query(`SELECT id_usuario, nombre + \' \' + apellido AS Nombre, nombre, apellido,id_departamento_pertenece, id_jefe, correo, telefono, permisos FROM USUARIO where status = 1 `);        
        const Usuario = result.recordset; 
        res.status(200).json(Usuario); // Devuelve los datos correctamente
    } catch (error) {
        console.error('Error al traer los usuarios', error.message);
        res.status(500).send('Error al traer los usuarios');
    } finally {
        await sql.close();
    }
});

app.get('/SelectUsuarioDep/:idDepartamento', async (req, res) => {
    try {
        const { idDepartamento } = req.params; // Aquí se extrae el idDepartamento de los parámetros de la URL
        console.log(idDepartamento);
        await sql.connect(config);
        const request = new sql.Request();
        const result = await request.query(`SELECT id_usuario, nombre + ' ' + apellido AS Nombre, nombre, apellido, id_departamento_pertenece, id_jefe, correo, telefono, permisos FROM USUARIO WHERE status = 1 AND id_departamento_pertenece = ${idDepartamento}`);        
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
        const {nombre,apellido,departamento,jefe,correo,telefono,permisos,contrasenia,especialidad} = req.body;
        const result = await sql.query`INSERT INTO usuario(nombre, apellido, id_departamento_pertenece, id_jefe, correo, telefono, contrasena, permisos, status)
            OUTPUT INSERTED.id_usuario
            VALUES(${nombre}, ${apellido}, ${departamento}, ${jefe}, ${correo}, ${telefono}, ${contrasenia}, ${permisos}, ${1})`;
        
        const idUsuarioInsertado = result.recordset[0].id_usuario;
        
        if(permisos === 4){
            const disponible = 1;
            await sql.query`INSERT INTO TECNICO (id_usuario, id_especializacion, id_estadoDisponibilidad)
                VALUES (${idUsuarioInsertado}, ${especialidad}, ${disponible})`;
        };
            // Enviar una respuesta de éxito
        res.status(200).send('Usuario insertado exitosamente');
    }catch(error){
        console.error('Error al insertar el usuario:', error.message);
        // Enviar una respuesta de error
        res.status(500).send('Error al insertar el usuario');
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
            SELECT ES.id_espacio, ES.nombre, responsable = u.nombre+' '+u.apellido
            FROM ESPACIOS ES
            INNER JOIN USUARIO U ON U.ID_USUARIO = ES.RESPONSABLE
            WHERE ES.id_tipoEspacio = ${id_tipoEspacio} AND ES.id_edificio = ${id_edificio};
        `);
        res.status(200).json({nombresEspacio: checkNombreEspacio.recordset});
    }catch(error){
        console.error('Error al traer los nombres de los espacios ADMON: ', error.message);
        res.status(500).send('Error al traer los nombres de los espacios ADMON');
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
app.put('/EliminaEdificio', async (req, res) => {
    try {
        await sql.connect(config);

        // Extraer parámetros del body
        const { id_edificio } = req.body;

        if (!id_edificio) {
            return res.status(400).send('El id_edificio es requerido');
        }

        // Crear una nueva instancia de solicitud SQL
        const request = new sql.Request();

        // Ejecutar la actualización para eliminar lógicamente el edificio
        const result = await request
            .input('id_edificio', sql.Int, id_edificio)
            .execute('BajaEdificio');

        // Comprobar si se actualizó algún registro
        if (result.rowsAffected[0] > 0) {
            res.status(200).send('Edificio eliminado lógicamente exitosamente');
        } else {
            res.status(404).send('No se encontró el edificio para eliminar');
        }
    } catch (error) {
        console.error('Error al eliminar lógicamente el edificio:', error.message);
        res.status(500).send('Error al eliminar lógicamente el edificio');
    } finally {
        await sql.close();
    }
});


//Trae edificios
app.get('/SelectEdificiosPorEstatus', async (req, res) => {
    try {
        await sql.connect(config);
        const result = await sql.query(`select id_edificio, nombre from Edificio where estatus = 1`);
        console.log('Edificios obtenidos:', result.recordset);
        res.status(200).json(result.recordset);
    } catch (error) {
        console.error('Error al traer los edificios:', error.message);
        res.status(500).send('Error al traer los edificios');
    } finally {
        await sql.close();
    }
});

//Trae ubicacion de edificio
app.get('/TraeUbicacionEdificio/:id_edificio', async (req, res) => {
    console.log('Conectado a SQL Server');
    try {
        await sql.connect(config);
        const { id_edificio } = req.params;
        console.log('ID del edificio:', id_edificio);
        
        // Realizar la consulta SQL
        const result = await sql.query`SELECT ubicacion_edificio FROM edificio WHERE id_edificio = ${id_edificio} AND estatus = 1`;
        
        // Verificar si se encontró el edificio
        if (result.recordset.length === 0) {
            return res.status(404).json({ message: 'Edificio no encontrado' });
        }

        console.log('Resultado de la consulta:', result.recordset[0]);
        
        // Devolver la ubicación del edificio
        res.status(200).json(result.recordset[0]); 

    } catch (error) {
        console.error('Error al traer ubicacion del edificio:', error.message);
        res.status(500).send('Error al traer ubicacion del edificio');
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

//Trae las especialidades de un tecnico
app.get('/SelectEspecialidades', async (req, res) => {
    try {
        await sql.connect(config);
        const request = new sql.Request();
        const result = await request.query('select *  from especializacion');        
        res.status(200).json(result.recordset); // Devuelve los datos correctamente
    } catch (error) {
        console.error('Error al traer los usuarios', error.message);
        res.status(500).send('Error al traer los usuarios');
    }
});

//Detalle y caracteristicas de los equipos
app.get('/DetalleEquipo/:idEquipo', async(req, res) => {
    try {
        const { idEquipo } = req.params;
        await sql.connect(config);

        // Consultar primero en la tabla EQUIPO
        const equipoResult = await sql.query`SELECT * FROM EQUIPO WHERE id_equipo = ${idEquipo}`;
        const equipo = equipoResult.recordset[0];

        if (!equipo) {
            return res.status(404).send('Equipo no encontrado');
        }

        // Comprobar si el equipo es una computadora
        const computadoraResult = await sql.query`select 
            c.memoria_RAM, c.almacenamiento,
            tipoComputadora = tc.nombre,
            procesador = p.modelo+' '+p.fabricante, p.nucleos, p.hilos, p.cache,
            tarjeta_grafica = tg.modelo+' '+tg.fabricante, tg.arquitectura,
            sistemaOperativo = so.nombre+' '+so.version_, so.interfaz, so.licencia,
            tarjetaRed = tr.modelo+' '+tr.fabricante
            from COMPUTADORA c
            inner join TIPO_COMPUTADORA tc on tc.id_tipoComputadora = c.id_tipoComputadora
            inner join PROCESADOR p on p.id_procesador = c.procesador
            inner join TARJETA_GRAFICA tg on tg.id_tarjeta = c.tarjeta_grafica
            inner join SISTEMA_OPERATIVO so on so.id_sistema = c.sistema_operativo
            inner join TARJETA_RED tr on tr.id_tarjeta = c.configuracion_red 
            where id_computadora = ${idEquipo}`;
        const computadora = computadoraResult.recordset[0];

        if (computadora) {
            // Si es una computadora, enviar los detalles del equipo y la computadora
            const softwareResult = await sql.query`
                select software = s.nombre+' '+s.version_
                from COMPUTADORA c
                inner join SOFTWARE_COMPUTADORA sc on sc.id_computadora = c.id_computadora
                inner join SOFTWARE s on s.id_software = sc.id_software
                where c.id_computadora = ${idEquipo}`
            const softwares = softwareResult.recordset;
            
            return res.status(200).json({
                tipo: 'Computadora',
                equipo: equipo,
                detalles: computadora,
                softwares: softwares
            });
        }
        // Comprobar si el equipo es un servidor
        const servidorResult = await sql.query`SELECT * FROM SERVIDOR WHERE id_servidor = ${idEquipo}`;
        const servidor = servidorResult.recordset[0];

        if (servidor) {
            // Si es un servidor, enviar los detalles del equipo y el servidor
            return res.status(200).json({
                tipo: 'Servidor',
                equipo: equipo,
                detalles: servidor
            });
        }

        // Comprobar si el equipo es un switch
        const switchResult = await sql.query`SELECT * FROM SWITCH WHERE id_switch = ${idEquipo}`;
        const Switch = switchResult.recordset[0];

        if (Switch) {
            // Si es un switch, enviar los detalles del equipo y el switch
            return res.status(200).json({
                tipo: 'Switch',
                equipo: equipo,
                detalles: Switch
            });
        }

        // Comprobar si el equipo es un router
        const routerResult = await sql.query`SELECT * FROM ROUTER WHERE id_router = ${idEquipo}`;
        const router = routerResult.recordset[0];

        if (router) {
            // Si es un switch, enviar los detalles del equipo y el switch
            return res.status(200).json({
                tipo: 'Router',
                equipo: equipo,
                detalles: router
            });
        }

        // Comprobar si el equipo es un switch
        const escanerResult = await sql.query`SELECT * FROM ESCANER WHERE id_escaner = ${idEquipo}`;
        const escaner = escanerResult.recordset[0];

        if (escaner) {
            // Si es un switch, enviar los detalles del equipo y el switch
            return res.status(200).json({
                tipo: 'Escaner',
                equipo: equipo,
                detalles: escaner
            });
        }
        // Si no es ni computadora ni servidor
        res.status(404).send('El equipo no es ni una computadora ni un servidor');

    } catch (error) {
        console.error('Error al obtener los detalles del equipo:', error.message);
        res.status(500).send('Error al obtener los detalles del equipo');
    }
});

//--------------------05 de Octubre-----------------------
//Trae las prioridades
app.get('/Prioridad', async (req, res) => {
    try {
        await sql.connect(config);
        const request = new sql.Request();
        const result = await request.query(`
            SELECT * FROM PRIORIDAD
        `);    
        res.status(200).json(result.recordset);
    } catch (error) {
        console.error('Error al obtener las prioridades', error.message);
        res.status(500).send('Error al obtener las prioridades');
    }
});

//Trae los Tipos de incidencias
app.get('/TipoIncidencia', async (req, res) => {
    try {
        await sql.connect(config);
        const request = new sql.Request();
        const result = await request.query(`
            SELECT * FROM TIPO_INCIDENCIA
        `);    
        res.status(200).json(result.recordset);
    } catch (error) {
        console.error('Error al obtener los tipos de incidencias', error.message);
        res.status(500).send('Error al obtener los tipos de incidencias');
    }
});

//Inserta nueva incidencia
app.post('/NuevaIncidencia',async(req,res) => {
    try{
        await sql.connect(config);
        const {id_equipo, descripcionGeneral, fechaActual, hrEnvio, hrInicial, hrFinal, prioridad, tipoIncidencia} = req.body;
        console.log('Datos recibidos:', {
            id_equipo, descripcionGeneral, fechaActual, hrEnvio, hrInicial, hrFinal, prioridad, tipoIncidencia
        });
        console.log('llegue a altaIncidencia');
       // Inserción en la tabla EQUIPO
       const resultIncidencia = await sql.query`
            DECLARE @InsertedIds TABLE (id_incidencia INT);
            
            INSERT INTO INCIDENCIA (id_equipo, descripcion, fecha, hora_envio, id_prioridad, id_estado, id_tipoIncidencia, hora_disponible_inicio, hora_disponible_fin)
            OUTPUT INSERTED.id_incidencia INTO @InsertedIds
            VALUES (${id_equipo}, ${descripcionGeneral}, ${fechaActual}, ${hrEnvio}, ${prioridad}, 5, ${tipoIncidencia}, ${hrInicial}, ${hrFinal});
            
            SELECT id_incidencia FROM @InsertedIds;
        `;
        const id_incidencia = resultIncidencia.recordset[0].id_incidencia;
        //traer el id_espacio
        const resultEspacio = await sql.query`
            select id_espacio from EQUIPO where id_equipo = ${id_equipo};
        `;
        const id_espacio = resultEspacio.recordset[0].id_espacio;
        //Insertar en la tabla incidencia_lugar
        await sql.query`
            INSERT INTO INCIDENCIA_LUGAR(id_incidencia, id_espacio)
            VALUES ( ${id_incidencia}, ${id_espacio});
        `;
        res.status(200).send('Incidencia agregada');
    }catch(error){
        console.error('Error al insertar incidencia:', error.message);
        // Enviar una respuesta de error
        res.status(500).send('Error al insertar incidencia');
    }finally{
        await sql.close();
    }
});


//Trae el detalle de la tabla de incidencias para ADMON
app.get('/DetalleTablaADMON', async (req, res) => {
    try {
        await sql.connect(config);
        const result = await sql.query`
            SELECT 
                I.id_incidencia, D.nombre, I.fecha, TI.nombre as nombreIncidencia, I.descripcion, EI.estado_incidencia as estado, EI.color
            FROM 
                INCIDENCIA I
            JOIN 
                INCIDENCIA_LUGAR IL ON I.id_incidencia = IL.id_incidencia
            JOIN 
                ESPACIOS E ON IL.id_espacio = E.id_espacio
            JOIN 
                DEPARTAMENTO D ON E.id_departamento = D.id_departamento
            JOIN 
                TIPO_INCIDENCIA TI ON TI.id_tipoIncidencia =I.id_tipoIncidencia
            JOIN
                ESTADO_INCIDENCIA EI ON EI.id_estado = I.id_estado;
        `;
        const detalle = result.recordset;
        console.log(detalle);
        res.status(200).json(detalle);
        //res.status(200).json({id_folio: detalle.id_incidencia, departamento: detalle.nombre, fecha: detalle.fecha, 
          //  tipoIncidencia: detalle.nombreIncidencia, descripcion: detalle.descripcion, estado: detalle.estado, color: detalle.color})
    } catch (error) {
        console.log('Error al obtener datos de la tabla: ', error);
        res.status(500).json({ error: 'Error al obtener datos de la tabla' });
    }
});

//Trae el detalle de la tabla de incidencias por departamento
app.get('/DetalleTablaDepartamento', async (req, res) => {
    try {
        await sql.connect(config);
        const { id_departamento } = req.query;
        console.log('Llegue a tabla por dpto y el id_departamento es ', id_departamento);
        const result = await sql.query`
            SELECT 
                I.id_incidencia, I.fecha, TI.nombre as nombreIncidencia, I.descripcion, EI.estado_incidencia as estado, EI.color
            FROM 
                INCIDENCIA I
            JOIN 
                INCIDENCIA_LUGAR IL ON I.id_incidencia = IL.id_incidencia
            JOIN 
                ESPACIOS E ON IL.id_espacio = E.id_espacio
            JOIN 
                DEPARTAMENTO D ON E.id_departamento = D.id_departamento
            JOIN 
                TIPO_INCIDENCIA TI ON TI.id_tipoIncidencia =I.id_tipoIncidencia
            JOIN
                ESTADO_INCIDENCIA EI ON EI.id_estado = I.id_estado
            WHERE D.id_departamento = ${id_departamento};
        `;
        const detalle = result.recordset;
        console.log(detalle);
        res.status(200).json(detalle);
    } catch (error) {
        console.log('Error al obtener datos de la tabla: ', error);
        res.status(500).json({ error: 'Error al obtener datos de la tabla' });
    }
});

//Trae las especializaciones
app.get('/SelectEspecializaciones', async (req, res) => {
    try {
        await sql.connect(config);
        const request = new sql.Request();
        const result = await request.query(`
            SELECT * FROM ESPECIALIZACION
        `);    
        res.status(200).json(result.recordset);
    } catch (error) {
        console.error('Error al obtener las especializaciones', error.message);
        res.status(500).send('Error al obtener las especializacioness');
    }
});

//Trae los tecnicos
app.get('/SelectTecnicos', async (req, res) => {
    try {
        await sql.connect(config);
        const { id_especializacion } = req.query;
        console.log(id_especializacion)
        const request = new sql.Request();
        const result = await request.query(`
            select t.id_usuario, u.nombre+' '+u.apellido as nombre from TECNICO T
            JOIN
                ESPECIALIZACION E ON e.id_especializacion = t.id_especializacion
            JOIN 
                USUARIO U ON u.id_usuario = t.id_usuario
            WHERE e.id_especializacion = ${id_especializacion} and t.id_estadoDisponibilidad = 1;
        `);    
        res.status(200).json(result.recordset);
    } catch (error) {
        console.error('Error al obtener las especializaciones', error.message);
        res.status(500).send('Error al obtener las especializacioness');
    }
});

// Asigna tecnico a incidencia
app.put('/AsignarTecnico', async (req, res) => {
    const { id_incidencia, id_usuario } = req.body;

    console.log('Datos recibidos:', {
        id_incidencia, id_usuario
    });
    try {
        await sql.connect(config);
        const request = new sql.Request();
        request.input('id_incidencia', sql.Int, id_incidencia);
        request.input('id_usuario', sql.Int, id_usuario);
        const result = await request.query(`
            UPDATE INCIDENCIA
            SET id_tecnicoAsignado = @id_usuario, 
                id_estado = 1
            WHERE id_incidencia = @id_incidencia;
        `)

        if (result.rowsAffected[0] > 0) {
            res.json({ success: true, message: 'Tecnico asignado' });
        } else {
            res.json({ success: false, message: 'No se pudo asignar tecnico' });
        }
    } catch (error) {
        console.error('Error al asignar tecnico:', error.message);
        res.status(500).json({ success: false, message: 'Error al asignar tecnico' });
    } finally {
        await sql.close();
    }
});

// Rechazar incidencia
app.put('/RechazarIncidencia', async (req, res) => {
    const { id_incidencia } = req.body;

    console.log('Datos recibidos:', {
        id_incidencia
    });
    try {
        await sql.connect(config);
        const request = new sql.Request();
        request.input('id_incidencia', sql.Int, id_incidencia);
        const result = await request.query(`
            UPDATE INCIDENCIA
            SET id_estado = 4
            WHERE id_incidencia = @id_incidencia;
        `)

        if (result.rowsAffected[0] > 0) {
            res.json({ success: true, message: 'Incidencia rechazada' });
        } else {
            res.json({ success: false, message: 'No se pudo rechazar incidencia' });
        }
    } catch (error) {
        console.error('Error al rechazar incidencia:', error.message);
        res.status(500).json({ success: false, message: 'Error al rechazar incidencia' });
    } finally {
        await sql.close();
    }
});

//Trae el detalle de la tabla de incidencias para tecnico
app.get('/DetalleTablaTecnico', async (req, res) => {
    try {
        await sql.connect(config);
        const { id_usuario } = req.query;
        console.log('Datos recibidos:', {
            id_usuario
        });
        const result = await sql.query`
            SELECT 
                I.id_incidencia, D.nombre, I.fecha, TI.nombre as nombreIncidencia, I.descripcion, EI.estado_incidencia as estado, EI.color
            FROM 
                INCIDENCIA I
            JOIN 
                INCIDENCIA_LUGAR IL ON I.id_incidencia = IL.id_incidencia
            JOIN 
                ESPACIOS E ON IL.id_espacio = E.id_espacio
            JOIN 
                DEPARTAMENTO D ON E.id_departamento = D.id_departamento
            JOIN 
                TIPO_INCIDENCIA TI ON TI.id_tipoIncidencia = I.id_tipoIncidencia
            JOIN
                ESTADO_INCIDENCIA EI ON EI.id_estado = I.id_estado
            JOIN
                TECNICO T ON T.id_usuario = I.id_tecnicoAsignado
            WHERE I.id_tecnicoAsignado = ${id_usuario};
        `;
        const detalle = result.recordset;
        console.log(detalle);
        res.status(200).json(detalle);
    } catch (error) {
        console.log('Error al obtener datos de la tabla: ', error);
        res.status(500).json({ error: 'Error al obtener datos de la tabla' });
    }
});

//Trae el detalle de incidencias para tecnico
app.get('/DetalleIncidencia', async (req, res) => {
    try {
        await sql.connect(config);
        const { id_incidencia } = req.query;
        console.log('Datos recibidos:', {
            id_incidencia
        });
        const result = await sql.query`
            SELECT 
                I.id_incidencia,
                I.hora_envio,
                I.hora_disponible_inicio,
                I.hora_disponible_fin,
                P.nombre AS nombre_prioridad,
                P.descripcion AS descripcion_prioridad,
                E.nombre as nombre_espacio,
                E.ubicacion_esp,
                D.ubicacion_edificio
            FROM 
                INCIDENCIA I
            JOIN 
                PRIORIDAD P ON I.id_prioridad = P.id_prioridad
            JOIN 
                INCIDENCIA_LUGAR IL ON I.id_incidencia = IL.id_incidencia
            JOIN 
                ESPACIOS E ON IL.id_espacio = E.id_espacio
            JOIN 
                EDIFICIO D ON E.id_edificio = D.id_edificio
            WHERE I.id_incidencia = ${id_incidencia};
        `;
        const detalle = result.recordset[0];
        console.log(detalle);
        res.status(200).json(detalle);
    } catch (error) {
        console.log('Error al obtener datos del detalle incidencia: ', error);
        res.status(500).json({ error: 'Error al obtener datos del detalle incidencia' });
    }
});

// Finalizar incidencia
app.put('/FinalizarIncidencia', async (req, res) => {
    const { id_incidencia } = req.body;

    console.log('Datos recibidos:', {
        id_incidencia
    });
    try {
        await sql.connect(config);
        const request = new sql.Request();
        request.input('id_incidencia', sql.Int, id_incidencia);
        const result = await request.query(`
            UPDATE INCIDENCIA
            SET id_estado = 2
            WHERE id_incidencia = @id_incidencia;
        `)

        if (result.rowsAffected[0] > 0) {
            res.json({ success: true, message: 'Incidencia finalizada' });
        } else {
            res.json({ success: false, message: 'No se pudo finalizar incidencia' });
        }
    } catch (error) {
        console.error('Error al finalizar incidencia:', error.message);
        res.status(500).json({ success: false, message: 'Error al finalizar incidencia' });
    } finally {
        await sql.close();
    }
});

// Finalizar incidencia
app.put('/LiberarIncidencia', async (req, res) => {
    const { id_incidencia } = req.body;

    console.log('Datos recibidos:', {
        id_incidencia
    });
    try {
        await sql.connect(config);
        const request = new sql.Request();
        request.input('id_incidencia', sql.Int, id_incidencia);
        const result = await request.query(`
            UPDATE INCIDENCIA
            SET id_estado = 3
            WHERE id_incidencia = @id_incidencia;
        `)

        if (result.rowsAffected[0] > 0) {
            res.json({ success: true, message: 'Incidencia liberada' });
        } else {
            res.json({ success: false, message: 'No se pudo liberar incidencia' });
        }
    } catch (error) {
        console.error('Error al liberar incidencia:', error.message);
        res.status(500).json({ success: false, message: 'Error al liberar incidencia' });
    } finally {
        await sql.close();
    }
});