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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.backup = void 0;
var web3_storage_1 = require("web3.storage");
var chalk_1 = __importDefault(require("chalk"));
var child_process_1 = require("child_process");
var web3_storage_2 = require("web3.storage");
var zip_1 = require("../helpers/zip");
var deploy_1 = require("../helpers/deploy");
function backup(args) {
    return __awaiter(this, void 0, void 0, function () {
        var zipFilePath, files, client, cid, response, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    (0, child_process_1.exec)("git init", function (error, stdout, stderr) {
                        if (error) {
                            throw error;
                        }
                        console.log(stderr);
                        console.log(stdout);
                    });
                    if (args.length < 6) {
                        console.log(chalk_1.default.red("Expected 6 arguments in backup command but recieved ".concat(args.length)));
                        process.exit(1);
                    }
                    // Creating zip file.
                    console.log(chalk_1.default.grey("Creating zip file..."));
                    return [4 /*yield*/, (0, zip_1.createZipFile)()];
                case 1:
                    zipFilePath = _a.sent();
                    console.log(chalk_1.default.green("Created zip file at: ".concat(zipFilePath)));
                    console.log(chalk_1.default.grey("Uploading to Filecoin network..."));
                    return [4 /*yield*/, (0, web3_storage_2.getFilesFromPath)(zipFilePath)];
                case 2:
                    files = _a.sent();
                    _a.label = 3;
                case 3:
                    _a.trys.push([3, 6, , 7]);
                    client = new web3_storage_1.Web3Storage({ token: args[0] });
                    return [4 /*yield*/, client.put(files)];
                case 4:
                    cid = _a.sent();
                    console.log(chalk_1.default.green("Finished uploading on Filecoin network, CID: ".concat(cid)));
                    // Sending transcation for blockchain to index.
                    console.log(chalk_1.default.grey("Sending transaction to blockchain..."));
                    return [4 /*yield*/, (0, deploy_1.sendTransactionOnChain)({
                            repositoryOwner: args[1],
                            repositoryName: args[2],
                            branchName: args[3],
                            developer: args[4],
                            commitMessage: args[5],
                            cid: cid
                        })];
                case 5:
                    response = _a.sent();
                    if (response.status !== 200) {
                        throw Error("Failed to process transaction for the Smart Contract");
                    }
                    console.log(chalk_1.default.green("Transaction confirmed, added to the blockchain"));
                    return [3 /*break*/, 7];
                case 6:
                    e_1 = _a.sent();
                    console.log(chalk_1.default.red(e_1.toString()));
                    process.exit(1);
                    return [3 /*break*/, 7];
                case 7:
                    console.log(chalk_1.default.green("Project backed up successfully!"));
                    return [2 /*return*/];
            }
        });
    });
}
exports.backup = backup;
