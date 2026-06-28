export class DeleteLocationCommand {
    constructor(
        public readonly userId: string,
        public readonly locationId: string,
    ) {}
}
