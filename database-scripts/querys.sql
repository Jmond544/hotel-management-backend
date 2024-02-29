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

SELECT BIN_TO_UUID(r.id) AS id_reserva, s.nombre AS tipo_servicio, ep.estado AS estado_pago, r.fecha_inicio, r.fecha_fin, r.numero_huespedes, r.monto_pago, r.mail_pago, r.telefono_pago, GROUP_CONCAT(DISTINCT h.numero_habitacion ORDER BY h.numero_habitacion SEPARATOR ', ') AS habitaciones, GROUP_CONCAT(DISTINCT CONCAT(hu.nombres, ' ', hu.apellidos) ORDER BY hu.apellidos, hu.nombres SEPARATOR ', ') AS huespedes FROM RESERVA r LEFT JOIN TIPO_SERVICIO s ON r.id_tipo_servicio = s.id LEFT JOIN ESTADO_PAGO ep ON r.id_estado_pago = ep.id LEFT JOIN RESERVA_HABITACION rh ON r.id = rh.id_reserva LEFT JOIN HABITACION h ON rh.id_habitacion = h.id LEFT JOIN RESERVA_HUESPED rhp ON r.id = rhp.id_reserva LEFT JOIN HUESPED hu ON rhp.id_huesped = hu.id GROUP BY r.id;


SELECT r.id AS id_reserva, s.nombre AS tipo_servicio, ep.estado AS estado_pago, r.fecha_inicio, r.fecha_fin, r.numero_huespedes, r.monto_pago, r.mail_pago, r.telefono_pago, GROUP_CONCAT(DISTINCT h.numero_habitacion ORDER BY h.numero_habitacion SEPARATOR ', ') AS habitaciones, GROUP_CONCAT(DISTINCT CONCAT(hu.nombres, ' ', hu.apellidos) ORDER BY hu.apellidos, hu.nombres SEPARATOR ', ') AS huespedes FROM RESERVA r LEFT JOIN TIPO_SERVICIO s ON r.id_tipo_servicio = s.id LEFT JOIN ESTADO_PAGO ep ON r.id_estado_pago = ep.id LEFT JOIN RESERVA_HABITACION rh ON r.id = rh.id_reserva LEFT JOIN HABITACION h ON rh.id_habitacion = h.id LEFT JOIN RESERVA_HUESPED rhp ON r.id = rhp.id_reserva LEFT JOIN HUESPED hu ON rhp.id_huesped = hu.id WHERE r.id = UUID_TO_BIN('8efc331c-d6a9-11ee-952f-8c16450196f9');


SELECT 
    r.id AS id_reserva, 
    s.nombre AS tipo_servicio, 
    ep.estado AS estado_pago, 
    r.fecha_inicio, 
    r.fecha_fin, 
    r.numero_huespedes, 
    r.monto_pago, 
    r.mail_pago, 
    r.telefono_pago, 
    GROUP_CONCAT(DISTINCT h.numero_habitacion ORDER BY h.numero_habitacion SEPARATOR ', ') AS habitaciones, 
    GROUP_CONCAT(DISTINCT CONCAT(hu.nombres, ' ', hu.apellidos) 
    ORDER BY hu.apellidos, hu.nombres SEPARATOR ', ') AS huespedes
FROM RESERVA r
LEFT JOIN TIPO_SERVICIO s ON r.id_tipo_servicio = s.id
LEFT JOIN ESTADO_PAGO ep ON r.id_estado_pago = ep.id
LEFT JOIN RESERVA_HABITACION rh ON r.id = rh.id_reserva
LEFT JOIN HABITACION h ON rh.id_habitacion = h.id
LEFT JOIN RESERVA_HUESPED rhp ON r.id = rhp.id_reserva
LEFT JOIN HUESPED hu ON rhp.id_huesped = hu.id
WHERE r.id = UUID_TO_BIN('d8851b64-d6c1-11ee-952f-8c16450196f9');
