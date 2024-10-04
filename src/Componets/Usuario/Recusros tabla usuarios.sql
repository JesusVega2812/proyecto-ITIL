--Agrega el atributo permisos a usuarios
ALTER TABLE USUARIO
ADD permisos INT NULL;

update usuario set permisos = 1 where id_usuario = 2
update usuario set permisos = 2 where id_usuario = 1

--Agrega el atributo statuts a usuarios
ALTER TABLE USUARIO
ADD status bit NULL;
go
update usuario set status = 1 where id_usuario = 1
update usuario set status = 1 where id_usuario = 2
update usuario set status = 1 where id_usuario = 3
update usuario set status = 1 where id_usuario = 4

select * from USUARIO

--------------------------ultimo ultimo 14/09/24 11:00 am----------------------
INSERT INTO USUARIO (nombre, apellido, id_departamento_pertenece, id_jefe, correo, telefono, contrasena, permisos)
VALUES ('Mirna', 'noseque', 1, 1, 'mirnuchis@ti.com', '555-3333', '123', 0);

UPDATE USUARIO
SET permisos = 3
WHERE nombre = 'Mirna' AND apellido = 'noseque';

select * from USUARIO


-------------------------ultimo ultimo ultimo 03/10/24---------------------------------------
insert into ESPECIALIZACION(nombre) values ('Redes');
insert into ESPECIALIZACION(nombre) values ('Hardware');
insert into ESPECIALIZACION(nombre) values ('Software');

ALTER TABLE TECNICO
ADD CONSTRAINT FK_Tecnico_Usuario FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario);

insert into ESTADO_DISPONIBILIDAD(id_estadoDisponibilidad,estado) values (1,'Disponible');
insert into ESTADO_DISPONIBILIDAD(id_estadoDisponibilidad,estado) values (2,'Ocupado');
insert into ESTADO_DISPONIBILIDAD(id_estadoDisponibilidad,estado) values (3,'Ausente');

ALTER TABLE Tecnico
DROP COLUMN nombre;

ALTER TABLE Tecnico
DROP COLUMN apellidos;

select * from ESTADO_DISPONIBILIDAD
select *  from especializacion
