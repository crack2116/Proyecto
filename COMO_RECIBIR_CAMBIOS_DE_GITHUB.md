# 🚀 Cómo Recibir Cambios de GitHub (Actualizar tu Proyecto)

Esta guía te explica cómo actualizar tu proyecto local con los últimos cambios que están en el repositorio de GitHub. El comando principal para esto es `git pull`.

---

## ✅ Pasos para Actualizar tu Proyecto

### Paso 1: Abre una Terminal
Abre una terminal de línea de comandos. Puedes usar:
- **PowerShell**
- **Símbolo del sistema (CMD)**
- **Git Bash** (viene con la instalación de Git)

### Paso 2: Navega a la Carpeta de tu Proyecto
Usa el comando `cd` (change directory) para moverte a la carpeta donde tienes tu proyecto.

```bash
# Reemplaza 'ruta/a/tu/proyecto' con la ubicación real de tu proyecto
cd ruta/a/tu/proyecto
```

Por ejemplo:
```powershell
cd "C:\Users\tu_usuario\Desktop\PROYECTO FABIAN\Proyecto"
```

### Paso 3: Trae los Cambios del Repositorio Remoto
El comando `git pull` hace dos cosas:
1.  **`git fetch`**: Descarga los cambios del repositorio remoto (GitHub).
2.  **`git merge`**: Intenta fusionar (integrar) esos cambios en tu rama actual.

El comando más común es:

```bash
git pull origin main
```

**Desglose del comando:**
- `git pull`: El comando para traer y fusionar los cambios.
- `origin`: Es el nombre predeterminado para el repositorio remoto (tu repositorio en GitHub).
- `main`: Es el nombre de la rama principal de la que quieres traer los cambios. A veces puede llamarse `master`.

---

## 🆘 Solución de Problemas Comunes

### Error: "Your local changes to the following files would be overwritten by merge"
**Significado:** Tienes cambios locales en tus archivos que aún no has guardado en un `commit`. Git no puede fusionar los cambios remotos porque entrarían en conflicto con tus cambios locales no guardados.

**Solución 1 (Recomendada - Guardar tus cambios):**
1.  Guarda tus cambios locales en un `commit`:
    ```bash
    git add .
    git commit -m "Guardando mis cambios locales antes de actualizar"
    ```
2.  Ahora, intenta actualizar de nuevo:
    ```bash
    git pull origin main
    ```

**Solución 2 (Descartar tus cambios locales):**
Si no te importan los cambios que hiciste y quieres sobrescribirlos con la versión de GitHub, puedes hacer lo siguiente (¡CUIDADO: ESTO BORRARÁ TUS CAMBIOS LOCALES NO GUARDADOS!):
```bash
git reset --hard
git pull origin main
```

### Error: "Merge conflict in <nombre_del_archivo>"
**Significado:** Git intentó fusionar los cambios, pero tanto tú como el repositorio remoto modificaron la misma parte de un archivo. Git no sabe qué versión mantener y necesita tu ayuda.

**Solución:**
1.  Abre el archivo que tiene el conflicto en tu editor de código (como Visual Studio Code).
2.  Verás unas marcas especiales `<<<<<<<`, `=======`, `>>>>>>>` que delimitan las versiones en conflicto.
3.  **Decide qué código quieres mantener**: el tuyo, el remoto, o una combinación de ambos.
4.  **Borra las marcas** `<<<<<<<`, `=======`, `>>>>>>>` y deja el código final como quieres que quede.
5.  Guarda el archivo.
6.  Añade el archivo resuelto y completa la fusión:
    ```bash
    git add <nombre_del_archivo_con_conflicto>
    git commit -m "Resolviendo conflicto de fusión"
    ```
Ahora tu proyecto estará actualizado y el conflicto resuelto.

---

## 💡 Resumen Rápido

En la mayoría de los casos, solo necesitas estos dos comandos:

```bash
# 1. Ve a la carpeta de tu proyecto
cd ruta/a/tu/proyecto

# 2. Actualiza desde GitHub
git pull origin main
```
