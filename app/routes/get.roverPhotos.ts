import { Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import getRoverPhotos from "../controllers/getRoverPhotos.ts";
const router = new Router();

router.get("/photos", getRoverPhotos);

export default router;
