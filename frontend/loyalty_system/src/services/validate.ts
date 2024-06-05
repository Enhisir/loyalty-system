export function validate(
    parameters: ValidationParameter[],
    obj: object,
): ValidadtionProblem[] {
    const problems: ValidadtionProblem[] = [];

    for (const param of parameters) {
        const value = obj[param.field];
        if (value === undefined || !param.predicate(value)) {
            problems.push({
                field: param.field,
                errorMessage: param.errorMessage,
            });
        }
    }

    return problems;
}

export type ValidationParameter = {
    field: string;
    predicate: (parameterValue: any) => boolean;
    errorMessage: string;
};

export type ValidadtionProblem = {
    field: string;
    errorMessage: string;
};