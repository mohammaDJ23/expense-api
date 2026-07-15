export interface IValidatorService<TInput> {
    validate(input: TInput): Promise<void>;
}
