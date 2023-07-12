export class Logger {
  static log(message: string) {
    console.log(`[LOG] ${message}`);
  }

  static warn(message: string) {
    console.warn(`[WARN] ${message}`);
  }

  static info(message: string) {
    console.info(`[INFO] ${message}`);
  }

  static error(message: string) {
    console.error(`[ERROR] ${message}`);
  }
}
