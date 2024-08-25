import { AppModule } from "./app.module";

const module = new AppModule();
const widget = module.get('widget');

widget.install();
