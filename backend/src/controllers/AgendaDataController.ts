import { AgendaDataService } from "@services/AgendaDataService";
import { Request, Response } from "express";
import { Server } from "socket.io";

export class AgendaDataController {
  // Method to get all agendas
  private static io: Server;

  public static setSocketIO(ioInstance: Server) {
    AgendaDataController.io = ioInstance;
  }
  public static async getAllAgendas(req: Request, res: Response) {
    try {
      const agendas = await AgendaDataService.getAllAgendas();
      res.status(200).json(agendas);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error getting Agenda", error });
    }
  }

  static async getAgendaById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const agenda = await AgendaDataService.getAgendaById(id);
      res.status(200).json(agenda);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error getting Agenda", error });
    }
  }
  static async createAgenda(req: Request, res: Response) {
    try {
      const AgendaData = req.body;
      const agenda = await AgendaDataService.createAgenda(AgendaData);
      res.status(201).json(agenda);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error creating Agenda", error });
    }
  }
  static async updateAgenda(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const data = req.body;
      const updatedAgenda = await AgendaDataService.updateAgenda(id, data);
      res.status(200).json(updatedAgenda);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error update Agenda", error });
    }
  }

  static async deleteAgenda(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const resp = await AgendaDataService.deleteAgenda(id);
      res.status(200).json({ message: resp });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error deleting Agenda", error });
    }
  }
  static async currentAgenda(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const data = req.body;
      const updatedAgenda = await AgendaDataService.setCurrentAgenda(id, data);
      if (AgendaDataController.io) {
        AgendaDataController.io.emit("agendaUpdated", updatedAgenda);
      }

      res.status(200).json(updatedAgenda);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error update Agenda", error });
    }
  }
}
