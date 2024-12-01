export class Utils {
  static async sleep (ms, ref = {}) {
    return new Promise((resolve) => {
      ref.value = setTimeout(() => resolve(), ms);
    });
  }

  static async promiseWithTimeout (promise, ms) {
    const ref = { value: null };

    return Promise.race([
      Utils.sleep(ms, ref).then(() => ({ success: false, data: null })),
      promise.then((res) => {
        if (ref.value) {
          clearTimeout(ref.value);
        }

        return ({ success: true, data: res ?? null });
      }),
    ]);
  }

  static now () {
    return new Date().toISOString();
  }
}
