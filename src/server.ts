import app from "./app";
import { PORT_NUMBER } from "./config/env";

app.listen(PORT_NUMBER, () => {
  console.log("Server is running on port", PORT_NUMBER);
});
