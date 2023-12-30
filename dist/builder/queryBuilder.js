"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryBuilder = void 0;
function queryBuilder(queryParams, Model) {
    const query = {};
    const { page = 1, limit = 10, sortBy, sortOrder, startDate, endDate, level, tags, } = queryParams;
    const skip = (page - 1) * limit;
    // sorting
    const sortCriteria = {};
    if (sortBy) {
        sortCriteria[sortBy] = sortOrder === "desc" ? -1 : 1;
    }
    // price range
    if (queryParams.minPrice || queryParams.maxPrice) {
        query.price = {};
        if (queryParams.minPrice)
            query.price.$gte = Number(queryParams.minPrice);
        if (queryParams.maxPrice)
            query.price.$lte = Number(queryParams.maxPrice);
    }
    // other filters
    const filterParams = [
        "tags",
        "language",
        "provider",
        "durationInWeeks",
        "level",
    ];
    filterParams.forEach((param) => {
        if (param === "level" && level) {
            query["details.level"] = queryParams[param];
        }
        else if (param === "tags" && tags) {
            const tagNames = typeof tags === "string" ? [tags] : tags;
            query["tags.name"] = { $in: tagNames };
        }
        else if (startDate && endDate) {
            query.startDate = { $gte: startDate, $lte: endDate };
        }
        else if (queryParams[param]) {
            query[param] = queryParams[param];
        }
    });
    return Model.find(query).sort(sortCriteria).skip(skip).limit(limit);
}
exports.queryBuilder = queryBuilder;
