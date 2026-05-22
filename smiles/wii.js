// INFORMACIÓN DEL APP 
export let id = 'wiiblock'
export let app = 'WiiBlock'
export let icon = 'fa-shield-halved'
export let titulo = 'WiiBlock - Tu seguridad y privacidad primero';
export let keywii = 'exntesion, google, adblock, velocidad, privacidad';
export let descri = 'Extensión de privacidad y velocidad para Google Chrome. Bloquea anuncios, rastreadores y mejora tu experiencia de navegación.';
export let linkweb = 'https://retodelmes.web.app'; // Sin slash (/), al final
export let lanzamiento = 2026;
export let by = '@wilder.taype';
export let linkme = 'https://wtaype.github.io/';
export let ipdev = import.meta.env.VITE_DEV;
export let version = '10';

/** ACTUALIZAR AL TAG POR SEGURIDAD [TAG NUEVO] (1)
git tag 10 -m "Version 10" ; git push origin 10

ACTUALIZACIÓN AL MAIN PRINCIPAL DEL PROYECTO [MAIN] (2)
git add . ; git commit -m "Actualizacion Principal 10.10.10" ; git push origin main

// REEMPLAZAR TAG DE SEGURIDAD EXISTENTE [TAG REMPLAZO] (3)
git tag -d 10 ; git tag 10 -m "Version 10 actualizada" ; git push origin 10 --force

// PARA ACTUALIZAR SITEMAP EFFICIENTE (4)
npm run sitemap

// Actualizar versiones de seguridad [ELIMINAR CARPETA - ARCHIVO ONLINE] (5)
git rm --cached skills-lock.json ; git commit -m "Archivo Eliminado" ; git push origin main
git rm -r --cached .claude/ ; git commit -m "Carpeta Eliminada" ; git push origin main

 ACTUALIZACION TAG[END] */
