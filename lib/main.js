"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server"));
const pg_presentation_data_source_1 = require("./data/data-sources/postgresql/pg-presentation-data-source");
const pg_1 = require("pg");
function getPGDS() {
    return __awaiter(this, void 0, void 0, function* () {
        const db = new pg_1.Pool({
            user: 'postgres',
            host: 'localhost',
            database: 'PRESENTATİONSDB',
            port: 5432
        });
        return new pg_presentation_data_source_1.PGPresentationDataSource(db);
    });
}
(() => __awaiter(void 0, void 0, void 0, function* () {
    //const dataSource = await getPGDS();
    // const presentationMiddleware = PresentationRouter(
    //     new GetAllPresentation(new PresentationRepositoryImpl(dataSource)),
    //     new CreatePresentation(new PresentationRepositoryImpl(dataSource)),
    // )
    // Önce root route'u tanımlayın
    server_1.default.get('/', (req, res) => {
        console.log("burda");
        res.send("Hello world");
    });
    // Sonra diğer middleware'leri ekleyin
    //server.use('/presentation', presentationMiddleware);
    server_1.default.listen(4000, () => console.log("Running on http://localhost:4000"));
}))();
