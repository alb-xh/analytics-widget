import { AppModule } from "./app.module";

const module = new AppModule(process.env);
const widget = module.get('widget');

widget.install(window);
