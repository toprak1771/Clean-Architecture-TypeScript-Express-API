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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PresentationRepositoryImpl = void 0;
class PresentationRepositoryImpl {
    constructor(presentationDataSource) {
        this.presentationDataSource = presentationDataSource;
    }
    createPresentation(presentation) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.presentationDataSource.create(presentation);
        });
    }
    deletePresentation(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.presentationDataSource.deleteOne(id);
        });
    }
    updatePresentation(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.presentationDataSource.updateOne(id, data);
        });
    }
    getPresentations() {
        return __awaiter(this, void 0, void 0, function* () {
            const results = yield this.presentationDataSource.getAll();
            return results;
        });
    }
    getPresentation(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.presentationDataSource.getOne(id);
            return result;
        });
    }
}
exports.PresentationRepositoryImpl = PresentationRepositoryImpl;
