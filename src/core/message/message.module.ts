import { Module } from '@nestjs/common';

import { MessageDiscoveryService } from '@/core/message/messageDiscovery.service';
import { MessageRegistryService } from '@/core/message/messageRegistry.service';

@Module({
    providers: [MessageDiscoveryService, MessageRegistryService],
    exports: [MessageRegistryService],
})
export class MessageModule {}
