import { Controller, Get, Param } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private paymentsService: PaymentsService) {}

  @EventPattern('order_state_send')
  handleOrderCreated(data) {
    return this.paymentsService.handleOrderCreated(data);
  }
}
