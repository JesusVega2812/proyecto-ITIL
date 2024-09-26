// Trae los equipos segun el espacio
app.get('/SelectEquiposPorEspacio', async (req, res) => {
    try{
        await sql.connect(config);
        const { id_espacio, id_edificio, id_tipoEspacio } = req.body;
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