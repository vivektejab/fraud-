import logger from "pino";
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

const log = logger({
  transport: {
    target: 'pino-pretty',
    /*options: {
      singleLine:true,
      customColors: 'error:red,info:blue,message:green,object:yellow',
    }*/
  },
  base: {
    pid: false,
  },
  timestamp: () => `,"time":"${dayjs().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss.SSS")}"`,
});

export default log;
