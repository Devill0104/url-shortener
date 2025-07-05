
//async wrapper for async type functions
export default function wrapAsync(fn){
    return function(req, res, next){
        fn(req, res, next).catch(next);
    }
}