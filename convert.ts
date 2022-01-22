import * as fs from 'fs';
import { parseJx3dat } from "luat2json";

fs.writeFileSync('./AllTheThingsAD.ts', `import { IATTData } from './types';

export const AllTheThingsAD: IATTData = ` + JSON.stringify(parseJx3dat(fs.readFileSync('./AllTheThingsAD.lua', 'utf8')), null, 4));
