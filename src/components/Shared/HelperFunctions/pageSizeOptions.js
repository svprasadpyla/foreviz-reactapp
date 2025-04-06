import React from "react";
const getPageSizeOptions = (totalRecords) => {
    const pageSizeOptions = [];

    if (totalRecords > 10) pageSizeOptions.push(10);
    if (totalRecords > 15) pageSizeOptions.push(15);
    if (totalRecords > 25) pageSizeOptions.push(25);
    if (totalRecords > 50) pageSizeOptions.push(50);
    if (totalRecords > 100) pageSizeOptions.push(100);

    pageSizeOptions.push('all');

    return pageSizeOptions;
};

export const pageSizeDropdownOptions = (totalRecords, t) => {
    const pageSizesArr = getPageSizeOptions(totalRecords);
    const pageSizeOptions = pageSizesArr.map(pageSize => <option key={pageSize} value={pageSize === 'all' ? totalRecords : pageSize}>{pageSize === 'all' ? t('pageSize.all') : pageSize}</option>)
    return pageSizeOptions
};