import { AgendaDataRepository } from "@repositories/AgendaDataRepository";
import { Not } from "typeorm";
import {
  AgendaRequest,
  AgendaResponse,
  CurrentAgendaRequest,
} from "@dtos/AgendaDto";

export class AgendaDataService {
  /**
   * Unset the 'current' flag for all agendas except the specified one
   * @param excludedId - The ID of the agenda to exclude from the update
   */
  static async unsetCurrentAgendas(excludedId: number): Promise<void> {
    await AgendaDataRepository.update(
      { id: Not(excludedId) }, // Exclude the agenda with the given ID
      { current: false } // Set 'current' to false for all others
    );
  }
  static async getAllAgendas(): Promise<AgendaResponse[]> {
    const agendas = await AgendaDataRepository.find();
    return agendas.map((agenda) => {
      const { id, time, title, name, info, current } = agenda;
      return { id, time, title, name, info, current };
    });
  }
  static async getAgendaById(id: number): Promise<AgendaResponse> {
    const agenda = await AgendaDataRepository.findOneBy({ id });
    if (!agenda) {
      throw new Error("Agenda not found");
    }
    const { time, title, name, info, current } = agenda;
    return { id, time, title, name, info, current };
  }

  static async createAgenda(data: AgendaRequest[]): Promise<AgendaResponse[]> {
    // Delete all existing records in the Agenda table
    await AgendaDataRepository.clear(); // This removes all rows from the table
    // Save the new agenda data
    const newAgenda = await AgendaDataRepository.save(data);

    // Map and return the response
    return newAgenda.map((agenda) => {
      const { id, time, title, name, info, current } = agenda;
      return { id, time, title, name, info, current };
    });
  }

  static async updateAgenda(
    id: number,
    data: AgendaRequest
  ): Promise<AgendaResponse> {
    const agenda = await AgendaDataRepository.findOneBy({ id });
    if (!agenda) {
      throw new Error("Agenda not found");
    }
    Object.assign(agenda, data);
    const updatedAgenda = await AgendaDataRepository.save(agenda);
    const { time, title, name, info, current } = updatedAgenda;
    return { id, time, title, name, info, current };
  }
  static async deleteAgenda(id: number) {
    await AgendaDataRepository.delete({ id });
    return "successfully deleted";
  }
  static async setCurrentAgenda(
    id: number,
    data: CurrentAgendaRequest
  ): Promise<AgendaResponse> {
    // Find the agenda to be updated
    const agenda = await AgendaDataRepository.findOneBy({ id });
    if (!agenda) {
      throw new Error("Agenda not found");
    }
    // Update the agenda with the provided data
    Object.assign(agenda, data);

    // Get the current time in the desired format
    const formatTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes();
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12; // Convert 0 to 12 for midnight
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
      return `${hours}:${formattedMinutes} ${ampm}`;
    };

    // Set the time only if it's empty or undefined
    if (!agenda.time) {
      agenda.time = formatTime();
    }

    agenda.current = true; // Set 'current' to true for the selected agenda

    // Save the updated agenda
    const updatedAgenda = await AgendaDataRepository.save(agenda);

    // Return the relevant properties of the updated agenda
    const { time, title, name, info, current } = updatedAgenda;
    return { id, time, title, name, info, current };
  }
  static async setCurrentAllFalse(): Promise<void> {
    // Update all agendas and set 'current' to false
    await AgendaDataRepository.update({}, { current: false });
  }
}
