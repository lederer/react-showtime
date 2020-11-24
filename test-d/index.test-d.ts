import {expectType} from "tsd";

// TODO: In order for this to work, we'd have to auto generate d.ts files
//       for these two modules via the TypeScript compiler
import { DEFAULTS } from "../src/constants";
import transitions from "../src/transitions";

import { ShowtimeSettings } from "..";

expectType<ShowtimeSettings>(DEFAULTS);
expectType<ShowtimeSettings>(transitions.fade);
expectType<ShowtimeSettings>(transitions.rise);
expectType<ShowtimeSettings>(transitions.scale);
expectType<ShowtimeSettings>(transitions.slide);
expectType<ShowtimeSettings>(transitions.slideFade);
