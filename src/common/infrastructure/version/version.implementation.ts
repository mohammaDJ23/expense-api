import { readFileSync } from 'fs';
import { join } from 'path';

import { Injectable } from '@nestjs/common';

import { AppException } from '@/common/kernel/exceptions/app/exception';

import type { IVersionProvider } from './version.interface';

@Injectable()
export class VersionProviderImplementation implements IVersionProvider {
    private readonly version: string;

    constructor() {
        this.version = this.loadVersion();
    }

    private loadVersion(): string {
        if (process.env.npm_package_version) {
            return process.env.npm_package_version;
        }

        const packageJson = 'package.json';

        try {
            const possiblePaths = [join(process.cwd(), packageJson), join(__dirname, packageJson)];

            for (const path of possiblePaths) {
                try {
                    const packageJson = JSON.parse(readFileSync(path, 'utf8'));
                    if (packageJson.version) {
                        return packageJson.version;
                    }
                } catch {
                    continue;
                }
            }
        } catch (error) {
            throw new AppException(error);
        }

        throw new AppException('Unable to find the app version.');
    }

    getVersion(): string {
        return this.version;
    }
}
