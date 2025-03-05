# Ecommerce Carrito

Este proyecto es una aplicación de ecommerce enfocada en la funcionalidad de carrito de compras.

## Requisitos Previos

- **Node.js** (versión recomendada: LTS)
- **npm** (incluido con Node.js)

## Instalación

1. Clona el repositorio o descarga el código fuente.
2. Abre una terminal y navega hasta la carpeta del proyecto.
3. Instala las dependencias ejecutando:

## Scripts
1. Para que el proyecto funciones el primer paso es instalar las dependencias:
 ```
   npm install
 ```
2. Una vez instalada las dependencias y finalizada la creación de la carpeta node_modules, ejercutar la siguiente script:
 ```
  npm run dev
 ```
Se abrirá un puerto en localhost.

## Challenger

A continuación explicaré cada paso que se debe realizar en la app para visualizar las funcionalidades requeridas y propuesta por el challenger:

Lo primero que vamos a observar es un formulario para ingresar a la aplicación:

(![image](https://github.com/user-attachments/assets/e3352c48-692e-46a1-bd4b-e8852e8cee5e)

Dentro del codigo se encuentran mockeados los usuarios, en este ejemplo utilizaremos al usuario Juan Perez:
![image](https://github.com/user-attachments/assets/ec5c20a7-29bb-4e62-80fe-c3852ad59bdd)
Antes de ingresar a la aplicación hay una pequeña validación por si el usuario o la contraseña no coinciden.
El usuario es juan@example.com y la contraseña 123456.

Una vez dentro de la aplicación podemos observar lo siguiente: 

![image](https://github.com/user-attachments/assets/d00843ac-6e94-4cb8-9005-a650706c2d9a)
1. En el navbar encontramos productos donde se encuentra lo que vemos a la vista, crear carrito que es donde elegimos los distintos tipos de carritos y simular fecha que nos sirve para comprobar cada funcionalidad propuesta en el enunciado del challenger.
2. Luego tenemos el icono de perfil donde obtendremos información de nuestro usuario:
![image](https://github.com/user-attachments/assets/35be4848-b33b-4056-b263-7c2909eed302)
El carrito donde se aplica las reglas de negocio esperado para este desafío, en el cual podremos agregar o eliminar productos, agregar la cantidad de productos que requieramos siempre y cuando el stock nos permita y el total de nuestra compra.
Por último se encuentra el botón logout que nos desloguea de la cuenta.
3. Luego se encuentra la opción crear carrito, que es la misma que la del componente crear carrito, nos redireccionará al mismo componente y por otra parte están los productos. Los productos pertenecen a Mercado Libre, realicé un fetch a la API de Mercado Libre.
Generalmente para realizar la integración a la API, tengo una carpeta aparte como una especie de service con los protocolos https apuntando a los endpoints correspondientes y con inteceptors si es necesario para handlear lo mejor posibles los distintos errores.
También en el código dejé un mock de productos para que puedan ver que lo utilicé para maquetar las tarjetas del producto.

En este caso como es nuestro primer movimiento, nuestro status es normal y a la fecha de hoy 05/03 no se encuentra ninguna fecha promocional, por ende solo podremos crear un carrito de status normal:
![image](https://github.com/user-attachments/assets/40f37337-8e23-41c8-aaf7-b820856dd90c)

Como ya elegí el carrito se habilitan los productos (estaban en disabled sin carrito) y se visualiza en el carrito la cantidad de $ que estamos gastando:
![image](https://github.com/user-attachments/assets/61897b72-3d63-4e9a-8145-9f5267b05e98)
![image](https://github.com/user-attachments/assets/ee0c7f9d-f45c-4311-821a-c34c44da1e88)

Haciendo click en el carrito podremos hacer un ABM de productos dentro de los carritos:
![image](https://github.com/user-attachments/assets/f7009d05-ac0a-49fe-ae7c-c6476e97b504)

Se pueden agregar todos los productos que creamos necesarios hasta agotar stock (atención con ese dato porque sino no podrán agregar más de 1 producto si hay un producto que tenga solamente 1 de stock).

Como el tipo de carrito es normal, solo aplica un descuento del 25% en caso de que lleves 4 productos:
![image](https://github.com/user-attachments/assets/9c2e2d9c-f468-4a01-b6cd-e7d078d4d343)

Si compramos más de 10 productos entonces se nos hará un descuento de 100
![image](https://github.com/user-attachments/assets/590daf19-eaf3-4c8a-8cf1-cc23f5062873)

Cuando realizamos la compra nos arroja un alert (que en realidad debería ser un toast) informando de nuestra compra:
![image](https://github.com/user-attachments/assets/26cab9cd-e304-4d86-87f0-1229c7c9f451)

Cuando entramos a nuestro perfil, nos informa ahora si la cantidad de compra que hicimos durante el mes:
![image](https://github.com/user-attachments/assets/1906b2d9-e09f-4a82-b5c9-0cd68efaf586)

Ahora dentro del simulador de fecha, eligiendo la fecha que deseamos simular y haciendo click en simular fecha, nos simula que estamos en la fecha que elegimos, de paso también hay un pequeño recordatorio de las fechas promocionables.
![image](https://github.com/user-attachments/assets/c72ffaef-7ed6-414a-b16b-c8553584904d)

Haciendo click en el perfil, el status cambia porque superamos la cantidad de compra del mes para ser VIP:
![image](https://github.com/user-attachments/assets/5ab80c8c-1a46-4616-8c1d-32a3b1361546)

Por ende se desbloquea el carrito VIP. En este caso consideré que el usuario VIP puede acceder al carrito normal porque quizás sinceramente no compre más de 10 productos por lo que solo le importe el beneficio del 25% entonces me pareció factible dejar ambos carritos disponibles:
![image](https://github.com/user-attachments/assets/0c9e05bd-dedc-4d64-b5c7-2f89cf421f49)

Lo mismo para el carrito VIP, cuando aplicas 4 productos se aplica un 25% de descuento y si supera los 10, el descuento es de 500:
![image](https://github.com/user-attachments/assets/756afea5-5b66-4c1f-924e-525a9d1f2f89)

Ahora avanzamos la fecha pero esta vez al 10 de mayo (dia de la madre).
Se activa entonces el carrito promocional y el descuento de 300.
![image](https://github.com/user-attachments/assets/dc5fc189-1939-4c8b-86d2-2cd788a41f0e)
![image](https://github.com/user-attachments/assets/f5550f63-c654-4655-9202-a9e2bceb2eb6)
![image](https://github.com/user-attachments/assets/5fe5d48b-f4f1-4d8b-aae3-6744445bfd17)

Ahora si vacío el carrito, no compro nada y adelanto un mes mas: 

![image](https://github.com/user-attachments/assets/2eaf32ed-8542-4352-94e4-33fa4290b9f7)

Pierdo el status de VIP y paso a ser usuario normal:

![image](https://github.com/user-attachments/assets/379d7fe6-b8cb-47df-af34-94264da20d5f)


Espero que haya sido bastante claro con esta pequeña guía, dejo a disposición el código fuente para que exploren un poco a nivel tanto código como funcionalidades. Ante cualquier consulta, no duden en escribirme.
Gracias por hacerme parte del proceso.
¡Saludos!
