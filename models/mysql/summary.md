# Summary of Methods

### Methods of models



# estado_pago


## createPool

Establece una conexión a la base de datos MySQL mediante un pool de conexiones, utilizando la biblioteca mysql2/promise, y configura las credenciales de la base de datos a partir de un archivo de configuración externo.


```js
    import { createPool } from "mysql2/promise";
    import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } from "../../config.js";
    export const poll = createPool({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
});

*    Este método pertenece a la biblioteca mysql2/promise y se utiliza para crear un pool de conexiones a la base de datos MySQL. Un pool de conexiones ayuda a mejorar el rendimiento y la eficiencia al reutilizar conexiones existentes en lugar de establecer nuevas conexiones cada vez que se realiza una consulta.

```
* poll:

Es un objeto que representa el pool de conexiones creado con createPool.
Tiene configuraciones como el host, el puerto, el usuario, la contraseña y el nombre de la base de datos, que se extraen del archivo de configuración ../../config.js.
Este objeto se utilizará en otros lugares de la API para realizar consultas a la base de datos de manera eficiente utilizando las conexiones del pool.


# estado pago

## getIdByStatus()

es un método estático que realiza una consulta a la base de datos para obtener el id correspondiente a un estado de pago específico.

```js
static async getIdByStatus({ status }) {
    try {
      const result = await poll.query(
        "SELECT BIN_TO_UUID(id) AS id FROM ESTADO_PAGO WHERE estado = ?",
        [status]
      );
      return result[0][0].id;
    } catch (error) {
      console.log(error);
    }
  }
```

*   Es un método estático, por lo que puede ser llamado sin instanciar la clase.
*   Toma un objeto como argumento con una propiedad llamada status.
*   Dentro del método, se utiliza un bloque try-catch para manejar excepciones.
*   Dentro del bloque try, se realiza una consulta a la base de datos utilizando la función poll.query. La consulta es para seleccionar el campo id de la tabla ESTADO_PAGO donde el campo estado sea igual al valor proporcionado en el argumento status.
*   La consulta utiliza BIN_TO_UUID(id) para convertir el campo id de formato binario a formato UUID.
*   El resultado de la consulta se espera que sea un array bidimensional (result[0]), y se accede al primer elemento y al primer elemento de ese subarray (result[0][0].id).
*   Si la consulta es exitosa, el método devuelve el id obtenido de la base de datos.
*   En caso de error, se captura la excepción y se imprime en la consola mediante console.log(error).




  

# Habitación

## getAll

Este método obtiene todos los detalles de las habitaciones disponibles en la base de datos. Realiza una consulta SQL para seleccionar información sobre todas las habitaciones almacenadas. Retorna un arreglo con los detalles de todas las habitaciones si la consulta tiene éxito, de lo contrario, maneja cualquier error que ocurra imprimiéndolo en la consola.


```js
   static async getAll() {
    try {
      const result = await poll.query(
        "SELECT numero_habitacion, tipo_habitacion, numero_piso, precio, estado FROM HABITACION"
      );
      return result[0];
    } catch (error) {
      console.log(error);
    }
  }
   
```

*   Obtiene todas las habitaciones y sus detalles desde la base de datos.
*   Utiliza una consulta SQL para seleccionar información de todas las habitaciones.
*   Retorna un arreglo con la información de las habitaciones o maneja el error imprimiéndolo en la consola.





## getByNumberRoom({ number }):

Esta función recupera los detalles de una habitación específica según el número proporcionado. Utiliza una consulta SQL con un parámetro para filtrar las habitaciones por número. Retorna un arreglo con los detalles de la habitación si la consulta es exitosa, y en caso de error, maneja la excepción imprimiéndola en la consola.

```js
   
  static async getByNumberRoom({ number }) {
    try {
      const result = await poll.query(
        "SELECT numero_habitacion, tipo_habitacion, numero_piso, precio, estado FROM HABITACION WHERE numero_habitacion = ?",
        [number]
      );
      return result[0];
    } catch (error) {
      console.log(error);
    }
  }
   
```
*   Obtiene detalles de una habitación específica según el número proporcionado.
*   Utiliza una consulta SQL con un parámetro para filtrar por número de habitación.
*   Retorna un arreglo con la información de la habitación o maneja el error imprimiéndolo en la consola.



## getByTypeRoom({ type })

El método getByTypeRoom obtiene los detalles de las habitaciones según el tipo proporcionado. Realiza una consulta SQL con un parámetro para filtrar las habitaciones por tipo. Retorna un arreglo con los detalles de las habitaciones si la consulta tiene éxito, y maneja los errores imprimiéndolos en la consola en caso contrario.



```js
   static async getByTypeRoom({ type }) {
    try {
      const result = await poll.query(
        "SELECT numero_habitacion, tipo_habitacion, numero_piso, precio, estado FROM HABITACION WHERE tipo_habitacion = ?",
        [type]
      );
      return result[0];
    } catch (error) {
      console.log(error);
    }
  }
   
```
*   Obtiene detalles de habitaciones según el tipo proporcionado.
*   Utiliza una consulta SQL con un parámetro para filtrar por tipo de habitación.
*   Retorna un arreglo con la información de las habitaciones o maneja el error imprimiéndolo en la consola.




## getByStatusRoom({ status }):

Este método obtiene detalles de las habitaciones según el estado proporcionado. Utiliza una consulta SQL con un parámetro para filtrar las habitaciones por estado. Retorna un arreglo con los detalles de las habitaciones si la consulta es exitosa, y si ocurre un error, lo maneja imprimiéndolo en la consola.


```js
     static async getByStatusRoom({ status }) {
    try {
      const result = await poll.query(
        "SELECT numero_habitacion, tipo_habitacion, numero_piso, precio, estado FROM HABITACION WHERE estado = ?",
        [status]
      );
      return result[0];
    } catch (error) {
      console.log(error);
    }
  }
   
```

*   Obtiene detalles de habitaciones según el estado proporcionado.
*   Utiliza una consulta SQL con un parámetro para filtrar por estado de la habitación.
*   Retorna un arreglo con la información de las habitaciones o maneja el error imprimiéndolo en la consola.



# Room

## obtenerIdPorNumeroHabitacion

Este método busca y devuelve el ID de una habitación específica según el número de habitación proporcionado. Utiliza una consulta SQL con BIN_TO_UUID para convertir el ID almacenado en formato binario a formato UUID. Retorna el ID de la habitación si la consulta tiene éxito y maneja los errores imprimiéndolos en la consola.


```js
     static async obtenerIdPorNumeroHabitacion({ numeroHabitacion }) {
    try {
      const result = await poll.query(
        "SELECT BIN_TO_UUID(id) AS id FROM HABITACION WHERE numero_habitacion = ?",
        [numeroHabitacion]
      );
      return result[0][0].id;
    } catch (error) {
      console.log(error);
    }
  }
   
```



## validarTipoHabitacion({ tipoHabitacion }):

El método validarTipoHabitacion verifica la existencia de habitaciones de un tipo específico en la base de datos. Utiliza una consulta SQL para seleccionar todas las habitaciones con el tipo proporcionado y devuelve true si al menos una habitación es encontrada, indicando que el tipo de habitación es válido. En caso contrario, retorna false. Maneja los errores imprimiéndolos en la consola.



```js
     static async validarTipoHabitacion({ tipoHabitacion }) {
    try {
      const result = await poll.query(
        "SELECT * FROM HABITACION WHERE tipo_habitacion = ?",
        [tipoHabitacion]
      );
      return result[0].length > 0;
    } catch (error) {
      console.log(error);
    }
  }
   
```




## validarNumeroHabitacion

Este método valida si una habitación con un número específico existe en la base de datos. Utiliza una consulta SQL para buscar habitaciones con el número proporcionado y retorna true si al menos una habitación es encontrada, indicando que el número de habitación es válido. En caso contrario, retorna false. Maneja los errores imprimiéndolos en la consola.


```js
     static async validarNumeroHabitacion({ numeroHabitacion }) {
    try {
      const result = await poll.query(
        "SELECT * FROM HABITACION WHERE numero_habitacion = ?",
        [numeroHabitacion]
      );
      return result[0].length > 0;
    } catch (error) {
      console.log(error);
    }
  }
   
```



## obtenerPrecioTotalHabitaciones

El método obtenerPrecioTotalHabitaciones calcula y retorna el precio total de un conjunto de habitaciones identificadas por los números proporcionados en la lista. Utiliza una consulta SQL con SUM para obtener la suma de los precios de las habitaciones. Retorna el precio total si la consulta tiene éxito y maneja los errores imprimiéndolos en la consola.

```js
   tatic async obtenerPrecioTotalHabitaciones({ listaNumeroHabitaciones }) {
    try {
      const result = await poll.query(
        "SELECT SUM(precio) AS precio FROM HABITACION WHERE numero_habitacion IN (?)",
        [listaNumeroHabitaciones]
      );
      return result[0][0].precio;
    } catch (error) {
      console.log(error);
    }
  }
   
```




# Huesped

## getAll

Este método obtiene todos los huéspedes almacenados en la tabla HUESPED. Utiliza una consulta SQL simple para seleccionar todos los registros y retorna el resultado.



```js
   static async getAll() {
    try {
      const result = await poll.query("SELECT * FROM HUESPED");
      return result[0];
    } catch (error) {
      console.log(error);
    }
  }
   
```
*    Se ejecuta la consulta SQL "SELECT * FROM HUESPED" utilizando el objeto poll.
*   El resultado de la consulta se almacena en la variable result.
*   Retorna la primera fila del resultado (result[0]), que contiene todos los huéspedes.



## getOneById

 Este método obtiene un huésped específico basado en su identificador único (ID). Utiliza una consulta SQL con un parámetro id para buscar el huésped correspondiente y retorna el resultado.


```js
   
   
  static async getOneById({ id }) {
    try {
      const result = await poll.query(
        "SELECT * FROM HUESPED WHERE id = UUID_TO_BIN(?)",
        [id]
      );
      return result[0];
    } catch (error) {
      console.log(error);
    }
  }
```
*   Se ejecuta la consulta SQL "SELECT * FROM HUESPED WHERE id = UUID_TO_BIN(?)" utilizando el objeto poll y el ID proporcionado.
*   El resultado de la consulta se almacena en la variable result.
*   Retorna la primera fila del resultado (result[0]), que contiene la información del huésped con el ID proporcionado.


## getOneByDNINumber

getOneByDNINumber({ dniNumber }): Este método obtiene un huésped basado en su número de documento nacional de identidad (DNI). Utiliza una consulta SQL con un parámetro dniNumber para buscar el huésped correspondiente y retorna el resultado.s


```js
   
  static async getOneByDNINumber({ dniNumber }) {
    try {
      const result = await poll.query("SELECT * FROM HUESPED WHERE dni = ?", [
        dniNumber,
      ]);
      return result[0];
    } catch (error) {
      console.log(error);
    }
  }
   
```
*   Se ejecuta la consulta SQL "SELECT * FROM HUESPED WHERE dni = ?" utilizando el objeto poll y el número de DNI proporcionado.
*   El resultado de la consulta se almacena en la variable result.
*   Retorna la primera fila del resultado (result[0]), que contiene la información del huésped con el número de DNI proporcionado.



## getIdByDNINumber

Este método obtiene el ID de un huésped basado en su número de DNI. Utiliza una consulta SQL para buscar el ID correspondiente al número de DNI proporcionado y retorna el resultado.



```js
   
  static async getIdByDNINumber({ dniNumber }) {
    try {
      const result = await poll.query(
        "SELECT BIN_TO_UUID(id) AS id FROM HUESPED WHERE dni = ?",
        [dniNumber]
      );
      return result[0][0].id;
    } catch (error) {
      console.log(error);
    }
  }
   
```
*   Se ejecuta la consulta SQL "SELECT BIN_TO_UUID(id) AS id FROM HUESPED WHERE dni = ?" utilizando el objeto poll y el número de DNI proporcionado.
*   El resultado de la consulta se almacena en la variable result.
*   Retorna el ID del huésped obtenido de la primera fila del resultado (result[0][0].id).



## validarDNIRepetido

Este método verifica si hay algún huésped con un número de DNI específico en la base de datos. Utiliza una consulta SQL para buscar huéspedes con el número de DNI proporcionado y retorna el ID del primer huésped encontrado, si existe, o null si no se encuentra ningún huésped.

```js
   
  static async validarDNIRepetido({ dniNumber }) {
    try {
      const result = await poll.query(
        "SELECT BIN_TO_UUID(id) AS id FROM HUESPED WHERE dni = ?",
        [dniNumber]
      );
      return result[0].length > 0 ? result[0][0].id : null;
    } catch (error) {
      console.log(error);
    }
  }
   
```
*   Se ejecuta la consulta SQL "SELECT BIN_TO_UUID(id) AS id FROM HUESPED WHERE dni = ?" utilizando el objeto poll y el número de DNI proporcionado.
*   El resultado de la consulta se almacena en la variable result.
*   Verifica si hay resultados (result[0].length > 0), retorna el ID del primer huésped encontrado (result[0][0].id), o null si no hay resultados.


## create

 Este método crea un nuevo registro de huésped en la tabla HUESPED. Primero verifica si el número de DNI proporcionado ya existe en la base de datos utilizando el método validarDNIRepetido. Si el número de DNI no está duplicado, inserta un nuevo registro en la tabla y retorna el ID del nuevo huésped.



```js
   
   
  static async create({ name, lastName, dni, phone, mail }) {
    try {
      const verificacionDni = await this.validarDNIRepetido({ dniNumber: dni });
      if (verificacionDni) {
        return verificacionDni;
      }
      const result = await poll.query(
        "INSERT INTO HUESPED (nombres,apellidos,dni,telefono,mail) VALUES (?,?,?,?,?)",
        [name, lastName, dni, phone, mail]
      );
      const idHuesped = this.getIdByDNINumber({ dniNumber: dni });
      return idHuesped;
    } catch (error) {
      console.log(error);
    }
  }

```
*   Verifica la existencia de un huésped con el mismo número de DNI utilizando validarDNIRepetido.
*   Si no hay duplicados, se ejecuta la consulta SQL "INSERT INTO HUESPED (nombres, apellidos, dni, telefono, mail) VALUES (?,?,?,?,?)" utilizando el objeto poll.
*   Obtiene el ID del nuevo huésped utilizando getIdByDNINumber.
*   Retorna el ID del nuevo huésped.


## update

 Este método actualiza la información de un huésped existente en la tabla HUESPED. Utiliza una consulta SQL para actualizar los campos específicos del huésped identificado por su ID único.

```js
   
  static async update({ data, id }) {
    try {
      const result = await poll.query(
        "UPDATE HUESPED SET ? WHERE id = UUID_TO_BIN(?)",
        [data, id]
      );
      return result[0];
    } catch (error) {
      console.log(error);
    }
  }
   
```
*   Se ejecuta la consulta SQL "UPDATE HUESPED SET ? WHERE id = UUID_TO_BIN(?)" utilizando el objeto poll, los datos a actualizar (data), y el ID proporcionado.
*   Retorna el resultado de la actualización.



## delete

delete({ id }): Este método elimina un huésped de la tabla HUESPED basado en su ID único. Utiliza una consulta SQL para eliminar el registro correspondiente



```js
   
  static async delete({ id }) {
    try {
      const result = await poll.query(
        "DELETE FROM HUESPED WHERE id = UUID_TO_BIN(?)",
        [id]
      );
      return result[0];
    } catch (error) {
      console.log(error);
    }
  }
   
```
*   Se ejecuta la consulta SQL "DELETE FROM HUESPED WHERE id = UUID_TO_BIN(?)" utilizando el objeto poll y el ID proporcionado.
*   Retorna el resultado de la eliminación.


















# reserva_habitacion

## crearRelacion

Este método se encarga de crear una relación entre una reserva y una habitación en la base de datos. Utiliza el método poll.query para ejecutar una consulta SQL de inserción en la tabla RESERVA_HABITACION. Toma dos parámetros, idReserva e idHabitacion, los convierte a formato binario utilizando UUID_TO_BIN y luego los inserta en la base de datos. Retorna el resultado de la operación de inserción.



```js
    static async crearRelacion({ idReserva, idHabitacion }) {
    try {
      const resultado = await poll.query(
        "INSERT INTO RESERVA_HABITACION (id_reserva, id_habitacion) VALUES (UUID_TO_BIN(?), UUID_TO_BIN(?))",
        [idReserva, idHabitacion]
      );
      return resultado[0];
    } catch (error) {
      console.log(error);
    }
  }
   
```



## validarFechas


```js
     static async validarFechas({ listaHabitaciones, fechaInicio, fechaFin }) {
    //TODO: Validar que el intervalo de las fechas no se superponga con las fechas de otras reservas
    try {
      const listaNumeroHabitaciones = listaHabitaciones.map(
        (habitacion) => habitacion.numero
      );
      for (let i = 0; i < listaNumeroHabitaciones.length; i++) {
        const resultado = await ModeloHabitacion.validarFechasHabitacion({
          idHabitacion: await ModeloHabitacion.obtenerIdPorNumeroHabitacion({
            numeroHabitacion: listaNumeroHabitaciones[i],
          }),
          fechaInicio,
          fechaFin,
        });
        if (!resultado) {
          return false;
        }
      }
      return true;
    } catch (error) {
      console.log(error);
    }
  }
   
```

*   Este método estático se utiliza para validar si las fechas de reserva especificadas se superponen con las fechas de otras reservas existentes en las habitaciones proporcionadas.
*   Itera sobre la lista de habitaciones proporcionadas y verifica si alguna de ellas tiene fechas de reserva superpuestas utilizando métodos de validación de fechas de la clase ModeloHabitacion.
*   Retorna true si no hay superposiciones y false si se detecta alguna superposición.
*   Maneja los errores con un bloque try-catch.



## validarHabitaciones

```js

  
  static async validarHabitaciones({ listaNumeroHabitaciones }) {
    try {
      for (let i = 0; i < listaNumeroHabitaciones.length; i++) {
        const resultado = await ModeloHabitacion.validarNumeroHabitacion({
          number: listaNumeroHabitaciones[i],
        });
        if (!resultado) {
          return false;
        }
      }
      return true;
    } catch (error) {
      console.log(error);
    }
  }
```
*   Este método estático se utiliza para validar si las habitaciones especificadas en la lista existen en la base de datos.
*   Itera sobre la lista de números de habitaciones proporcionados y verifica si cada número de habitación existe utilizando métodos de validación de números de habitaciones de la clase ModeloHabitacion.
*   Retorna true si todas las habitaciones existen y false si alguna de ellas no existe.
*   Maneja los errores con un bloque try-catch.

















# reserva_huesped

## reserva_huesped
Este método se encarga de crear una relación entre una reserva y un huésped en la base de datos.
Toma un objeto como argumento con las propiedades idReserva e idHuesped.
Utiliza la función poll.query para realizar una consulta a la base de datos. La consulta SQL inserta un nuevo registro en la tabla RESERVA_HUESPED con los valores proporcionados.
Los valores idReserva e idHuesped se convierten a formato binario utilizando UUID_TO_BIN, que sugiere que se están utilizando UUIDs en la base de datos.
Retorna el resultado de la consulta, que parece ser la respuesta de la base de datos después de la inserción.



```js
 static async crearRelacion({ idReserva, idHuesped }) {
    try {
      const resultado = await poll.query(
        "INSERT INTO RESERVA_HUESPED (id_reserva, id_huesped) VALUES (UUID_TO_BIN(?), UUID_TO_BIN(?))",
        [idReserva, idHuesped]
      );
      return resultado[0];
    } catch (error) {
      console.log(error);
    }
  }
   
```

*   Construcción de la consulta SQL para insertar un nuevo registro en la tabla RESERVA_HUESPED.
*   Conversión de los valores idReserva e idHuesped a formato binario utilizando UUID_TO_BIN.
*   Ejecución de la consulta en la base de datos mediante la función poll.query.
Proporciona los valores de idReserva e idHuesped como parámetros para la consulta.
*   Utiliza un bloque try-catch para capturar cualquier error que ocurra durante la ejecución.
*   Imprime el error en la consola mediante console.log(error) en caso de un problema.
Retorna el resultado de la consulta ejecutada en la base de datos.
*   El resultado puede contener información relevante proporcionada por la base de datos después de la inserción.




















# tipo_servicio


## getById
```js
static async getById({ id }) {
    try {
      const result = await poll.query(
        "SELECT * FROM TIPO_SERVICIO WHERE id = UUID_TO_BIN(?)",
        [id]
      );
      return result[0];
    } catch (error) {
      console.log(error);
    }
  }
   
```

*   Obtiene un tipo de servicio por su ID.
*   Utiliza una consulta SQL para seleccionar todos los campos de la tabla TIPO_SERVICIO donde el ID coincida con el proporcionado.
*   Convierte el ID a formato binario utilizando UUID_TO_BIN.
*   Retorna el resultado de la consulta, que probablemente sea un objeto representando el tipo de servicio.



## getIdByName

```js

  static async getIdByName({ name }) {
    try {
      const result = await poll.query(
        "SELECT BIN_TO_UUID(id) AS id FROM TIPO_SERVICIO WHERE nombre = ?",
        [name]
      );
      return result[0][0].id;
    } catch (error) {
      console.log(error);
    }
  }
   
```
*   Obtiene el ID de un tipo de servicio por su nombre.
*   Utiliza una consulta SQL para seleccionar el ID (convertido a formato UUID) de la tabla TIPO_SERVICIO donde el nombre coincida con el proporcionado.
*   Retorna el ID resultante.



## validarTipoServicio




```js

  static async validarTipoServicio({ tipoServicio }) {
    try {
      const result = await poll.query(
        "SELECT * FROM TIPO_SERVICIO WHERE nombre = ?",
        [tipoServicio]
      );
      return result[0].length > 0;
    } catch (error) {
      console.log(error);
    }
  }

   
```
*   Valida la existencia de un tipo de servicio por su nombre.
*   Utiliza una consulta SQL para seleccionar todos los campos de la tabla TIPO_SERVICIO donde el nombre coincida con el proporcionado.
*   Retorna un valor booleano indicando si se encontraron tipos de servicio con ese nombre.



## obtenerPrecio




```js

   
  static async obtenerPrecio({ tipoServicio }) {
    try {
      const result = await poll.query(
        "SELECT precio FROM TIPO_SERVICIO WHERE nombre = ?",
        [tipoServicio]
      );
      return result[0][0].precio;
    } catch (error) {
      console.log(error);
    }
  }
```
*   Obtiene el precio de un tipo de servicio por su nombre.
*   Utiliza una consulta SQL para seleccionar el precio de la tabla TIPO_SERVICIO donde el nombre coincida con el proporcionado.
*   Retorna el precio resultante.





# Reserva


## getAll




```js
static async getAll() {
    try {
      const result = await poll.query("SELECT * FROM RESERVA");
      return result[0];
    } catch (error) {
      console.log(error);
    }
  }
   
```
*   Obtiene todas las reservas en la base de datos.
*   Utiliza una consulta SQL simple para seleccionar todos los campos de la tabla RESERVA.
*   Retorna el resultado de la consulta.



## getById




```js
 static async getById({ id }) {
    try {
      const result = await poll.query(
        "SELECT * FROM RESERVA WHERE id = UUID_TO_BIN(?)",
        [id]
      );
      return result[0];
    } catch (error) {
      console.log(error);
    }
  }
   
```

*   Obtiene una reserva por su ID.
*   Utiliza una consulta SQL para seleccionar todos los campos de la tabla RESERVA donde el ID coincida con el proporcionado.
*   Convierte el ID a formato binario utilizando UUID_TO_BIN.
*   Retorna el resultado de la consulta.



## create




```js

   
  static async create({
    tipoServicio,
    fechaInicio,
    fechaFin,
    mailPago,
    telefonoPago,
    habitaciones,
    huespedes,
  }) {
    try {
      // Seccion de validaciones

      const validacionTipoServicio =
        await ModeloTipoServicio.validarTipoServicio({ tipoServicio });

      const validacionFechas = await ModeloReservaHabitacion.validarFechas({
        listaHabitaciones: habitaciones,
        fechaInicio,
        fechaFin,
      });

      const validacionHabitaciones =
        ModeloReservaHabitacion.validarHabitaciones({
          listaNumeroHabitaciones: habitaciones,
        });

      if (!validacionTipoServicio) {
        console.log("El tipo de servicio no es válido.");
        return { result: null, message: "El tipo de servicio no es válido." };
      }
      if (!validacionFechas) {
        console.log("Las fechas no son válidas");
        return {
          result: null,
          message: "Las fechas no son válidas, ya están reservadas.",
        };
      }
      if (!validacionHabitaciones) {
        return {
          result: null,
          message: "Las habitaciones no son válidas.",
        };
      }

      // Obtencion de IDs

      const idTipoServicio = await ModeloTipoServicio.getIdByName({
        name: tipoServicio,
      });

      const idEstadoPago = await ModeloEstadoPago.getIdByStatus({
        status: "pendiente",
      });

      const dateInicio = new Date(fechaInicio);
      const dateFin = new Date(fechaFin);

      const pagoTotal = await this.calcularMontoPago({
        fechaInicio: dateInicio,
        fechaFin: dateFin,
        tipoServicio,
        listaHabitaciones: habitaciones,
      });

      const numeroHuespedes = habitaciones.length;

      const result = await poll.query(
        "INSERT INTO RESERVA (id_tipo_servicio, id_estado_pago, fecha_inicio, fecha_fin, numero_huespedes, monto_pago, mail_pago, telefono_pago) VALUES (UUID_TO_BIN(?), UUID_TO_BIN(?), ?, ?, ?, ?, ?, ?)",
        [
          idTipoServicio,
          idEstadoPago,
          dateInicio,
          dateFin,
          numeroHuespedes,
          pagoTotal,
          mailPago,
          telefonoPago,
        ]
      );

      // Recuperar el id de la reserva
      const idReserva = await poll.query(
        "SELECT BIN_TO_UUID(id) AS id FROM RESERVA ORDER BY fecha_creacion DESC LIMIT 1"
      );

      // Insertar las habitaciones reservadas
      for (let i = 0; i < habitaciones.length; i++) {
        const idHabitacion =
          await ModeloHabitacion.obtenerIdPorNumeroHabitacion({
            numeroHabitacion: habitaciones[i].numero,
          });
        const result_habitacion_reserva =
          await ModeloReservaHabitacion.crearRelacion({
            idReserva: idReserva[0][0].id,
            idHabitacion,
          });
      }

      // Insertar los huespedes
      for (let i = 0; i < huespedes.length; i++) {
        const idHuesped = await ModeloHuesped.create({
          name: huespedes[i].nombre,
          lastName: huespedes[i].apellido,
          dni: huespedes[i].dni,
          phone: huespedes[i].telefono,
          mail: huespedes[i].mail,
        });

        const result_huesped_reserva = await ModeloReservaHuesped.crearRelacion(
          {
            idReserva: idReserva[0][0].id,
            idHuesped,
          }
        );
      }

      return {
        result: result[0],
        message: "Se ha registrado la reserva.",
      };
    } catch (error) {
      console.log(error);
    }
  }

```

*   Crea una nueva reserva en la base de datos.
*   Realiza validaciones utilizando métodos de otros modelos (ModeloTipoServicio, 
*   ModeloReservaHabitacion, ModeloHabitacion, ModeloHuesped) antes de la inserción.
*   Obtiene IDs necesarios para la reserva (tipo de servicio, estado de pago, etc.).
*   Calcula el monto total de pago mediante el método calcularMontoPago.
*   Realiza la inserción en la tabla RESERVA.
*   Inserta las relaciones entre la reserva, habitaciones y huéspedes en las tablas correspondientes.
*   Retorna un objeto con el resultado de la inserción y un mensaje indicando el éxito.



## calcularMontoPago




```js

  static async calcularMontoPago({
    fechaInicio,
    fechaFin,
    tipoServicio,
    listaHabitaciones,
  }) {

    const daysReservation =
      Math.abs(fechaInicio - fechaFin) / (1000 * 60 * 60 * 24);
    const listaNumeroHabitaciones = listaHabitaciones.map(
      (habitacion) => habitacion.numero
    );
    const costoHabitaciones =
      await ModeloHabitacion.obtenerPrecioTotalHabitaciones({
        listaNumeroHabitaciones,
      });
    const costoServicio = await ModeloTipoServicio.obtenerPrecio({
      tipoServicio: tipoServicio,
    });
    return daysReservation * (costoHabitaciones + costoServicio);
  }

   
```

*   Calcula el monto total de pago para una reserva en función de la duración de la estadía, el tipo de servicio y el costo de las habitaciones.
*   Utiliza métodos de otros modelos (ModeloHabitacion, ModeloTipoServicio) para obtener información necesaria.



## update




```js

  
  static async update({ data, id }) {
    try {
      const result = await poll.query(
        "UPDATE RESERVA SET ? WHERE id = UUID_TO_BIN(?)",
        [data, id]
      );
      return result[0];
    } catch (error) {
      console.log(error);
    }
  }
   
```
*   Actualiza una reserva existente en la base de datos por su ID.
*   Utiliza una consulta SQL para realizar la actualización.
*   Retorna el resultado de la actualización.


## delete




```js

  static async delete({ id }) {
    try {
      const result = await poll.query(
        "DELETE FROM RESERVA WHERE id = UUID_TO_BIN(?)",
        [id]
      );
      return result[0];
    } catch (error) {
      console.log(error);
    }
  }
   
```


*   Elimina una reserva de la base de datos por su ID.
*   Utiliza una consulta SQL para realizar la eliminación.
*   Retorna el resultado de la eliminación.

















































## 




```js

  
   
```





## 




```js

  
   
```





## 




```js

  
   
```




## 




```js

  
   
```



## 




```js

  
   
```
