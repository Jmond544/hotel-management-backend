# DB model

- [ ] RESERVA
- [X] TIPO_SERVICIO
- [ ] RESERVA_HABITACION
- [X] HABITACION
- [ ] HUESPED
- [ ] RESERVA_HUESPED
- [ ] USUARIO_INTERNO
- [X] ESTADO_PAGO

```mermaid

erDiagram

    RESERVA {
        STRING id
        STRING id_tipo_servicio
        STRING id_estado_pago
        DATE fecha_inicio
        DATE fecha_fin
        INTEGER numero_huespedes
        FLOAT monto_pago
        STRING mail_pago
        STRING telefono_pago
        TIME fecha_creacion
    }

    TIPO_SERVICIO {
        STRING id
        STRING nombre
        FLOAT precio
    }

    RESERVA_HABITACION {
        STRING id_reserva
        STRING id_habitacion
    }

    HABITACION {
        STRING id
        STRING numero_habitacion
        STRING tipo_habitacion
        INTEGER numero_piso
        FLOAT precio
        STRING estado
    }

    HUESPED {
        STRING id
        STRING nombres
        STRING apellidos
        STRING dni
        STRING telefono
        STRING mail
    }

    RESERVA_HUESPED {
        STRING id_reserva
        STRING id_huesped
    }

    USUARIO_INTERNO {
        STRING id
        STRING rol
        STRING nombres
        STRING apellidos
        STRING dni
        STRING url_imagen
        STRING telefono
        STRING gmail
        STRING password
        STRING codigo_temporal
    }

    ESTADO_PAGO {
        STRING id
        STRING estado
    }

    RESERVA_HABITACION }|--|| RESERVA : contains
    TIPO_SERVICIO ||--|| RESERVA : contains
    RESERVA_HABITACION }|--|| HABITACION : contains
    RESERVA_HUESPED }|--|| HUESPED : contains
    RESERVA_HUESPED }|--|| RESERVA : contains
    RESERVA ||--|| ESTADO_PAGO : contains

```

## Class Diagram (Use case reservation)

```mermaid
classDiagram

reservartion : getAll()
reservartion : getById({ id }) 
reservartion : create({ tipoServicio, fechaInicio,fechaFin,mailPago,telefonoPago,habitaciones,huespedes})
reservartion : update({ data, id })
reservartion : delete({ id })

Type_Service_Model : getById({ id })
Type_Service_Model : getIdByName({ name })

GuestModel : getAll()
GuestModel : getOneById({ id })
GuestModel : getOneByDNINumber({ dniNumber })
GuestModel : getIdByDNINumber({ dniNumber })
GuestModel : create({ name, lastName, dni, phone, mail })

```