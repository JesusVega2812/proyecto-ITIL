--EQUIPO

/*CREATE TABLE EQUIPO (
    id_equipo INT IDENTITY PRIMARY KEY NOT NULL,
    id_espacio INT,
    numero_serie VARCHAR(100),
    fecha_compra DATE,
    fecha_instalacion DATE,
    valor_compra numeric(6,2),
    id_usuario INT,
    id_modelo INT,
    --id_contratoSoporte INT,
	id_garantia INT,
	estado_equipo VARCHAR(20) --EN USO, REPARACION, YA NO SIRVE
);*/

insert into MARCA(nombre)
values('marquita')

insert into MODELO(nombre, id_marca, año_lanzamiento)
values('modelito', 1, 2020)

ALTER TABLE GARANTIA
DROP CONSTRAINT FK_Garantia_Equipo;

ALTER TABLE GARANTIA
DROP COLUMN id_equipo;

insert into GARANTIA(cobertura, fecha_inicio, fecha_final)
values('covertuchis', '04-12-2023', '04-12-2028')

INSERT INTO EQUIPO(id_espacio, numero_serie, fecha_compra, fecha_instalacion, valor_compra, id_usuario, id_modelo, id_garantia, estado_equipo)
VALUES (4, '1234567', '12-04-2023', '09-25-2024', 130.00, 1, 1, 1, 'En uso');

INSERT INTO EQUIPO(id_espacio, numero_serie, fecha_compra, fecha_instalacion, valor_compra, id_usuario, id_modelo, id_garantia, estado_equipo)
VALUES (4, '0987654', '12-04-2023', '09-25-2024', 130.00, 1, 1, 1, 'En uso');

INSERT INTO EQUIPO(id_espacio, numero_serie, fecha_compra, fecha_instalacion, valor_compra, id_usuario, id_modelo, id_garantia, estado_equipo)
VALUES (5, '3456789', '12-04-2023', '09-25-2024', 130.00, 1, 1, 1, 'En uso');

INSERT INTO EQUIPO(id_espacio, numero_serie, fecha_compra, fecha_instalacion, valor_compra, id_usuario, id_modelo, id_garantia, estado_equipo)
VALUES (3, '3456789', '12-04-2023', '09-25-2024', 130.00, 1, 1, 1, 'En uso');

select * from USUARIO

select * from MODELO

select * from EQUIPO

select * from ESPACIOS


SELECT id_equipo, numero_serie 
FROM EQUIPO 
WHERE id_espacio = 4
AND id_espacio IN (
    SELECT id_espacio 
    FROM ESPACIOS 
    WHERE id_tipoEspacio = 3 
    AND id_edificio = 1
);



