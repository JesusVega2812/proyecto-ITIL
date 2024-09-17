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

//Inicio de sesion
app.post('/Login', async(req,res) => {
    
    try {
        await sql.connect(config);

        const {usuario,contra} = req.body;

        const loginCheckResult = await sql.query`
        SELECT dbo.VerificarUsuario(${usuario},${contra}) AS EsValido;`

        const esValido = loginCheckResult.recordset[0].EsValido;
        console.log(esValido);
        res.status(200).json({esValido});
    } catch (error) {
        console.log('error al verificar el inicio de sesion: ',error);
        res.status(500).json({error: 'error al verificar inicio de sesion'});
    }finally{
        await sql.close();
    }
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

//Trae el id del departamento padre
// Ruta para obtener el ID del departamento padre según el nombre
/*app.get('/ObtenerIdDepartamentoPadre/:departamentoPadre', async (req, res) => {
    try {
        await sql.connect(config);
        const { departamentoPadre } = req.params;
        console.log("imprime en obtener id: ",{departamentoPadre});

        // Consulta SQL para obtener el ID del departamento padre
        //const result = await sql.query(`select id_departamento from departamento where nombre = ${departamentoPadre}`);
       
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

//Actualiza departamentos
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
});*/
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