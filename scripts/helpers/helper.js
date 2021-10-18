
export function printResponse(response) {
    console.log(JSON.stringify(response.json()));
}

export function printData(data) {
    console.log(JSON.stringify(data));
}

export function getTotalPages(itemsPerPage, totalItems) {
    if (itemsPerPage >= totalItems) {
        return 1;
    }

    return Math.round((totalItems / itemsPerPage));
}