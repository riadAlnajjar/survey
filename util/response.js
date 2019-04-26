module.exports = class response {
    static build(params) {
        return {
            messages: typeof params.messages === 'undefined' ? '' : params.messages,
            danger: typeof params.danger === 'undefined' ? true :  params.danger,
            InputErrors: params.InputErrors instanceof Array ? params.InputErrors : [],
            data: typeof params.data === 'undefined' ? '' :  params.data
        };
    }
};