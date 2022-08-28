import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { OrderState } from './order-state.enum';

@Injectable()
export class PaymentsService {
  constructor(
    @Inject('ORDER')
    private communicationOrder: ClientProxy,
  ) {}
  private logger = new Logger('PaymentsService');

  async handleOrderCreated(data) {
    this.logger.verbose(`EventHandler Received Data => ${data[1]}`);
    if (data[1] === 'Created') {
      const states = [OrderState.CONFIRMED, OrderState.CANCELLED];
      const stateIndex = Math.floor(Math.random() * states.length);
      const state = states[stateIndex];
      const dataReceived = data;
      dataReceived[1] = state;

      await this.communicationOrder.emit(
        'order_state_changed_send',
        dataReceived,
      );
      this.logger.verbose(`EventHandler Sent Data => ${state}`);
    }
  }
}
