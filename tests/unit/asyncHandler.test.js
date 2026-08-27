const asyncHandler = require('../../utils/asyncHandler');

describe('asyncHandler', () => {
    it('calls the wrapped function with req, res, and next', async () => {
        const req = {};
        const res = {};
        const next = jest.fn();
        const fn = jest.fn().mockResolvedValue('ok');

        const wrapped = asyncHandler(fn);
        await wrapped(req, res, next);

        expect(fn).toHaveBeenCalledWith(req, res, next);
    });

    it('passes thrown/rejected errors to next()', async () => {
        const req = {};
        const res = {};
        const next = jest.fn();
        const error = new Error('Something broke');
        const fn = jest.fn().mockRejectedValue(error);
        
        const wrapped = asyncHandler(fn);
        await wrapped(req, res, next);

        expect(next).toHaveBeenCalledWith(error);
    });
});