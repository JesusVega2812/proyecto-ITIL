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
        res.status(200).json({esValido});
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