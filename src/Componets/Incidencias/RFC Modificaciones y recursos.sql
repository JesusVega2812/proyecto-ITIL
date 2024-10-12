
alter table historial_incidencias
drop constraint FK_Historial_TipoReparacion;

alter table historial_incidencias
drop constraint FK_Historial_Incidencia;

drop table TIPO_REPARACION;

alter table PARTES_REEMPLAZADAS
drop constraint FK_PartesReemplazadas_Historial;

alter table PARTES_REEMPLAZADAS
drop constraint FK_PartesReemplazadas_Parte;

alter table PARTES_REEMPLAZADAS
drop constraint PK__PARTES_R__087CB9D440A253ED;

alter table PARTES_REEMPLAZADAS
drop column id_historial;

alter table PARTES_REEMPLAZADAS
drop column cantidad;

alter table PARTES_REEMPLAZADAS
add aceptada bit;

alter table PARTES_REEMPLAZADAS
add responsable INT

drop table HISTORIAL_INCIDENCIAS;
drop table PARTES_REEMPLAZADAS;
-------------------------------------------------------------------------------
EXEC sp_rename 'PARTES_REEMPLAZADAS', 'RFC';
EXEC sp_rename 'PARTES', 'PIEZA';

-------------------------------------------------------------------------------
alter table PIEZA
drop constraint PK__PARTES__3F12D5847095BAEF

alter table PIEZA
drop column id_parte;

alter table Pieza 
add id_pieza int not null identity(1,1)

alter table Pieza 
add constraint PK_Pieza primary key(id_pieza)

alter table RFC
drop column id_parte;

alter table RFC
add pieza int not null;

alter table RFC
add incidencia INT not null

alter table RFC
add constraint PK_RFC primary key(pieza,incidencia);

alter table RFC 
add constraint FK_RFC_Incidencia foreign key(incidencia) references incidencia(id_incidencia);

alter table RFC 
add constraint FK_RFC_Pieza foreign key(pieza) references pieza(id_pieza);