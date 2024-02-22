"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "findOne", {
    enumerable: true,
    get: function() {
        return findOne;
    }
});
const _sanitizeInternalFields = /*#__PURE__*/ _interop_require_default(require("./utilities/sanitizeInternalFields"));
const _withSession = require("./withSession");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const findOne = async function findOne({ collection, locale, req = {}, where }) {
    const Model = this.collections[collection];
    const options = {
        ...(0, _withSession.withSession)(this, req.transactionID),
        lean: true
    };
    const query = await Model.buildQuery({
        locale,
        payload: this.payload,
        where
    });

    console.log("CRINGLE", this.trackingKey)
    this.connection.on('error', console.log);
    const doc = await Model.findOne(query, {}, options).exec();
    console.log("SWUGGO", typeof doc, this.trackingKey)
    if (!doc) {
        return null;
    }
    let result = JSON.parse(JSON.stringify(doc));
    // custom id type reset
    result.id = result._id;
    result = (0, _sanitizeInternalFields.default)(result);
    return result;
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9maW5kT25lLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0eXBlIHsgTW9uZ29vc2VRdWVyeU9wdGlvbnMgfSBmcm9tICdtb25nb29zZSdcbmltcG9ydCB0eXBlIHsgRmluZE9uZSB9IGZyb20gJ3BheWxvYWQvZGF0YWJhc2UnXG5pbXBvcnQgdHlwZSB7IFBheWxvYWRSZXF1ZXN0IH0gZnJvbSAncGF5bG9hZC90eXBlcydcbmltcG9ydCB0eXBlIHsgRG9jdW1lbnQgfSBmcm9tICdwYXlsb2FkL3R5cGVzJ1xuXG5pbXBvcnQgdHlwZSB7IE1vbmdvb3NlQWRhcHRlciB9IGZyb20gJy4nXG5cbmltcG9ydCBzYW5pdGl6ZUludGVybmFsRmllbGRzIGZyb20gJy4vdXRpbGl0aWVzL3Nhbml0aXplSW50ZXJuYWxGaWVsZHMnXG5pbXBvcnQgeyB3aXRoU2Vzc2lvbiB9IGZyb20gJy4vd2l0aFNlc3Npb24nXG5cbmV4cG9ydCBjb25zdCBmaW5kT25lOiBGaW5kT25lID0gYXN5bmMgZnVuY3Rpb24gZmluZE9uZShcbiAgdGhpczogTW9uZ29vc2VBZGFwdGVyLFxuICB7IGNvbGxlY3Rpb24sIGxvY2FsZSwgcmVxID0ge30gYXMgUGF5bG9hZFJlcXVlc3QsIHdoZXJlIH0sXG4pIHtcbiAgY29uc3QgTW9kZWwgPSB0aGlzLmNvbGxlY3Rpb25zW2NvbGxlY3Rpb25dXG4gIGNvbnN0IG9wdGlvbnM6IE1vbmdvb3NlUXVlcnlPcHRpb25zID0ge1xuICAgIC4uLndpdGhTZXNzaW9uKHRoaXMsIHJlcS50cmFuc2FjdGlvbklEKSxcbiAgICBsZWFuOiB0cnVlLFxuICB9XG5cbiAgY29uc3QgcXVlcnkgPSBhd2FpdCBNb2RlbC5idWlsZFF1ZXJ5KHtcbiAgICBsb2NhbGUsXG4gICAgcGF5bG9hZDogdGhpcy5wYXlsb2FkLFxuICAgIHdoZXJlLFxuICB9KVxuXG4gIGNvbnN0IGRvYyA9IGF3YWl0IE1vZGVsLmZpbmRPbmUocXVlcnksIHt9LCBvcHRpb25zKVxuXG4gIGlmICghZG9jKSB7XG4gICAgcmV0dXJuIG51bGxcbiAgfVxuXG4gIGxldCByZXN1bHQ6IERvY3VtZW50ID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShkb2MpKVxuXG4gIC8vIGN1c3RvbSBpZCB0eXBlIHJlc2V0XG4gIHJlc3VsdC5pZCA9IHJlc3VsdC5faWRcbiAgcmVzdWx0ID0gc2FuaXRpemVJbnRlcm5hbEZpZWxkcyhyZXN1bHQpXG5cbiAgcmV0dXJuIHJlc3VsdFxufVxuIl0sIm5hbWVzIjpbImZpbmRPbmUiLCJjb2xsZWN0aW9uIiwibG9jYWxlIiwicmVxIiwid2hlcmUiLCJNb2RlbCIsImNvbGxlY3Rpb25zIiwib3B0aW9ucyIsIndpdGhTZXNzaW9uIiwidHJhbnNhY3Rpb25JRCIsImxlYW4iLCJxdWVyeSIsImJ1aWxkUXVlcnkiLCJwYXlsb2FkIiwiZG9jIiwicmVzdWx0IiwiSlNPTiIsInBhcnNlIiwic3RyaW5naWZ5IiwiaWQiLCJfaWQiLCJzYW5pdGl6ZUludGVybmFsRmllbGRzIl0sIm1hcHBpbmdzIjoiOzs7OytCQVVhQTs7O2VBQUFBOzs7K0VBSHNCOzZCQUNQOzs7Ozs7QUFFckIsTUFBTUEsVUFBbUIsZUFBZUEsUUFFN0MsRUFBRUMsVUFBVSxFQUFFQyxNQUFNLEVBQUVDLE1BQU0sQ0FBQyxDQUFtQixFQUFFQyxLQUFLLEVBQUU7SUFFekQsTUFBTUMsUUFBUSxJQUFJLENBQUNDLFdBQVcsQ0FBQ0wsV0FBVztJQUMxQyxNQUFNTSxVQUFnQztRQUNwQyxHQUFHQyxJQUFBQSx3QkFBVyxFQUFDLElBQUksRUFBRUwsSUFBSU0sYUFBYSxDQUFDO1FBQ3ZDQyxNQUFNO0lBQ1I7SUFFQSxNQUFNQyxRQUFRLE1BQU1OLE1BQU1PLFVBQVUsQ0FBQztRQUNuQ1Y7UUFDQVcsU0FBUyxJQUFJLENBQUNBLE9BQU87UUFDckJUO0lBQ0Y7SUFFQSxNQUFNVSxNQUFNLE1BQU1ULE1BQU1MLE9BQU8sQ0FBQ1csT0FBTyxDQUFDLEdBQUdKO0lBRTNDLElBQUksQ0FBQ08sS0FBSztRQUNSLE9BQU87SUFDVDtJQUVBLElBQUlDLFNBQW1CQyxLQUFLQyxLQUFLLENBQUNELEtBQUtFLFNBQVMsQ0FBQ0o7SUFFakQsdUJBQXVCO0lBQ3ZCQyxPQUFPSSxFQUFFLEdBQUdKLE9BQU9LLEdBQUc7SUFDdEJMLFNBQVNNLElBQUFBLCtCQUFzQixFQUFDTjtJQUVoQyxPQUFPQTtBQUNUIn0=
