import { statusCodes } from "../../utils/status";
import TicketService from "./service";
import { Request, Response } from "express";

const ticketService = new TicketService();

const controllers = {
  create: async (req: Request, res: Response) => {
    const { screeningId, userId, seatId } = req.body;
    try {
      const result = await ticketService.createTicket({
        screeningId,
        userId,
        seatId,
      });
      res.status(statusCodes.PROCESSED || 201).json(result);
    } catch (error) {
      res
        .status(statusCodes.SERVICE_UNAVAILABLE || 500)
        .json({ error: error.message });
    }
  },

  getAll: async (req: Request, res: Response) => {
    try {
      const result = await ticketService.getAllTickets();
      res.status(statusCodes.OK || 200).json(result);
    } catch (error) {
      res
        .status(statusCodes.SERVICE_UNAVAILABLE || 500)
        .json({ error: error.message });
    }
  },

  getTicketsByUserId: async (req: Request, res: Response) => {
    const { userId } = req.params;

    try {
      const result = await ticketService.getTicketsByUserId(userId);
      res.status(statusCodes.OK || 200).json(result); // Use 200 if OK is invalid
    } catch (error) {
      res
        .status(statusCodes.SERVICE_UNAVAILABLE || 500)
        .json({ error: error.message });
    }
  },
};

export default controllers;
