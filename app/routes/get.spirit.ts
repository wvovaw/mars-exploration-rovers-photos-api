import { Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import getSpiritPhotos from "../controllers/getSpiritPhotos.ts";
const router = new Router();

router.get("/spirit", getSpiritPhotos);

export default router;
