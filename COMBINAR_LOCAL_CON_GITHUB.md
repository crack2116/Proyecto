# ✅ Cómo Combinar tus Cambios Locales con GitHub

Esta guía te explica el proceso para integrar los cambios que has hecho en tu computadora (locales) con la versión más actualizada del proyecto en GitHub. El objetivo es tener una única versión que contenga tanto tu trabajo como el de los demás.

---

## 🌊 El Flujo de Trabajo Ideal (Sin Conflictos)

Este es el proceso que seguirás la mayoría de las veces.

### Paso 1: Guarda tus Cambios Locales (Commit)

Antes de traer los cambios de otros, siempre debes guardar tu propio trabajo en un "paquete" llamado `commit`.

1.  **Añade tus archivos modificados:**
    ```bash
    git add .
    ```
    (El `.` significa "todos los archivos en la carpeta actual y subcarpetas").

2.  **Crea el commit con un mensaje descriptivo:**
    ```bash
    git commit -m "Agregué la funcionalidad de login con Google"
    ```
    **Importante:** El mensaje debe ser claro y explicar qué hiciste.

### Paso 2: Trae los Cambios de GitHub (Pull)

Ahora que tu trabajo está guardado, trae los cambios del repositorio remoto.

```bash
git pull origin main
```

**¿Qué hace este comando?**
- **`git fetch`**: Descarga la última versión del código desde GitHub (`origin main`).
- **`git merge`**: Intenta fusionar automáticamente esa nueva versión con la tuya.

Si nadie más modificó los mismos archivos que tú, Git lo fusionará todo sin problemas. ¡Y listo! Tu proyecto local ahora tiene tus cambios y los de GitHub.

### Paso 3: Sube tus Cambios Combinados (Push)

Finalmente, sube la versión combinada (tu trabajo + el de los demás) de vuelta a GitHub para que todos la tengan.

```bash
git push origin main
```

---

## 🆘 Solución de Problemas: ¿Qué Pasa si hay Conflictos?

Un conflicto ocurre cuando tú y otra persona modifican la **misma línea** en el **mismo archivo**. Git no puede decidir qué versión es la correcta y te pide ayuda.

### Escenario: Error de "Merge Conflict" al hacer `git pull`

Verás un mensaje como: `CONFLICT (content): Merge conflict in src/app/page.tsx`

**Solución en 4 pasos:**

1.  **Abre el archivo con conflicto:**
    Abre el archivo que te indica Git (ej. `src/app/page.tsx`) en tu editor de código (como Visual Studio Code).

2.  **Identifica y resuelve el conflicto:**
    Verás unas marcas especiales que Git añade para mostrarte el problema:
    ```typescript
    <<<<<<< HEAD
    // Tu código local (lo que tú escribiste)
    const miVariable = "Hola Mundo Local";
    =======
    // El código que vino de GitHub (el de la otra persona)
    const miVariable = "Hola Mundo Remoto";
    >>>>>>> 2a8a951bc4432a149b7621ba57dc7c361411c6c5 
    ```
    - **`<<<<<<< HEAD`**: Inicio de tus cambios.
    - **`=======`**: Separador.
    - **`>>>>>>> ...`**: Fin de los cambios remotos.

    **Tu trabajo es decidir qué código debe quedar.** Puedes:
    - Quedarte con tu versión.
    - Quedarte con la versión remota.
    - Combinar ambas.

    **Borra las líneas de Git** (`<<<<<<<`, `=======`, `>>>>>>>`) y deja el código final como quieres que se vea. Por ejemplo:
    ```typescript
    // Decidí combinar ambas ideas
    const miVariable = "Hola Mundo Local y Remoto";
    ```

3.  **Guarda los cambios resueltos:**
    Una vez que el archivo se ve como quieres, guárdalo. Luego, informa a Git que ya lo resolviste:
    ```bash
    git add .
    ```

4.  **Completa la fusión con un commit:**
    Git te pedirá crear un `commit` para finalizar la fusión. Puedes usar el mensaje que te sugiere:
    ```bash
    git commit
    ```
    (Se abrirá un editor de texto, simplemente guarda y cierra para aceptar el mensaje por defecto).

    O puedes hacerlo en un solo paso:
    ```bash
    git commit -m "Resolviendo conflicto de fusión en page.tsx"
    ```

### ¡Listo!
Ahora tu proyecto está actualizado, el conflicto resuelto y puedes subir todo a GitHub con `git push origin main`.

---

## 💡 Resumen Rápido

1.  **Guarda tu trabajo:** `git add .` y `git commit -m "Mi mensaje"`
2.  **Actualiza desde GitHub:** `git pull origin main`
3.  **¿Conflicto?**
    - Abre el archivo.
    - Edita el código para dejar la versión correcta.
    - Borra las marcas `<<<`, `===`, `>>>`.
    - `git add .` y `git commit -m "Resolviendo conflicto"`
4.  **Sube todo:** `git push origin main`
