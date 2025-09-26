# EcoTrack

**EcoTrack** es una aplicación diseñada para ayudar a las empresas a registrar y reducir el impacto ambiental de sus empleados, al mismo tiempo que educa a los usuarios sobre cómo mejorar sus hábitos sostenibles.

Con EcoTrack, las organizaciones pueden fomentar acciones sostenibles diarias que, acumuladas, generan un impacto ambiental significativo. Además, este tipo de iniciativas posicionan a la empresa como candidata ideal para reconocimientos y certificaciones de sostenibilidad.

---

## Objetivos

EcoTrack contribuye directamente a dos Objetivos de Desarrollo Sostenible (ODS) establecidos por las Naciones Unidas:

- **#13 Acción por el clima**
- **#4 Educación de calidad**

---

## Funcionalidades principales

- Registro de acciones sostenibles realizadas por empleados.
- Panel de administración para empresas con múltiples usuarios.
- Métricas agregadas sobre el impacto ambiental positivo.
- Sistema educativo para promover buenas prácticas sostenibles.
- Preparación para auditorías o certificaciones ecológicas.

---

## Tecnologías utilizadas

- **Node.js** - Entorno de ejecución de JavaScript en el servidor.
- **Express** - Framework web rápido y minimalista para Node.js.
- **TypeScript** - Tipado estático para un desarrollo más robusto.
- **Artillery** - Herramienta de pruebas de rendimiento y carga.

---

## Pruebas de rendimiento

Este proyecto incluye un archivo de pruebas de rendimiento utilizando **Artillery**. Estas pruebas permiten:

- Medir la capacidad de respuesta del servidor ante múltiples solicitudes.
- Detectar cuellos de botella bajo carga.
- Validar la escalabilidad del sistema.

Para ejecutar las pruebas, asegúrate de tener `artillery` instalado:

```bash
npm install -g artillery

luego : artillery run testArtillery.yml

---

## Instalación

-Clona este repositorio: 
git clone https://github.com/diegospinax/ecotrack-api.git

hubiquese en la carpeta principal del proyecto:
cd ecotrack-api

-Instala las dependencias:
npm install

-Antes de iniciar el servidor, asegúrese de crear un archivo .env en la raíz del proyecto. Puede guiarse por el archivo .env.example incluido en el repositorio.


-Inicia el servidor en desarrollo:
npm run dev



