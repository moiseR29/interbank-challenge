# CHALLENGE INTERBANK

## Índice

- [Challenge](#challenge)
- [Explicaciones](#explicaciones)
- [Instrucciones](#instrucciones)
- [API](#api)

## Challenge

### Requerimientos funcionales

Debes implementar los siguientes 3 endpoints:

1. Obtener las empresas que realizaron transferencias en el último mes.
2. Obtener las empresas que se adhirieron en el último mes.
3. Registrar la adhesión de una nueva empresa.
   a. Empresa Pyme.
   b. Empresa Corporativa.

### Requerimientos no funcionales

- La API debe estar escrita en NestJs (standalone).
- No se permite el uso de Docker.
- No es necesario desplegar la API, pero debe poder ejecutarse localmente.
- Se puede usar base de datos local, un archivo JSON o persistencia en memoria.
- Si usás base de datos (relacional o no relacional), incluí una instancia embebida, simulada o en
Cloud.
- Usá una arquitectura clara (idealmente Clean Architecture, Hexagonal, etc.)
   - Deseable: Hexagonal.
- Datos de la empresa: CUIT, Razón Social, Fecha Adhesión.
- Datos de la transferencia: Importe, Id Empresa, Cuenta Débito, Cuenta Crédito.
- Realizar mockeado de datos.

### Bonus

Parte adicional (AWS - Teórica) 

Diseñar una Lambda Function de AWS que reciba una solicitud de adhesión de empresa (como en el punto 3), valide los datos y los almacene.

Incluí:
- Código de la Lambda
- Input/output esperados (formato JSON)
- Breve explicación de cómo la integrarías con el sistema

### Entregables

- Código fuente completo en un repositorio (puede ser privado).
- Instrucciones claras para correrlo localmente.
- Pruebas Unitarias.
- Explicación de tus decisiones (README o comentarios).


## Explicaciones

**Entidades**

Decidi separar en tres entidades, Empresas, Cuentas y Transacciones.

si bien el challenge es bastante claro con esto, decidi ir por este camino, ya que transacciones podria ser integrado en Cuentas, pero ya me ha pasado en otros proyecto que la entidad de negocio puede llegar a crecer mas de lo previsto, y segun "CLEAN", cuando se presenta este problema es mejor dividirlo por entidad.

Aclaro Entidad no es Base de Datos, es como pienso mi negocio.

**Por que decide usar yarn en vez de npm ?**

principalmente yarn tiene una mejor forma de resolver conflictor entre paquetes, y suele manejarlos con una velocidad considerable respecto a npm.

En su momento cree varios cli, y usar los workspaces incorporados de yarn tambien es un plus.

**por que no separar el lambda ?**

simplemente aprovechar el express ya instalado y configurado, y aprovechar la arquitectura usada, ya que para ese caso se puede aislar esa funcion.


## Instrucciones

1. **Node version**

si tenes nvm, es solo ejecutar en consola: ```nvm use```, en caso de no tener instalada la version, ejecutar: ```nvm install```.

>En caso de usar node nativo, instalar la version que se encuentra en .nvmrc

2. **Instalar yarn**

en caso de no tener instalado Yarn, ejecutar: ```npm i -g yarn``` y checkear version ```yarn --version```

3. **Configuraciones**

crear archivo .env, **usar archivo .env.example de ejemplo**, si estas en linux podrias utilizar ```mv .env.example .env``` y llenarlo con los datos correspondientes.

***Sugerido***:

```
NODE_ENV=dev
PORT=4000
SERVER_SECRET_KEY=c1c23a856a04fbf3dd29
```

4. **Instalar dependencias**

ejecutar en consola ```yarn```

5. **Ejecutar server**

ejecutar en consola ```yarn start```

6. **BONUS: Ejecutar lambda**

ejecutar en consola ```yarn lambda```

## API

### Welcome

**Curl**

```
curl --request GET \
  --url http://localhost:4000/ \
  --header 'Content-Type: application/json'
```

**Response**

```
status: 200

Welcome to Interbank Challenge API
```

