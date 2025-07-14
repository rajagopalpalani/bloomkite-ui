import toastr from 'toastr';

export const toastrSuccess = (msg) => {
    toastr.options.preventDuplicates = true;
    toastr.success(msg);
};

export const toastrError = (msg) => {
    toastr.options.preventDuplicates = true;
    toastr.error(msg);
};

export const toastrInfo = (msg) => {
    toastr.options.preventDuplicates = true;
    toastr.info(msg);
};
