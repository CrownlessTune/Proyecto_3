# Proyecto_3

## Cambios Implementados

### 1. Uso de Local Storage

Se ha implementado el almacenamiento local (`localStorage`) para gestionar el carrito de compras. Esta funcionalidad permite a los usuarios mantener su selección de productos incluso después de cerrar el navegador o recargar la página. 

- **Implementación**: 
  - Al iniciar la aplicación, se verifica si hay un carrito guardado en el almacenamiento local. Si existe, se carga en la variable `cart`.
  - Cada vez que se añade, modifica o elimina un producto del carrito, se actualiza el almacenamiento local con el nuevo estado del carrito, garantizando así que la información se conserve entre sesiones.

### 2. Animaciones

Para mejorar la experiencia del usuario, se han añadido animaciones suaves que hacen que la interacción con el carrito sea más dinámica y agradable. 

- **Implementación**:
  - Al eliminar un producto del carrito, se aplica una transición de desvanecimiento en la fila correspondiente, lo que hace que el elemento se desvanezca antes de ser removido del DOM. Esto proporciona una respuesta visual clara y mejora la fluidez de la interfaz.
  - Asimismo, al vaciar el carrito, se utiliza una animación de escala que hace que la lista de productos se reduzca a cero antes de limpiarla por completo, creando un efecto visual atractivo.

### 3. Botón "Ver Curso"

Se ha añadido un botón "Ver curso" en cada card de producto que permite a los usuarios acceder a detalles adicionales sobre cada curso.

- **Implementación**:
  - Este botón es creado dinámicamente y se coloca en la parte inferior de cada card de producto. Al hacer clic en él, se abre un modal que muestra información detallada, como el nombre del curso, su imagen y el precio.
  - El modal se implementa de forma que cubre la pantalla con un fondo semitransparente, asegurando que la atención del usuario se centre en la información presentada. Además, se incluye un botón de cierre para permitir que el usuario regrese a la vista anterior fácilmente.