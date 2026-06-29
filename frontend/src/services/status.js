

export function isGoodResponse(status) {
    return [200, 201, 204].includes(status);
}