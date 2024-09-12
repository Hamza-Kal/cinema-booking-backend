import { errorCodes } from '../../utils/error';
import Exception from '../../utils/exception';
import { statusCodes } from '../../utils/status';

export class TicketErrors {
  constructor() {}

  // Screening not found error
  screeningNotFound(overrideMessage?: string): Exception {
    const error = new Exception({
      errorCode: errorCodes.screening.notFound,
      message: overrideMessage || 'Screening not found',
      statusCode: statusCodes.NOT_FOUND,
    });
    return error;
  }

  // Seat is unavailable (already reserved or invalid)
  seatUnavailable(overrideMessage?: string): Exception {
    const error = new Exception({
      errorCode: errorCodes.screening.seatUnAvailable,
      message: overrideMessage || 'Seat is unavailable or invalid',
      statusCode: statusCodes.BAD_REQUEST,
    });
    return error;
  }

  userNotFound(overrideMessage?: string): Exception {
    const error = new Exception({
      errorCode: errorCodes.user.notFound,
      message: overrideMessage || 'User not found',
      statusCode: statusCodes.NOT_FOUND,
    });
    return error;
  }

  // Ticket already exists for the user and screening
  ticketAlreadyExists(overrideMessage?: string): Exception {
    const error = new Exception({
      errorCode: errorCodes.ticket.alreadyExist,
      message: overrideMessage || 'Ticket already exists for this screening',
      statusCode: statusCodes.BAD_REQUEST,
    });
    return error;
  }


  ticketNotFoundForUser(overrideMessage?: string): Exception {
    const error = new Exception({
      errorCode: errorCodes.ticket.notFound,
      message: overrideMessage || 'Ticket not found for this user',
      statusCode: statusCodes.NOT_FOUND,
    });
    return error;
  }
  
}
