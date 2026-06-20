import { Module } from '@nestjs/common';
import { CqrsModule as BaseCqrsModule } from '@nestjs/cqrs';

@Module({
    imports: [BaseCqrsModule],
    exports: [BaseCqrsModule],
})
export class CqrsModule {}
