import { DefaultNamingStrategy, type NamingStrategyInterface } from 'typeorm';
import { snakeCase } from 'typeorm/util/StringUtils.js';

export class CustomNamingStrategy extends DefaultNamingStrategy implements NamingStrategyInterface {
    override tableName(targetName: string, userSpecifiedName: string): string {
        return userSpecifiedName ? userSpecifiedName : snakeCase(targetName);
    }

    override columnName(
        propertyName: string,
        customName: string,
        embeddedPrefixes: string[],
    ): string {
        return snakeCase(embeddedPrefixes.concat(customName ? customName : propertyName).join('_'));
    }

    columnNameCustomized(customName: string): string {
        return customName;
    }

    override relationName(propertyName: string): string {
        return snakeCase(propertyName);
    }
}
