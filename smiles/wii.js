// INFORMACIÓN DEL APP 
export let id = 'wiiblock'
export let app = 'WiiBlock'
export let icon = 'fa-shield-halved'
export let titulo = 'WiiBlock - Tu seguridad y privacidad primero';
export let keywii = 'exntesion, google, adblock, velocidad, privacidad';
export let descri = 'Extensión de privacidad y velocidad para Google Chrome. Bloquea anuncios, rastreadores y mejora tu experiencia de navegación.';
export let linkweb = 'https://wiiblock.web.app'; // Sin slash (/), al final
export let lanzamiento = 2026;
export let by = '@wilder.taype';
export let linkme = 'https://wtaype.github.io/';
export let ipdev = import.meta.env.VITE_DEV;
export let version = 'v11'; // Siempre va "v" para estructura

/** ACTUALIZAR AL TAG POR SEGURIDAD [TAG NUEVO] (1)
git tag v11 -m "Version v11" ; git push origin v11

ACTUALIZACIÓN AL MAIN PRINCIPAL DEL PROYECTO [MAIN] (2)
git add . ; git commit -m "Actualizacion Principal v11.10.10" ; git push origin main

// REEMPLAZAR TAG DE SEGURIDAD EXISTENTE [TAG REMPLAZO] (3)
git tag -d v11 ; git tag v11 -m "Version v11 actualizada" ; git push origin v11 --force

// Actualizar versiones de seguridad [ELIMINAR CARPETA - ARCHIVO ONLINE] (4)
git rm --cached skills-lock.json ; git commit -m "Archivo Eliminado" ; git push origin main
git rm -r --cached .claude/ ; git commit -m "Carpeta Eliminada" ; git push origin main 
git tag -d 10 ; git push origin --delete 10 // Eliminar tag del local y remoto.
 ACTUALIZACION TAG[END] */
