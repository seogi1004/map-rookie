export async function wait(action: Function, time: number = 200): Promise<any> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(action());
    }, time);
  });
}
