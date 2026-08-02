import { Module } from '@nestjs/common';
import { DiscoveryService } from '@nestjs/core';

import { MessageDiscoveryService } from '@/core/features/message/messageDiscovery.service';
import { MessageRegistryService } from '@/core/features/message/messageRegistry.service';

@Module({
    providers: [MessageDiscoveryService, MessageRegistryService, DiscoveryService],
    exports: [MessageRegistryService],
})
export class MessageModule {}
