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
*
*
*
*


## validarFechas

Este método está incompleto (//TODO), pero su objetivo aparente es validar que el intervalo de fechas proporcionado para una reserva en una habitación no se superponga con las fechas de otras reservas. En este momento, el método siempre devuelve true sin realizar la validación. Se espera que este método sea implementado en el futuro.



```js
     static async validarFechas({ idHabitacion, fechaInicio, fechaFin }) {
    //TODO: Validar que el intervalo de las fechas no se superponga con las fechas de otras reservas
    try {

      return true;
    } catch (error) {
      console.log(error);
    }
  }
   
```
*
*
*
*



## validarHabitaciones
txt



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
*
*
*
*


## validarFechas
txt



```js

   
```
*
*
*
*



## validarFechas
txt



```js

   
```
*
*
*
*



## validarFechas
txt



```js

   
```
*
*
*
*



## validarFechas
txt



```js

   
```
*
*
*
*



## validarFechas
txt



```js

   
```
*
*
*
*



## validarFechas
txt



```js

   
```
*
*
*
*



## validarFechas
txt



```js

   
```
*
*
*
*




## validarFechas
txt



```js

   
```
*
*
*
*




## validarFechas
txt



```js

   
```
*
*
*
*