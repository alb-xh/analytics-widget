import { z } from "zod";

export class Config {
  static Schema = z.object({
    DEBUG: z.boolean().default(false),
    WIDGET_NAME: z.string(),
    API_URL: z.string().url(),
  })

  static load () {
    const { success, error, data } = Config.Schema.safeParse(process.env);

    if (!success) {
      throw new Error(`Issues: ${JSON.stringify(error.issues)}: Value: ${JSON.stringify(process.env)}`)
    }

    return {
      debug: data['DEBUG'],
      widget: { name: data['WIDGET_NAME'] },
      api: { url: data['API_URL'] },
    };
  }
}
