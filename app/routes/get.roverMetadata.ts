import { Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import getRoverMetadata from "../controllers/getRoverMetadata.ts";
const router = new Router();

router.get("/metadata", getRoverMetadata);

export default router;
