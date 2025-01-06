import { AppDataSource } from "@config/data-source";
import { AgendaData } from "@entities/AgendaData";

export const AgendaDataRepository = AppDataSource.getRepository(AgendaData);
