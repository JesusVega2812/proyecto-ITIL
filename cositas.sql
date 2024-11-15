DBCC CHECKIDENT ('EQUIPO', RESEED, 0);

select * from equipo

DELETE FROM Equipo
WHERE id_equipo IN (6);

delete from computadora
where id_computadora in (4)


select * from software_computadora


DELETE FROM software_computadora
WHERE id_computadora IN (4);

select * from puerto

DELETE FROM puerto
WHERE id_computadora IN (2);

select * from ESCANER


SELECT e.id_equipo, e.nombre
            FROM EQUIPO e
            JOIN ESCANER es ON e.id_equipo = es.id_escaner
            WHERE e.id_espacio IS NULL 
            AND e.estado_equipo = 'disponible'


			SELECT DISTINCT E.id_edificio, E.nombre
            FROM EDIFICIO E
            JOIN ESPACIOS ES ON E.id_edificio = ES.id_edificio
            WHERE ES.id_departamento = 2 and ES.estatus = 1


			select * from USUARIO

			update USUARIO
			set id_departamento_pertenece = 2 where id_usuario = 1

			select * from DEPARTAMENTO