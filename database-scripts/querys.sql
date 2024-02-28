-- Consulta para obtener las reservas realizadas en el año 2021

SELECT 
    R.fecha_inicio,
    R.fecha_fin,
    R.monto_pago,
    R.telefono_pago,
    H.numero_habitacion,
    EP.estado AS estado_pago
FROM RESERVA AS R
INNER JOIN RESERVA_HABITACION AS RH ON R.id = RH.id_reserva
INNER JOIN HABITACION AS H ON RH.id_habitacion = H.id
INNER JOIN ESTADO_PAGO AS EP ON R.id_estado_pago = EP.id
WHERE R.fecha_inicio >= '2021-01-01' AND R.fecha_fin <= '2021-12-31' AND H.numero_habitacion = 103;



SELECT R.fecha_inicio AS fecha_inicio, R.fecha_fin AS fecha_fin, R.monto_pago AS monto_pago, R.telefono_pago AS telefono_pago, H.numero_habitacion AS numero_habitacion, EP.estado AS estado_pago FROM RESERVA AS R INNER JOIN RESERVA_HABITACION AS RH ON R.id = RH.id_reserva INNER JOIN HABITACION AS H ON RH.id_habitacion = H.id INNER JOIN ESTADO_PAGO AS EP ON R.id_estado_pago = EP.id WHERE R.fecha_inicio >= '2020-01-01' AND R.fecha_fin <= '2021-12-31' AND H.numero_habitacion = 103;

SELECT R.fecha_inicio AS fecha_inicio, R.fecha_fin AS fecha_fin, R.monto_pago AS monto_pago, R.telefono_pago AS telefono_pago, H.numero_habitacion AS numero_habitacion, EP.estado AS estado_pago FROM RESERVA AS R INNER JOIN RESERVA_HABITACION AS RH ON R.id = RH.id_reserva INNER JOIN HABITACION AS H ON RH.id_habitacion = H.id INNER JOIN ESTADO_PAGO AS EP ON R.id_estado_pago = EP.id WHERE R.fecha_inicio >= '2020-01-01' AND R.fecha_fin <= '2021-12-31' AND R.telefono_pago = 99999999;