import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto';
import { AppService } from 'src/app.service';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { UserCreatedEvent } from './events';

@Injectable()
export class UsersService {
  constructor(private readonly eventEmitter: EventEmitter2) {}
  private readonly logger = new Logger(AppService.name);

  async createUser(body: CreateUserDto) {
    this.logger.log('Creating a new user...', body);
    const userId = '12345';

    this.eventEmitter.emit(
      'user.created',
      new UserCreatedEvent(userId, body.email),
    );
  }

  //The 1 listener (Sync)
  @OnEvent('user.created')
  logNewUser(payload: UserCreatedEvent) {
    this.logger.log('New user was created!', payload.email);
  }

  //The 2 listener (Async)
  @OnEvent('user.created')
  async sendAGift(payload: UserCreatedEvent) {
    this.logger.log('Sending welcome gift to...', payload.email);

    await new Promise<void>((resolve) => setTimeout(() => resolve(), 3000));
    this.logger.log('Welcome gift sent.');
  }
}
