# Página cinematográfica de vídeo

## Objetivo
Crear una página independiente en `/video` para presentar el documental de PUNTO ART, accesible desde el enlace “Vídeos” de la navegación principal en una pestaña nueva.

## Cambios
- Convertir exclusivamente el acceso “Vídeos” del menú principal, tanto en escritorio como móvil, en un enlace a `/video` con apertura segura en otra pestaña.
- Crear la página `/video` con el texto exacto “Producciones PUNTO ART Presenta”, reproductor responsive del vídeo indicado y un control “Volver” en la esquina superior derecha.
- Diseñar un fondo oscuro inspirado en el patrón de bocetos de la referencia, reinterpretado como una composición discreta, animada y de baja opacidad con un acento rojo oscuro.
- Aplicar una entrada escalonada: fondo, cabecera y reproductor, respetando la preferencia de movimiento reducido.
- Mantener activo el cursor de brocha fina mediante los estilos globales ya existentes.
- Excluir el pie general de esta vista independiente para conservar la experiencia a pantalla completa, sin alterar cómo aparece en la página principal.

## Detalles técnicos
- Nueva ruta TanStack `src/routes/video.tsx` con metadatos propios de título, descripción, Open Graph y Twitter.
- Navegación mediante `<a target="_blank" rel="noopener noreferrer">` solo para Vídeos; el resto mantiene su comportamiento actual.
- Colores nuevos definidos como tokens semánticos en los estilos globales, evitando valores visuales crudos dentro de la página.
- Validación final en escritorio y móvil, incluyendo carga del iframe, enlace de vuelta, ausencia de desbordamientos y consola limpia.
