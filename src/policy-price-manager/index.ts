import { Application } from "./src/app";

(async () => {
    try {
        const application = new Application();

        await application.start();
    }
    catch (e){
        console.log(`Error ${e.message}`);
    }
})();

