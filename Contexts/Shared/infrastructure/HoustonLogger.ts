import {houston, Service} from "../../../dependencies/deps.ts";
import Logger from "../domain/Logger.ts";
import {__rootDir} from "../../../Dir.ts";

enum Levels {
    DEBUG = 'debug',
    ERROR = 'error',
    INFO = 'info',
    WARN = 'warn'
}
const config: houston.Config = {
    format: houston.Format.text,
    prefix: new houston.TimePrefix(),
    logLevelDisplay: houston.LogLevelDisplay.Icon,
    logColors: {
        [houston.LogLevel.Info]: houston.Color.Blue,
        [houston.LogLevel.Success]: houston.Color.Green,
        [houston.LogLevel.Warning]: houston.Color.Yellow,
        [houston.LogLevel.Error]: houston.Color.Red
    }
}
@Service()
class HoustonLogger implements Logger {
    private logger: houston.Houston;
    constructor() {
        this.logger = new houston.Houston([
            new houston.ConsoleTransport(
                [houston.LogLevel.Warning, houston.LogLevel.Error, houston.LogLevel.Info],
                config
            ),
            new houston.FileTransport(`logs/${Levels.WARN}`, [houston.LogLevel.Warning]),
            new houston.FileTransport(`logs/${Levels.ERROR}`, [houston.LogLevel.Error]),
            new houston.FileTransport(`logs/${Levels.INFO}`, [houston.LogLevel.Info])
        ], config);
    }
    debug(message: string): void {
        this.logger.warning(message);
    }
    error(message: string): void {
        this.logger.error(message);
    }
    info(message: string): void {
        this.logger.info(message);
    }
}

export default HoustonLogger;
