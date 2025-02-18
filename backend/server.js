import { app } from "./src/app.js";
import dotenv from 'dotenv'

dotenv.config({
       path:'./.env'
})
const PORT = process.env.PORT
app.listen(PORT || 3000,() => {
       console.log(`server is running on PORT ${PORT}`);
})
