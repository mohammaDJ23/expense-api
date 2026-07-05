import { Module } from '@nestjs/common';
import { DiscoveryService } from '@nestjs/core';

import { MessageDiscoveryService } from '@/core/message/messageDiscovery.service';
import { MessageRegistryService } from '@/core/message/messageRegistry.service';

@Module({
    providers: [MessageDiscoveryService, MessageRegistryService, DiscoveryService],
    exports: [MessageRegistryService],
})
export class MessageModule {}
