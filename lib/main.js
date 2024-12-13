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
const presentation_router_1 = __importDefault(require("./presentation/routers/presentation-router"));
const get_all_presentation_1 = require("./domain/use-cases/presentation/get-all-presentation");
const presentation_repository_1 = require("./domain/repositories/presentation-repository");
const create_presentation_1 = require("./domain/use-cases/presentation/create-presentation");
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
    const dataSource = yield getPGDS();
    const presentationMiddleware = (0, presentation_router_1.default)(new get_all_presentation_1.GetAllPresentation(new presentation_repository_1.PresentationRepositoryImpl(dataSource)), new create_presentation_1.CreatePresentation(new presentation_repository_1.PresentationRepositoryImpl(dataSource)));
    server_1.default.use('/presentation', presentationMiddleware);
    server_1.default.listen(4000, () => console.log("Running on http://localhost:4000"));
}))();
