import { AgendaDataController } from "@controllers/AgendaDataController";
import { Router } from "express";
import { authenticateAdminToken } from "@middlewares/AuthMiddleware";
const router = Router();
// Set WebSocket instance
export let setSocketIO: (io: any) => void;

setSocketIO = (ioInstance) => {
  AgendaDataController.setSocketIO(ioInstance);
};
router.get("/", AgendaDataController.getAllAgendas);
router.get("/:id", AgendaDataController.getAgendaById);
router.post("/", AgendaDataController.createAgenda);
router.put("/:id", AgendaDataController.updateAgenda);
router.put("/current/:id", AgendaDataController.currentAgenda);
router.delete(
  "/:id",
  authenticateAdminToken,
  AgendaDataController.deleteAgenda
);
export default router;
