import React, { useState } from 'react';
import deleteIcon from '../../assets/img/Delete.png';
import editIcon from '../../assets/img/Edit.png';

export const AgendaCard = ({
  id,
  nombre,
  descripcion,
  fechaInicio,
  fechaFin,
  activo,
  eliminar,
  actulizarPage
}) => {
  const regex = /(\d{4})-(\d{2})-(\d{2})T.*/;
  const fechaInicioMod = regex.exec(fechaInicio);
  const fechaFinMod = regex.exec(fechaFin);
  const [, añoI, mesI, diaI] = fechaInicioMod;
  const [, añoF, mesF, diaF] = fechaFinMod;
  const fechaInicioResult = `${diaI}/${mesI}/${añoI}`;
  const fechaFinResult = `${diaF}/${mesF}/${añoF}`;

  // Definir la clase condicional para cambiar el color de la tarjeta
  const cardClass = activo ? 'channels-card active' : 'channels-card inactive';

  return (
    <>
      <div style={{ display: 'flex' }}>
        <div className={cardClass}>
          <div>
            <span className="channels-card-title"><strong>Nombre:</strong> {nombre}</span>
            <br />
            <br />
            <span className="channels-card-title"><strong>Descripción:</strong> {descripcion}</span>
            <br />
            <br />
            <span className="channels-card-title"><strong>Fecha de Inicio: </strong>{fechaInicioResult}</span>
            <br />
            <br />
            <span className="channels-card-title"><strong>Fecha de Cierre: </strong>{fechaFinResult}</span>
          </div>

        </div>

        <div>
          <img className='delete-hover' style={{ cursor: 'pointer' }} id={id} src={deleteIcon} onClick={eliminar} />
          <br />
          <img className='delete-hover' style={{ cursor: 'pointer', marginLeft: '15%', marginTop: '15%' }} src={editIcon} id={id} onClick={actulizarPage} />
        </div>
      </div>
    </>
  )
}
