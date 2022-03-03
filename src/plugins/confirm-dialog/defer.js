export default () => {
  let promise;
  let resolve;
  let reject;

  promise = new Promise(function (_resolve_, _reject_) {
    resolve = _resolve_;
    reject = _reject_;
  });

  return {
    promise: promise,
    resolve: resolve,
    reject: reject,
  };
};
