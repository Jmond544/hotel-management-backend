# Summary of Methods: Methods of controllers 

# Reservation

## Get All(req, res)

El método getAll de la clase ReservationController se encarga de recuperar todas las reservas utilizando el modelo ReservationModel. En caso de éxito, responde con la lista de reservas en formato JSON y un código de estado HTTP 200; de lo contrario, devuelve un mensaje de error con un código 500.

```js
    static async getAll(req, res) {
    try {
      const reservations = await ReservationModel.getAll();
      res.status(200).json(reservations);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
```

*   Obtiene todas las reservas.
*   Utiliza el método getAll del modelo ReservationModel.
*   Si tiene éxito, devuelve un código de estado HTTP 200 con la lista de reservas en   *   formato JSON.
*   En caso de error, devuelve un código de estado HTTP 500 con un mensaje de error en  *   formato JSON.
  

## getOne(req, res)

El método getOne busca una reserva específica según el ID proporcionado en la solicitud. Utiliza el modelo ReservationModel para recuperar la reserva y responde con los detalles en formato JSON y un código de estado HTTP 200 si la operación es exitosa. En caso de error, devuelve un mensaje de error junto con un código 500.

```js
     static async getOne(req, res) {
    try {
      const { id } = req.params;
      const reservation = await ReservationModel.getById({ id });
      res.status(200).json(reservation);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
```

*   Obtiene una reserva específica según el ID proporcionado en los parámetros de la solicitud.
*   Utiliza el método getById del modelo ReservationModel.
*   Si tiene éxito, devuelve un código de estado HTTP 200 con la reserva específica en   formato JSON.
*   En caso de error, devuelve un código de estado HTTP 500 con un mensaje de error en formato JSON.
*   


## create(req, res)

El método create se encarga de crear una nueva reserva a partir de los datos recibidos en el cuerpo de la solicitud. Utiliza el modelo ReservationModel para llevar a cabo la creación y responde con un mensaje indicando que la reserva fue creada y un código de estado HTTP 200 si tiene éxito. En caso de fallos, como datos incorrectos, devuelve un mensaje indicando que la reserva no fue creada y un código 400; en situaciones de error durante el proceso de creación, responde con un mensaje de error y un código de estado HTTP 500.

```js
   static async create(req, res) {
    try {
      const {
        tipoServicio,
        fechaInicio,
        fechaFin,
        mailPago,
        telefonoPago,
        habitaciones,
        huespedes,
      } = req.body;

      const resultCreate = await ReservationModel.create({
        tipoServicio,
        fechaInicio,
        fechaFin,
        mailPago,
        telefonoPago,
        habitaciones,
        huespedes,
      });

      if (!resultCreate) {
        res.status(400).json({ message: "Reservation not created" });
      } else {
        res.status(200).json({ message: "Reservation created" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
   
```
*   Crea una nueva reserva utilizando la información proporcionada en el cuerpo de la solicitud (req.body).
*   Utiliza el método create del modelo ReservationModel.
*   Si la creación es exitosa, devuelve un código de estado HTTP 200 con un mensaje indicando que la reserva ha sido creada.
*   Si la creación falla (por ejemplo, datos incorrectos), devuelve un código de estado HTTP 400 con un mensaje indicando que la reserva no fue creada.
*   En caso de error durante el proceso de creación, devuelve un código de estado HTTP 500 con un mensaje de error en formato JSON.




# Room

## getOne(req,res)

El método getOne del controlador de habitaciones recupera información detallada de una habitación específica, identificada por el ID proporcionado en los parámetros de la solicitud. Utilizando el modelo ModeloHabitacion, devuelve los detalles de la habitación en formato JSON junto con un código de estado HTTP 200 en caso de éxito. En situaciones de error, responde con un mensaje de error y un código de estado HTTP 500.

```js
   static async getOne(req, res) {
    try {
      const { id } = req.params;
      const room = await ModeloHabitacion.getOne({ id });
      res.status(200).json(room);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
   
```
* Obtiene una habitación específica según el ID proporcionado en los parámetros de la solicitud.
* Utiliza el método getOne del modelo ModeloHabitacion.
* Responde con la información de la habitación en formato JSON y un código de estado HTTP 200 si tiene éxito.
* En caso de error, responde con un mensaje de error y un código de estado HTTP 500.



## getByQuery(req,res)

El método getByQuery gestiona la obtención de información de habitaciones según los parámetros de consulta proporcionados en la URL, tales como tipo, número o estado. Utilizando métodos específicos del modelo ModeloHabitacion, responde con la información solicitada en formato JSON y un código de estado HTTP 200. Si no se proporcionan parámetros de consulta, devuelve todas las habitaciones. En caso de error, emite un mensaje de error y un código de estado HTTP 500

```js
   static async getByQuery(req, res) {
    try {
      const { type, number, status } = req.query;
      if (type) {
        const room = await ModeloHabitacion.getByTypeRoom({ type });
        res.status(200).json(room);
      } else if (number) {
        const room = await ModeloHabitacion.getByNumberRoom({ number });
        res.status(200).json(room[0]);
      } else if (status) {
        const room = await ModeloHabitacion.getByStatusRoom({ status });
        res.status(200).json(room);
      } else {
        const rooms = await ModeloHabitacion.getAll();
        res.status(200).json(rooms);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
   
```
* Obtiene habitaciones según parámetros de consulta en la URL, como tipo, número o estado.
* Utiliza métodos específicos del modelo ModeloHabitacion para buscar habitaciones según el tipo, número o estado.
* Si se proporciona un tipo, devuelve la habitación del tipo especificado en formato JSON.
* Si se proporciona un número, devuelve la información de la habitación correspondiente al número y un código de estado HTTP 200.
* Si se proporciona un estado, devuelve las habitaciones con ese estado en formato JSON.
* Si no se proporciona ningún parámetro de consulta, devuelve todas las habitaciones en formato JSON.
En caso de error, responde con un mensaje de error y un código de estado HTTP 500.











# Room

## updateStatus(req,res)

Por último, el método updateStatus se encarga de actualizar el estado de una habitación según el número proporcionado en los parámetros de la solicitud. Utilizando el modelo ModeloHabitacion y validando el nuevo estado con la función validateRoomState, responde con un mensaje indicando el éxito de la actualización y un código de estado HTTP 200. En situaciones de error, responde con un mensaje de error y un código de estado HTTP 500.

```js
    static async updateStatus(req, res) {
    try {
      const { roomNumber } = req.params;
      const { estado } = validateRoomState(req.body);
      await ModeloHabitacion.updateStatus({ status: estado, roomNumber });
      res.status(200).json({ message: "Room status updated" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
   
```

* Actualiza el estado de una habitación según el número de habitación proporcionado en los parámetros de la solicitud.
* Utiliza el método updateStatus del modelo ModeloHabitacion.
* Valida el nuevo estado utilizando la función validateRoomState.
* Responde con un mensaje indicando que el estado de la habitación ha sido actualizado y un código de estado HTTP 200 si tiene éxito.
* En caso de error, responde con un mensaje de error y un código de estado HTTP 500.


*
*
*
*



# Room

## namemethod
txt



```js
   
   
```
*
*
*
*




# Room

## namemethod
txt



```js
   
   
```
*
*
*
*
