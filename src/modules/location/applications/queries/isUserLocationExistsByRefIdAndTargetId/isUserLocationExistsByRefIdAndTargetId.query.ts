export class IsUserLocationExistsByRefIdAndTargetIdQuery {
    constructor(
        public readonly userId: string,
        public readonly locationId: string,
    ) {}
}
