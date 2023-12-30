/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IErrorResponse {
    statusCode: number;
    message: string;
    errorMessage: string;
    errorDetails: Record<string, any>;
}

export interface IQuery {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
    minPrice?: number;
    maxPrice?: number;
    tags?: string;
    startDate?: string;
    endDate?: string;
    language?: string;
    provider?: string;
    durationInWeeks?: number;
    level?: string;
}
