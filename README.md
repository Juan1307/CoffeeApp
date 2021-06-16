### Node Rest Server

De momento la base de datos acoplada a **Atlas** sirve como un service.

-Mongo BD destructurada [Mongo](https://www.mongodb.com).

-Heroku para hacer deploy -  [Heroku](https://www.heroku.com).

**GET:** Para consultar data.
```
/users - GET
/users?from={0}&limit={10} GET
```

**POST:** Para setear data (usar un body http).
```
/users - POST
```

**PUT:** Para actualizar data (usar un body http).
```
/users - PUT
```

**DELETE:** Para remover una fila de la colección (pasar id).
```
/users/{id} DELETE
```

**DELETE:** Para actualizar data en atributo `state: x` (pasar id).
```
/users/{id} - DELETE
```